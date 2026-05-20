import { AdminAuthProvider } from "@/components/admin/AdminAuth";
import AdminShell from "@/components/admin/AdminShell";

export const metadata = {
  title: "Damar — Studio",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthProvider>
      <AdminShell>{children}</AdminShell>
    </AdminAuthProvider>
  );
}
