import type { SiteContent } from "@/content/site";
import { TipsCarousel } from "../TipsCarousel";
import { Section } from "../ui";

// Referência: 6- Página de dicas de gravação — título e carrossel de dicas na mesma tela.
export function Dicas({ c }: { c: SiteContent }) {
  const { dicas } = c;
  return (
    <Section id="dicas-gravacao" tight>
      {/* No computador a página tem a altura exata da tela: título em cima e a dica ocupa o resto */}
      <div className="flex flex-col lg:h-[calc(100dvh-4rem-2vh)]">
        {/* Título | barrinha vertical verde do tamanho do subtítulo (2 linhas), centralizados */}
        <div className="mt-[1.8vh] mb-[2.6vh] flex shrink-0 flex-col items-center justify-center gap-x-9 gap-y-3 md:flex-row">
          <h2 className="page-title shrink-0">
            {dicas.tituloBranco} <span className="text-lime">{dicas.tituloVerde}</span>
          </h2>
          <p className="max-w-[33rem] text-center text-[clamp(0.85rem,2.3vh,1.02rem)] leading-relaxed text-balance text-white/80 md:border-l-[3px] md:border-lime md:py-0.5 md:pl-7 md:text-left">
            {dicas.texto}
          </p>
        </div>
        <div className="min-h-0 flex-1">
          <TipsCarousel items={dicas.itens} />
        </div>
      </div>
    </Section>
  );
}
