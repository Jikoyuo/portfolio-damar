package database

import (
	"context"
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

// Connect opens a pgx pool. It auto-detects PgBouncer-style transaction
// poolers (e.g. Supabase pooler on port 6543) and switches pgx to
// simple-query protocol, since prepared statements are not safe in
// transaction-pooling mode.
func Connect(ctx context.Context, url string) (*pgxpool.Pool, error) {
	cfg, err := pgxpool.ParseConfig(url)
	if err != nil {
		return nil, fmt.Errorf("parse db url: %w", err)
	}

	if isTransactionPooler(url) {
		cfg.ConnConfig.DefaultQueryExecMode = pgx.QueryExecModeSimpleProtocol
		// Prepared statement caches are unsafe behind a tx pooler.
		cfg.ConnConfig.StatementCacheCapacity = 0
		cfg.ConnConfig.DescriptionCacheCapacity = 0
	}

	cfg.MaxConns = 10
	cfg.MinConns = 1
	cfg.MaxConnLifetime = 30 * time.Minute
	cfg.MaxConnIdleTime = 5 * time.Minute

	pool, err := pgxpool.NewWithConfig(ctx, cfg)
	if err != nil {
		return nil, fmt.Errorf("connect db: %w", err)
	}
	if err := pool.Ping(ctx); err != nil {
		pool.Close()
		return nil, fmt.Errorf("ping db: %w", err)
	}
	return pool, nil
}

// isTransactionPooler returns true for Supabase / PgBouncer transaction
// pooler URLs. Heuristic: hostname contains "pooler" OR port is 6543.
func isTransactionPooler(url string) bool {
	l := strings.ToLower(url)
	return strings.Contains(l, "pooler.") || strings.Contains(l, ":6543/") || strings.Contains(l, ":6543?")
}

func RunMigrations(ctx context.Context, pool *pgxpool.Pool, dir string) error {
	abs, _ := filepath.Abs(dir)
	entries, err := os.ReadDir(abs)
	if err != nil {
		return fmt.Errorf("read migrations dir %s: %w", abs, err)
	}
	for _, e := range entries {
		if e.IsDir() || filepath.Ext(e.Name()) != ".sql" {
			continue
		}
		path := filepath.Join(abs, e.Name())
		sql, err := os.ReadFile(path)
		if err != nil {
			return fmt.Errorf("read migration %s: %w", e.Name(), err)
		}
		if _, err := pool.Exec(ctx, string(sql)); err != nil {
			return fmt.Errorf("apply migration %s: %w", e.Name(), err)
		}
	}
	return nil
}
