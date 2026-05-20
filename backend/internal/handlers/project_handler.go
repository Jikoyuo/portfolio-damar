package handlers

import (
	"errors"
	"strconv"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/jikoyuo/portfolio-backend/internal/models"
	"github.com/jikoyuo/portfolio-backend/internal/repository"
)

type ProjectHandler struct {
	repo *repository.ProjectRepo
}

func NewProjectHandler(repo *repository.ProjectRepo) *ProjectHandler {
	return &ProjectHandler{repo: repo}
}

func (h *ProjectHandler) List(c *fiber.Ctx) error {
	items, err := h.repo.List(c.Context())
	if err != nil {
		return fiber.NewError(500, "failed to list projects")
	}
	return c.JSON(fiber.Map{"data": items})
}

func (h *ProjectHandler) Get(c *fiber.Ctx) error {
	id, err := strconv.ParseInt(c.Params("id"), 10, 64)
	if err != nil {
		return fiber.NewError(400, "invalid id")
	}
	p, err := h.repo.Get(c.Context(), id)
	if errors.Is(err, repository.ErrNotFound) {
		return fiber.NewError(404, "project not found")
	}
	if err != nil {
		return fiber.NewError(500, "failed to fetch project")
	}
	return c.JSON(fiber.Map{"data": p})
}

func validateInput(in *models.ProjectInput) error {
	in.Title = strings.TrimSpace(in.Title)
	in.Description = strings.TrimSpace(in.Description)
	in.DemoURL = strings.TrimSpace(in.DemoURL)
	in.GithubURL = strings.TrimSpace(in.GithubURL)
	if in.Title == "" {
		return errors.New("title is required")
	}
	if !models.ValidTypes[in.Type] {
		return errors.New("type must be one of: Office, Personal, Campus")
	}
	if in.Stack == nil {
		in.Stack = []string{}
	}
	if in.Images == nil {
		in.Images = []string{}
	}
	for i, s := range in.Stack {
		in.Stack[i] = strings.TrimSpace(s)
	}
	return nil
}

func (h *ProjectHandler) Create(c *fiber.Ctx) error {
	var in models.ProjectInput
	if err := c.BodyParser(&in); err != nil {
		return fiber.NewError(400, "invalid body")
	}
	if err := validateInput(&in); err != nil {
		return fiber.NewError(400, err.Error())
	}
	p, err := h.repo.Create(c.Context(), in)
	if err != nil {
		return fiber.NewError(500, "failed to create project")
	}
	return c.Status(201).JSON(fiber.Map{"data": p})
}

func (h *ProjectHandler) Update(c *fiber.Ctx) error {
	id, err := strconv.ParseInt(c.Params("id"), 10, 64)
	if err != nil {
		return fiber.NewError(400, "invalid id")
	}
	var in models.ProjectInput
	if err := c.BodyParser(&in); err != nil {
		return fiber.NewError(400, "invalid body")
	}
	if err := validateInput(&in); err != nil {
		return fiber.NewError(400, err.Error())
	}
	p, err := h.repo.Update(c.Context(), id, in)
	if errors.Is(err, repository.ErrNotFound) {
		return fiber.NewError(404, "project not found")
	}
	if err != nil {
		return fiber.NewError(500, "failed to update project")
	}
	return c.JSON(fiber.Map{"data": p})
}

func (h *ProjectHandler) Delete(c *fiber.Ctx) error {
	id, err := strconv.ParseInt(c.Params("id"), 10, 64)
	if err != nil {
		return fiber.NewError(400, "invalid id")
	}
	if err := h.repo.Delete(c.Context(), id); err != nil {
		if errors.Is(err, repository.ErrNotFound) {
			return fiber.NewError(404, "project not found")
		}
		return fiber.NewError(500, "failed to delete project")
	}
	return c.SendStatus(204)
}
