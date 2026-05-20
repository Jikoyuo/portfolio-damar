package handlers

import (
	"crypto/subtle"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/jikoyuo/portfolio-backend/internal/auth"
	"github.com/jikoyuo/portfolio-backend/internal/config"
)

type AuthHandler struct {
	cfg *config.Config
}

func NewAuthHandler(cfg *config.Config) *AuthHandler {
	return &AuthHandler{cfg: cfg}
}

type loginInput struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func (h *AuthHandler) Login(c *fiber.Ctx) error {
	var in loginInput
	if err := c.BodyParser(&in); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "invalid body"})
	}

	userOK := subtle.ConstantTimeCompare([]byte(in.Username), []byte(h.cfg.AdminUsername)) == 1
	passOK := subtle.ConstantTimeCompare([]byte(in.Password), []byte(h.cfg.AdminPassword)) == 1
	if !userOK || !passOK {
		return c.Status(401).JSON(fiber.Map{"error": "invalid credentials"})
	}

	token, err := auth.Issue(in.Username, h.cfg.JWTSecret, 12*time.Hour)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "failed to issue token"})
	}
	return c.JSON(fiber.Map{
		"token":     token,
		"username":  in.Username,
		"expiresIn": int((12 * time.Hour).Seconds()),
	})
}

func (h *AuthHandler) Me(c *fiber.Ctx) error {
	user, _ := c.Locals("user").(string)
	return c.JSON(fiber.Map{"username": user})
}
