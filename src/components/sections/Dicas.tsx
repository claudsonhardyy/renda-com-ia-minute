import type { SiteContent } from "@/content/site";
import { TipsCarousel } from "../TipsCarousel";
import { Heading, Section } from "../ui";

// Referência: 6- Página de dicas de gravação — título e carrossel (imagem + texto) na mesma tela.
export function Dicas({ c }: { c: SiteContent }) {
  const { dicas } = c;
  return (
    <Section id="dicas-gravacao">
      <div className="mb-[3vh] flex flex-wrap items-end justify-between gap-x-10 gap-y-3">
        <Heading white={dicas.tituloBranco} green={dicas.tituloVerde} inline />
        <p className="page-sub max-w-md text-white/85">{dicas.texto}</p>
      </div>
      <TipsCarousel items={dicas.itens} hint={dicas.passeParaOLado} />
    </Section>
  );
}
