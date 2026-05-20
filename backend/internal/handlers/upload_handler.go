package handlers

import (
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"mime"
	"path/filepath"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/jikoyuo/portfolio-backend/internal/storage"
)

type UploadHandler struct {
	store storage.Storage
}

func NewUploadHandler(s storage.Storage) *UploadHandler {
	return &UploadHandler{store: s}
}

var allowedExt = map[string]bool{
	".jpg":  true,
	".jpeg": true,
	".png":  true,
	".webp": true,
	".gif":  true,
	".avif": true,
	".svg":  true,
}

const maxUploadSize = 8 << 20 // 8 MB

func (h *UploadHandler) Upload(c *fiber.Ctx) error {
	file, err := c.FormFile("file")
	if err != nil {
		return fiber.NewError(400, "missing 'file' form field")
	}
	if file.Size > maxUploadSize {
		return fiber.NewError(413, "file too large (max 8 MB)")
	}
	ext := strings.ToLower(filepath.Ext(file.Filename))
	if !allowedExt[ext] {
		return fiber.NewError(400, "unsupported file type")
	}

	rnd := make([]byte, 8)
	if _, err := rand.Read(rnd); err != nil {
		return fiber.NewError(500, "cannot generate filename")
	}
	name := fmt.Sprintf("%d-%s%s", time.Now().Unix(), hex.EncodeToString(rnd), ext)

	contentType := file.Header.Get("Content-Type")
	if contentType == "" {
		contentType = mime.TypeByExtension(ext)
	}

	f, err := file.Open()
	if err != nil {
		return fiber.NewError(500, "cannot open uploaded file")
	}
	defer f.Close()

	publicURL, err := h.store.Save(c.Context(), name, contentType, f, file.Size)
	if err != nil {
		return fiber.NewError(500, "failed to save file: "+err.Error())
	}

	return c.Status(201).JSON(fiber.Map{
		"url":      publicURL,
		"filename": name,
		"size":     file.Size,
	})
}
