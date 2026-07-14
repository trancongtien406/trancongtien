import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { getSessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const user = await getSessionUser();
  if (user) redirect("/admin");
  return <LoginForm />;
}
