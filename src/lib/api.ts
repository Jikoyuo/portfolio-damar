export interface ApiProject {
  id: number;
  title: string;
  description: string;
  type: "Office" | "Personal" | "Campus";
  stack: string[];
  images: string[];
  demoUrl: string;
  githubUrl: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectInput {
  title: string;
  description: string;
  type: "Office" | "Personal" | "Campus";
  stack: string[];
  images: string[];
  demoUrl: string;
  githubUrl: string;
  sortOrder: number;
}

export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:8080";

export interface FetchOpts extends RequestInit {
  token?: string | null;
  /** ISR-style revalidate window (seconds). Defaults to 60 on server. */
  revalidate?: number;
}

async function request<T>(path: string, opts: FetchOpts = {}): Promise<T> {
  const { token, revalidate, headers, ...rest } = opts;
  const isServer = typeof window === "undefined";

  const res = await fetch(`${API_BASE}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(headers || {}),
    },
    // On server: enable ISR cache by default; on client: no-store unless caller overrides.
    ...(isServer
      ? { next: { revalidate: revalidate ?? 60 } }
      : { cache: rest.cache ?? "no-store" }),
  });

  if (!res.ok) {
    let msg = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (body?.error) msg = body.error;
    } catch {}
    throw new Error(msg);
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export const api = {
  listProjects: () =>
    request<{ data: ApiProject[] }>("/api/projects").then((r) => r.data),

  getProject: (id: number | string) =>
    request<{ data: ApiProject }>(`/api/projects/${id}`).then((r) => r.data),

  login: (username: string, password: string) =>
    request<{ token: string; username: string; expiresIn: number }>(
      "/api/auth/login",
      { method: "POST", body: JSON.stringify({ username, password }) }
    ),

  me: (token: string) =>
    request<{ username: string }>("/api/auth/me", { token }),

  createProject: (input: ProjectInput, token: string) =>
    request<{ data: ApiProject }>("/api/projects", {
      method: "POST",
      body: JSON.stringify(input),
      token,
    }).then((r) => r.data),

  updateProject: (id: number, input: ProjectInput, token: string) =>
    request<{ data: ApiProject }>(`/api/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(input),
      token,
    }).then((r) => r.data),

  deleteProject: (id: number, token: string) =>
    request<void>(`/api/projects/${id}`, { method: "DELETE", token }),

  uploadImage: async (file: File, token: string) => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch(`${API_BASE}/api/upload`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: fd,
    });
    if (!res.ok) {
      let msg = `Upload failed (${res.status})`;
      try {
        const body = await res.json();
        if (body?.error) msg = body.error;
      } catch {}
      throw new Error(msg);
    }
    return (await res.json()) as { url: string; filename: string; size: number };
  },
};
