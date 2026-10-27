import type { SiteContent } from "@/content/site";
import { TipsCarousel } from "../TipsCarousel";
import { Section } from "../ui";

// Referência: 6- Página de dicas de gravação — título e carrossel (imagem + texto) na mesma tela.
export function Dicas({ c }: { c: SiteContent }) {
  const { dicas } = c;
  return (
    <Section id="dicas-gravacao">
      {/* Título | barrinha vertical verde | subtítulo, lado a lado e centralizados */}
      <div className="mb-[2vh] flex flex-col items-center justify-center gap-x-7 gap-y-3 md:flex-row">
        <h2 className="page-title shrink-0">
          {dicas.tituloBranco} <span className="text-lime">{dicas.tituloVerde}</span>
        </h2>
        <span aria-hidden="true" className="hidden w-[3px] self-stretch rounded-full bg-lime md:block" />
        <p className="page-sub max-w-xl text-center md:text-left">{dicas.texto}</p>
      </div>
      <TipsCarousel items={dicas.itens} hint={dicas.passeParaOLado} />
    </Section>
  );
}
