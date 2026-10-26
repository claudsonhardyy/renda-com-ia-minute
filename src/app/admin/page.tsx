import type { Metadata } from "next";
import { defaultContent } from "@/content/site";
import { requireAdmin } from "@/lib/admin";
import { getDraftContent, mergeContent } from "@/lib/content";
import { Editor } from "./Editor";

export const metadata: Metadata = { title: "Painel MINUTE", robots: { index: false } };

export default async function AdminPage() {
  const { supabase, user } = await requireAdmin();
  const draft = await getDraftContent();
  const { data: published } = await supabase.from("site_content").select("content").eq("id", "published").single();
  const hasUnpublished =
    JSON.stringify(draft) !== JSON.stringify(mergeContent(defaultContent, published?.content));

  return <Editor initial={draft} defaults={defaultContent} hasUnpublished={hasUnpublished} email={user.email ?? ""} />;
}
