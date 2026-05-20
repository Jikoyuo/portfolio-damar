package storage

import (
	"context"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"strings"
)

type LocalStorage struct {
	Dir       string
	PublicURL string // e.g. https://api.example.com (paths get prefixed /uploads/<file>)
}

func NewLocalStorage(dir, publicURL string) (*LocalStorage, error) {
	if err := os.MkdirAll(dir, 0o755); err != nil {
		return nil, fmt.Errorf("mkdir %s: %w", dir, err)
	}
	return &LocalStorage{Dir: dir, PublicURL: publicURL}, nil
}

func (s *LocalStorage) Save(ctx context.Context, filename, _ string, body io.Reader, _ int64) (string, error) {
	dst := filepath.Join(s.Dir, filename)
	f, err := os.Create(dst)
	if err != nil {
		return "", fmt.Errorf("create file: %w", err)
	}
	defer f.Close()
	if _, err := io.Copy(f, body); err != nil {
		return "", fmt.Errorf("write file: %w", err)
	}
	url := strings.TrimRight(s.PublicURL, "/") + "/uploads/" + filename
	return url, nil
}
