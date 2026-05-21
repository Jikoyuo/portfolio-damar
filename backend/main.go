package main

import (
	"context"
	"log"
	"os"
	"os/signal"
	"strings"
	"syscall"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/joho/godotenv"

	"github.com/jikoyuo/portfolio-backend/internal/config"
	"github.com/jikoyuo/portfolio-backend/internal/database"
	"github.com/jikoyuo/portfolio-backend/internal/handlers"
	"github.com/jikoyuo/portfolio-backend/internal/middleware"
	"github.com/jikoyuo/portfolio-backend/internal/repository"
	"github.com/jikoyuo/portfolio-backend/internal/storage"
)

func main() {
	_ = godotenv.Load()

	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("config: %v", err)
	}

	// ── database ──
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	pool, err := database.Connect(ctx, cfg.DatabaseURL)
	cancel()
	if err != nil {
		log.Fatalf("database: %v", err)
	}
	defer pool.Close()

	migCtx, migCancel := context.WithTimeout(context.Background(), 30*time.Second)
	if err := database.RunMigrations(migCtx, pool, "./migrations"); err != nil {
		log.Fatalf("migrations: %v", err)
	}
	migCancel()

	// ── storage ──
	var store storage.Storage
	switch cfg.StorageBackend {
	case "supabase":
		s, err := storage.NewSupabaseStorage(cfg.SupabaseURL, cfg.SupabaseServiceKey, cfg.SupabaseBucket)
		if err != nil {
			log.Fatalf("storage(supabase): %v", err)
		}
		store = s
		log.Printf("storage: supabase bucket=%s", cfg.SupabaseBucket)
	default:
		s, err := storage.NewLocalStorage(cfg.UploadDir, cfg.PublicBaseURL)
		if err != nil {
			log.Fatalf("storage(local): %v", err)
		}
		store = s
		log.Printf("storage: local dir=%s", cfg.UploadDir)
	}

	// ── handlers ──
	projectRepo := repository.NewProjectRepo(pool)
	authHandler := handlers.NewAuthHandler(cfg)
	projectHandler := handlers.NewProjectHandler(projectRepo)
	uploadHandler := handlers.NewUploadHandler(store)

	app := fiber.New(fiber.Config{
		AppName:      "damar-portfolio-api",
		BodyLimit:    10 << 20,
		ErrorHandler: errorHandler,
	})
	app.Use(recover.New())
	app.Use(logger.New())
	// CORS: match explicit origins from env + any *.vercel.app preview/prod.
	allowList := strings.Split(cfg.CORSOrigin, ",")
	for i := range allowList {
		allowList[i] = strings.TrimSpace(allowList[i])
	}
	app.Use(cors.New(cors.Config{
		AllowOriginsFunc: func(origin string) bool {
			// Explicit allowlist (localhost, custom domain, etc.)
			for _, o := range allowList {
				if o != "" && strings.EqualFold(o, origin) {
					return true
				}
			}
			// Any *.vercel.app subdomain (preview & production deployments)
			lo := strings.ToLower(origin)
			if strings.HasPrefix(lo, "https://") && strings.HasSuffix(lo, ".vercel.app") {
				return true
			}
			return false
		},
		AllowMethods:     "GET,POST,PUT,DELETE,OPTIONS",
		AllowHeaders:     "Origin, Content-Type, Accept, Authorization",
		AllowCredentials: false,
	}))

	// Serve local uploads only if storage is local (Supabase serves directly)
	if cfg.StorageBackend == "local" {
		app.Static("/uploads", cfg.UploadDir, fiber.Static{
			Compress:  true,
			ByteRange: true,
			MaxAge:    60 * 60 * 24 * 30,
		})
	}

	app.Get("/api/health", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"status":  "ok",
			"storage": cfg.StorageBackend,
		})
	})

	api := app.Group("/api")
	api.Post("/auth/login", authHandler.Login)
	api.Get("/projects", projectHandler.List)
	api.Get("/projects/:id", projectHandler.Get)

	protected := api.Group("", middleware.RequireAuth(cfg.JWTSecret))
	protected.Get("/auth/me", authHandler.Me)
	protected.Post("/projects", projectHandler.Create)
	protected.Put("/projects/:id", projectHandler.Update)
	protected.Delete("/projects/:id", projectHandler.Delete)
	protected.Post("/upload", uploadHandler.Upload)

	go func() {
		log.Printf("listening on :%s", cfg.Port)
		if err := app.Listen(":" + cfg.Port); err != nil {
			log.Fatalf("server: %v", err)
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	log.Println("shutting down...")
	_ = app.ShutdownWithTimeout(5 * time.Second)
}

func errorHandler(c *fiber.Ctx, err error) error {
	code := fiber.StatusInternalServerError
	msg := "internal server error"
	if fe, ok := err.(*fiber.Error); ok {
		code = fe.Code
		msg = fe.Message
	}
	return c.Status(code).JSON(fiber.Map{"error": msg})
}
