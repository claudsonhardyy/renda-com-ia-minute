import type { SiteContent } from "@/content/site";
import { Icon } from "../Icon";
import { Heading, Section } from "../ui";

// Referência: 7- Página "Pagamentos" (conteúdo: celulares compatíveis) — listas iPhone/Android e aviso na mesma tela.
export function Celulares({ c }: { c: SiteContent }) {
  const { celulares } = c;
  const { iphone, android, aviso } = celulares;
  return (
    <Section id="celulares-compativeis">
      <Heading white={celulares.tituloBranco} green={celulares.tituloVerde} inline />
      <p className="page-sub mt-2 max-w-xl text-white/85">{celulares.texto}</p>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <article className="card p-4">
          <header className="flex items-center gap-4">
            <span className="icon-box size-14 shrink-0 text-white">
              <Icon name="apple" className="size-8" />
            </span>
            <div>
              <h3 className="card-title">{iphone.titulo}</h3>
              <p className="text-sm text-lime">{iphone.subtitulo}</p>
            </div>
          </header>
          <div className="mt-4 flex gap-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={iphone.imagem.src} alt={iphone.imagem.alt} className="hidden h-[min(calc(100dvh-26rem),240px)] self-center sm:block" />
            <ul className="grid flex-1 grid-cols-2 gap-x-4 gap-y-0.5 text-[13px] leading-snug min-[1400px]:text-sm">
              {iphone.modelos.map((m) => (
                <li key={m} className="flex items-center gap-2">
                  <Icon name="checkCircle" className="size-4 shrink-0 text-lime" strokeWidth={2.2} />
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </article>

        <article className="card p-4">
          <header className="flex items-center gap-4">
            <span className="icon-box size-14 shrink-0 text-lime">
              <Icon name="android" className="size-9" />
            </span>
            <div>
              <h3 className="card-title">{android.titulo}</h3>
              <p className="text-sm text-lime">{android.subtitulo}</p>
            </div>
          </header>
          <div className="mt-4 flex gap-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={android.imagem.src} alt={android.imagem.alt} className="hidden h-[min(20vh,170px)] self-center xl:block" />
            <div className="flex-1 gap-x-5 text-sm sm:columns-2">
              {android.marcas.map((marca) => (
                <div key={marca.nome} className="mb-3 break-inside-avoid">
                  <h4 className="flex items-center gap-2 font-bold">
                    <Icon name="checkCircle" className="size-4 shrink-0 text-lime" strokeWidth={2.2} />
                    {marca.nome}
                  </h4>
                  <ul className="mt-1 space-y-0.5 pl-6 text-[13px] text-white/85">
                    {marca.modelos.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>

      <div className="card mt-3 flex items-center gap-5 px-4 py-3">
        <Icon name="alertCircle" className="size-10 shrink-0 text-lime" strokeWidth={1.6} />
        <div className="border-l border-white/15 pl-5">
          <h4 className="card-title text-lime">{aviso.titulo}</h4>
          <p className="card-text">{aviso.texto}</p>
        </div>
      </div>
    </Section>
  );
}
