CREATE TABLE IF NOT EXISTS projects (
    id           BIGSERIAL PRIMARY KEY,
    title        TEXT NOT NULL,
    description  TEXT NOT NULL DEFAULT '',
    type         TEXT NOT NULL CHECK (type IN ('Office', 'Personal', 'Campus')),
    stack        TEXT[] NOT NULL DEFAULT '{}',
    images       TEXT[] NOT NULL DEFAULT '{}',
    demo_url     TEXT NOT NULL DEFAULT '',
    github_url   TEXT NOT NULL DEFAULT '',
    sort_order   INTEGER NOT NULL DEFAULT 0,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_projects_type ON projects(type);
CREATE INDEX IF NOT EXISTS idx_projects_sort ON projects(sort_order DESC, created_at DESC);
