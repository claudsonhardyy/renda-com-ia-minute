import type { SiteContent } from "@/content/site";
import { TipsCarousel } from "../TipsCarousel";
import { Heading, Section, Tag } from "../ui";

// Referência: 6- Página de dicas de gravação — título e carrossel na mesma tela.
export function Dicas({ c }: { c: SiteContent }) {
  const { dicas } = c;
  return (
    <Section id="dicas-gravacao">
      <div className="grid items-center gap-8 lg:grid-cols-[0.75fr_1.6fr] lg:gap-10">
        <div>
          <Tag icon="home">{dicas.selo}</Tag>
          <Heading white={dicas.tituloBranco} green={dicas.tituloVerde} />
          <p className="page-sub mt-4 max-w-sm text-white/85">{dicas.texto}</p>
        </div>
        <TipsCarousel items={dicas.itens} hint={dicas.passeParaOLado} />
      </div>
    </Section>
  );
}
