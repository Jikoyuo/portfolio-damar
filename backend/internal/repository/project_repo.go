package repository

import (
	"context"
	"errors"
	"fmt"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/jikoyuo/portfolio-backend/internal/models"
)

var ErrNotFound = errors.New("project not found")

type ProjectRepo struct {
	pool *pgxpool.Pool
}

func NewProjectRepo(pool *pgxpool.Pool) *ProjectRepo {
	return &ProjectRepo{pool: pool}
}

func (r *ProjectRepo) List(ctx context.Context) ([]models.Project, error) {
	rows, err := r.pool.Query(ctx, `
		SELECT id, title, description, type, stack, images, demo_url, github_url, sort_order, created_at, updated_at
		FROM projects
		ORDER BY sort_order DESC, created_at DESC
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	out := []models.Project{}
	for rows.Next() {
		var p models.Project
		if err := rows.Scan(&p.ID, &p.Title, &p.Description, &p.Type, &p.Stack, &p.Images, &p.DemoURL, &p.GithubURL, &p.SortOrder, &p.CreatedAt, &p.UpdatedAt); err != nil {
			return nil, err
		}
		out = append(out, p)
	}
	return out, rows.Err()
}

func (r *ProjectRepo) Get(ctx context.Context, id int64) (*models.Project, error) {
	var p models.Project
	err := r.pool.QueryRow(ctx, `
		SELECT id, title, description, type, stack, images, demo_url, github_url, sort_order, created_at, updated_at
		FROM projects WHERE id = $1
	`, id).Scan(&p.ID, &p.Title, &p.Description, &p.Type, &p.Stack, &p.Images, &p.DemoURL, &p.GithubURL, &p.SortOrder, &p.CreatedAt, &p.UpdatedAt)
	if errors.Is(err, pgx.ErrNoRows) {
		return nil, ErrNotFound
	}
	if err != nil {
		return nil, err
	}
	return &p, nil
}

func (r *ProjectRepo) Create(ctx context.Context, in models.ProjectInput) (*models.Project, error) {
	var p models.Project
	err := r.pool.QueryRow(ctx, `
		INSERT INTO projects (title, description, type, stack, images, demo_url, github_url, sort_order)
		VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
		RETURNING id, title, description, type, stack, images, demo_url, github_url, sort_order, created_at, updated_at
	`, in.Title, in.Description, in.Type, in.Stack, in.Images, in.DemoURL, in.GithubURL, in.SortOrder).
		Scan(&p.ID, &p.Title, &p.Description, &p.Type, &p.Stack, &p.Images, &p.DemoURL, &p.GithubURL, &p.SortOrder, &p.CreatedAt, &p.UpdatedAt)
	if err != nil {
		return nil, fmt.Errorf("insert project: %w", err)
	}
	return &p, nil
}

func (r *ProjectRepo) Update(ctx context.Context, id int64, in models.ProjectInput) (*models.Project, error) {
	var p models.Project
	err := r.pool.QueryRow(ctx, `
		UPDATE projects SET
			title = $1,
			description = $2,
			type = $3,
			stack = $4,
			images = $5,
			demo_url = $6,
			github_url = $7,
			sort_order = $8,
			updated_at = NOW()
		WHERE id = $9
		RETURNING id, title, description, type, stack, images, demo_url, github_url, sort_order, created_at, updated_at
	`, in.Title, in.Description, in.Type, in.Stack, in.Images, in.DemoURL, in.GithubURL, in.SortOrder, id).
		Scan(&p.ID, &p.Title, &p.Description, &p.Type, &p.Stack, &p.Images, &p.DemoURL, &p.GithubURL, &p.SortOrder, &p.CreatedAt, &p.UpdatedAt)
	if errors.Is(err, pgx.ErrNoRows) {
		return nil, ErrNotFound
	}
	if err != nil {
		return nil, err
	}
	return &p, nil
}

func (r *ProjectRepo) Delete(ctx context.Context, id int64) error {
	tag, err := r.pool.Exec(ctx, `DELETE FROM projects WHERE id = $1`, id)
	if err != nil {
		return err
	}
	if tag.RowsAffected() == 0 {
		return ErrNotFound
	}
	return nil
}
