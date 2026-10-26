import { dicas } from "@/content/site";
import { TipsCarousel } from "../TipsCarousel";
import { Heading, Section, Tag } from "../ui";

// Referência: 6- Página de dicas de gravação
export function Dicas() {
  return (
    <Section id="dicas-gravacao">
      <Tag icon="home">{dicas.selo}</Tag>
      <Heading white={dicas.tituloBranco} green={dicas.tituloVerde} />
      <p className="mt-6 max-w-lg text-lg text-white/85">{dicas.texto}</p>
      <TipsCarousel items={dicas.itens} hint={dicas.passeParaOLado} />
    </Section>
  );
}
