package storage

import (
	"context"
	"errors"
	"fmt"
	"io"
	"net/http"
	"strings"
	"time"
)

// SupabaseStorage uploads files to a Supabase Storage bucket.
//
// Required env (validated in config):
//   SUPABASE_URL          e.g. https://abcd1234.supabase.co
//   SUPABASE_SERVICE_KEY  service_role key — server-only, never expose
//   SUPABASE_BUCKET       bucket name (must be set to public if you want
//                         the returned URL to be hot-linkable)
type SupabaseStorage struct {
	BaseURL    string // https://<project>.supabase.co
	ServiceKey string
	Bucket     string
	client     *http.Client
}

func NewSupabaseStorage(baseURL, serviceKey, bucket string) (*SupabaseStorage, error) {
	if baseURL == "" || serviceKey == "" || bucket == "" {
		return nil, errors.New("supabase storage: BASE_URL, SERVICE_KEY and BUCKET are required")
	}
	return &SupabaseStorage{
		BaseURL:    strings.TrimRight(baseURL, "/"),
		ServiceKey: serviceKey,
		Bucket:     bucket,
		client:     &http.Client{Timeout: 30 * time.Second},
	}, nil
}

// Save POSTs the body to /storage/v1/object/<bucket>/<filename>
// and returns the public URL.
//
//   POST https://<project>.supabase.co/storage/v1/object/<bucket>/<filename>
//   Authorization: Bearer <service_role>
//   Content-Type:  <mime>
//   body: raw bytes
//
// On success, returns:
//   https://<project>.supabase.co/storage/v1/object/public/<bucket>/<filename>
func (s *SupabaseStorage) Save(ctx context.Context, filename, contentType string, body io.Reader, size int64) (string, error) {
	endpoint := fmt.Sprintf("%s/storage/v1/object/%s/%s", s.BaseURL, s.Bucket, filename)
	req, err := http.NewRequestWithContext(ctx, http.MethodPost, endpoint, body)
	if err != nil {
		return "", fmt.Errorf("supabase: build request: %w", err)
	}
	if contentType == "" {
		contentType = "application/octet-stream"
	}
	// Both headers required for Supabase's new sb_secret_ key format
	req.Header.Set("Authorization", "Bearer "+s.ServiceKey)
	req.Header.Set("apikey", s.ServiceKey)
	req.Header.Set("Content-Type", contentType)
	req.Header.Set("x-upsert", "true")
	if size > 0 {
		req.ContentLength = size
	}

	resp, err := s.client.Do(req)
	if err != nil {
		return "", fmt.Errorf("supabase: http: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		buf := make([]byte, 512)
		n, _ := resp.Body.Read(buf)
		return "", fmt.Errorf("supabase upload failed (%d): %s", resp.StatusCode, string(buf[:n]))
	}

	publicURL := fmt.Sprintf("%s/storage/v1/object/public/%s/%s", s.BaseURL, s.Bucket, filename)
	return publicURL, nil
}
