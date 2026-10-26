import { SiteView } from "@/components/SiteView";
import { getPublishedContent } from "@/lib/content";

// Página estática, regerada ao publicar no painel (revalidatePath) e, por garantia, a cada 5 min.
export const revalidate = 300;

export default async function Home() {
  const c = await getPublishedContent();
  return <SiteView c={c} showPending={process.env.NODE_ENV !== "production"} />;
}
