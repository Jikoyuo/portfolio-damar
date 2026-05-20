package config

import (
	"errors"
	"os"
	"strings"
)

type Config struct {
	Port          string
	DatabaseURL   string
	JWTSecret     string
	AdminUsername string
	AdminPassword string
	CORSOrigin    string
	UploadDir     string
	PublicBaseURL string

	// Storage backend: "local" (default) or "supabase".
	StorageBackend string

	// Supabase Storage (only required when StorageBackend == "supabase")
	SupabaseURL        string
	SupabaseServiceKey string
	SupabaseBucket     string
}

func Load() (*Config, error) {
	cfg := &Config{
		Port:               getenv("PORT", "8080"),
		DatabaseURL:        os.Getenv("DATABASE_URL"),
		JWTSecret:          os.Getenv("JWT_SECRET"),
		AdminUsername:      getenv("ADMIN_USERNAME", "admin"),
		AdminPassword:      os.Getenv("ADMIN_PASSWORD"),
		CORSOrigin:         getenv("CORS_ORIGIN", "http://localhost:3000"),
		UploadDir:          getenv("UPLOAD_DIR", "./uploads"),
		PublicBaseURL:      getenv("PUBLIC_BASE_URL", "http://localhost:8080"),
		StorageBackend:     strings.ToLower(getenv("STORAGE_BACKEND", "local")),
		SupabaseURL:        os.Getenv("SUPABASE_URL"),
		SupabaseServiceKey: os.Getenv("SUPABASE_SERVICE_KEY"),
		SupabaseBucket:     os.Getenv("SUPABASE_BUCKET"),
	}

	if cfg.DatabaseURL == "" {
		return nil, errors.New("DATABASE_URL is required")
	}
	if len(cfg.JWTSecret) < 16 {
		return nil, errors.New("JWT_SECRET must be at least 16 characters")
	}
	if cfg.AdminPassword == "" {
		return nil, errors.New("ADMIN_PASSWORD is required")
	}

	switch cfg.StorageBackend {
	case "local":
		// nothing else needed
	case "supabase":
		if cfg.SupabaseURL == "" || cfg.SupabaseServiceKey == "" || cfg.SupabaseBucket == "" {
			return nil, errors.New("STORAGE_BACKEND=supabase requires SUPABASE_URL, SUPABASE_SERVICE_KEY and SUPABASE_BUCKET")
		}
	default:
		return nil, errors.New("STORAGE_BACKEND must be 'local' or 'supabase'")
	}

	return cfg, nil
}

func getenv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
