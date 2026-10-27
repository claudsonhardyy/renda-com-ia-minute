import type { SiteContent } from "@/content/site";
import { TipsCarousel } from "../TipsCarousel";
import { Section } from "../ui";

// Referência: 6- Página de dicas de gravação — título e carrossel de dicas (fotos + textos) na mesma tela.
export function Dicas({ c }: { c: SiteContent }) {
  const { dicas } = c;
  return (
    <Section id="dicas-gravacao">
      {/* No computador a página tem a altura exata da tela: título em cima e a dica ocupa o resto */}
      <div className="flex flex-col lg:h-[calc(100dvh-4rem-5vh)]">
        {/* Título | barrinha vertical verde | subtítulo, lado a lado e centralizados */}
        <div className="mb-[2vh] flex shrink-0 flex-col items-center justify-center gap-x-7 gap-y-3 md:flex-row">
          <h2 className="page-title shrink-0">
            {dicas.tituloBranco}{" "}
            <span className="text-lime">{dicas.tituloVerde}</span>
          </h2>
          <span
            aria-hidden="true"
            className="hidden w-[3px] self-stretch rounded-full bg-lime md:block"
          />
          <p className="page-sub max-w-md text-center md:text-left">
            {dicas.texto}
          </p>
        </div>
        <div className="min-h-0 flex-1">
          <TipsCarousel items={dicas.itens} hint={dicas.passeParaOLado} />
        </div>
      </div>
    </Section>
  );
}
