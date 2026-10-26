import type { SiteContent } from "@/content/site";
import { AppCarousel } from "../AppCarousel";
import { Heading, Tag, Section } from "../ui";

// Referência: 3- Página do Minute — apresentação, celular com carrossel e texto do passo na mesma tela.
export function AppMinute({ c }: { c: SiteContent }) {
  const { appMinute } = c;
  return (
    <Section id="app-minute">
      <AppCarousel
        items={appMinute.carrossel}
        intro={
          <div>
            <Tag icon="phone">{appMinute.selo}</Tag>
            <Heading white={appMinute.tituloBranco} green={appMinute.tituloVerde} />
            <p className="page-sub mt-4 max-w-md text-white/85">{appMinute.texto}</p>
            <div className="mt-6 flex items-center gap-4">
              <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-black text-3xl font-medium ring-1 ring-white/10">
                M.
              </span>
              <div>
                <p className="text-2xl font-light tracking-[0.3em]">MINUTE</p>
                <p className="mt-1 text-sm text-white/60">{appMinute.slogan}</p>
              </div>
            </div>
          </div>
        }
      />
    </Section>
  );
}
