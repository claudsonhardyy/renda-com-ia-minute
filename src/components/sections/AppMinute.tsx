import { appMinute } from "@/content/site";
import { AppCarousel } from "../AppCarousel";
import { Heading, Section, Tag } from "../ui";

// Referência: 3- Página do Minute
export function AppMinute() {
  return (
    <Section id="app-minute">
      <div className="grid items-start gap-10 md:grid-cols-[1.2fr_1fr]">
        <div>
          <Tag icon="phone">{appMinute.selo}</Tag>
          <Heading white={appMinute.tituloBranco} green={appMinute.tituloVerde} />
          <p className="mt-6 max-w-md text-lg text-white/85">{appMinute.texto}</p>
        </div>
        <div className="flex items-center gap-5 md:justify-end md:pt-10">
          <span className="grid size-24 shrink-0 place-items-center rounded-3xl bg-black text-5xl font-medium ring-1 ring-white/10 sm:size-28 sm:text-6xl">
            M.
          </span>
          <div>
            <p className="text-3xl font-light tracking-[0.3em] sm:text-4xl">MINUTE</p>
            <p className="mt-2 text-white/60">{appMinute.slogan}</p>
          </div>
        </div>
      </div>

      <AppCarousel items={appMinute.carrossel} />
    </Section>
  );
}
