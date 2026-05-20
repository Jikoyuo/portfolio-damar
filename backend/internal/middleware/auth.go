package middleware

import (
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/jikoyuo/portfolio-backend/internal/auth"
)

func RequireAuth(secret string) fiber.Handler {
	return func(c *fiber.Ctx) error {
		h := c.Get("Authorization")
		if h == "" {
			return c.Status(401).JSON(fiber.Map{"error": "missing authorization header"})
		}
		parts := strings.SplitN(h, " ", 2)
		if len(parts) != 2 || !strings.EqualFold(parts[0], "Bearer") {
			return c.Status(401).JSON(fiber.Map{"error": "invalid authorization scheme"})
		}
		claims, err := auth.Parse(parts[1], secret)
		if err != nil {
			return c.Status(401).JSON(fiber.Map{"error": "invalid or expired token"})
		}
		c.Locals("user", claims.Username)
		return c.Next()
	}
}
