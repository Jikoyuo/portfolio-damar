// Public-site type. Kept for backwards-compat with seed data files.
// The page now fetches from the Go API; this just describes the shape.
export interface Project {
  id: number;
  title: string;
  description: string;
  type: "Office" | "Personal" | "Campus";
  stack: string[];
  images: string[];
  links?: {
    demo?: string;
    github?: string;
  };
}
