package storage

import (
	"context"
	"io"
)

// Storage abstracts the destination for uploaded files. Implementations:
//   - LocalStorage:    writes to a directory served by Fiber's Static
//   - SupabaseStorage: uploads to a Supabase Storage bucket
type Storage interface {
	// Save persists the body and returns a publicly-resolvable URL.
	Save(ctx context.Context, filename, contentType string, body io.Reader, size int64) (publicURL string, err error)
}
