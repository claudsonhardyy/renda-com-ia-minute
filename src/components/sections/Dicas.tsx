import type { SiteContent } from "@/content/site";
import { TipsCarousel } from "../TipsCarousel";
import { Heading, Section } from "../ui";

// Referência: 6- Página de dicas de gravação — título e carrossel (imagem + texto) na mesma tela.
export function Dicas({ c }: { c: SiteContent }) {
  const { dicas } = c;
  return (
    <Section id="dicas-gravacao">
      {/* Título centralizado, barrinha fina e subtítulo, alinhados ao quadro do carrossel */}
      <div className="mx-auto mb-[3vh] max-w-3xl text-center">
        <Heading white={dicas.tituloBranco} green={dicas.tituloVerde} inline />
        <div className="mx-auto mt-[2vh] h-px w-24 bg-lime/70" />
        <p className="page-sub mt-[1.6vh]">{dicas.texto}</p>
      </div>
      <TipsCarousel items={dicas.itens} hint={dicas.passeParaOLado} />
    </Section>
  );
}
