import AdminShell from "@/components/admin/AdminShell";
import { getSession } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });
const TEMPLATE_NAME = process.env.NEXT_PUBLIC_TEMPLATE_NAME || "";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ entity: string }>;
}): Promise<Metadata> {
  const { entity } = await params;

  return {
    title: entity.replace(/_/g, " ") + " - Admin",
    icons: {
      icon: `/assets/${TEMPLATE_NAME}/img/favicon/favicon.png`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ entity: string }>;
}) {
  const session = await getSession();
  if (!session) return redirect("/admin/login");
  const { entity } = await params;

  return (
    <div className={cn(inter.className, "h-full")}>
      <AdminShell entity={entity} />
    </div>
  );
}
