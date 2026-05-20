# syntax=docker/dockerfile:1.7

# ---------- builder ----------
FROM golang:1.25-alpine AS builder

WORKDIR /src

# Cache deps
COPY go.mod go.sum ./
RUN go mod download

# Source
COPY . .

# Build statically-linked binary for distroless/scratch base
ENV CGO_ENABLED=0 GOOS=linux GOARCH=amd64
RUN go build -trimpath -ldflags="-s -w" -o /out/server .

# ---------- runtime ----------
FROM gcr.io/distroless/static-debian12:nonroot

WORKDIR /app

# Migrations are read at startup from ./migrations
COPY --from=builder /src/migrations ./migrations

# Pre-create uploads dir (ephemeral on Cloud Run — see README)
COPY --from=builder /out/server /app/server

# Cloud Run injects PORT; default to 8080 for local docker
ENV PORT=8080
EXPOSE 8080

USER nonroot:nonroot
ENTRYPOINT ["/app/server"]
