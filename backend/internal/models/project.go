package models

import "time"

type Project struct {
	ID          int64     `json:"id"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Type        string    `json:"type"`
	Stack       []string  `json:"stack"`
	Images      []string  `json:"images"`
	DemoURL     string    `json:"demoUrl"`
	GithubURL   string    `json:"githubUrl"`
	SortOrder   int       `json:"sortOrder"`
	CreatedAt   time.Time `json:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt"`
}

type ProjectInput struct {
	Title       string   `json:"title"`
	Description string   `json:"description"`
	Type        string   `json:"type"`
	Stack       []string `json:"stack"`
	Images      []string `json:"images"`
	DemoURL     string   `json:"demoUrl"`
	GithubURL   string   `json:"githubUrl"`
	SortOrder   int      `json:"sortOrder"`
}

var ValidTypes = map[string]bool{
	"Office":   true,
	"Personal": true,
	"Campus":   true,
}
