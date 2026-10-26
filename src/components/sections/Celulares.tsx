import { celulares } from "@/content/site";
import { Icon } from "../Icon";
import { Heading, Section, Tag } from "../ui";

// Referência: 7- Página "Pagamentos" (o conteúdo é a lista de celulares compatíveis)
export function Celulares() {
  const { iphone, android, aviso } = celulares;
  return (
    <Section id="celulares-compativeis">
      <div className="grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Tag icon="phone">{celulares.selo}</Tag>
          <Heading white={celulares.tituloBranco} green={celulares.tituloVerde} />
          <p className="mt-6 max-w-md text-lg text-white/85">{celulares.texto}</p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={celulares.imagemDestaque.src}
          alt={celulares.imagemDestaque.alt}
          className="mx-auto hidden w-full max-w-sm md:block [mask-image:radial-gradient(closest-side,black_75%,transparent)]"
        />
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <article className="card p-6 sm:p-7">
          <header className="flex items-center gap-5">
            <span className="icon-box size-20 shrink-0 text-white">
              <Icon name="apple" className="size-10" />
            </span>
            <div>
              <h3 className="text-2xl font-bold">{iphone.titulo}</h3>
              <p className="mt-1 text-lime">{iphone.subtitulo}</p>
            </div>
          </header>
          <div className="mt-6 flex gap-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={iphone.imagem.src} alt={iphone.imagem.alt} className="hidden w-28 self-start sm:block" />
            <ul className="grid flex-1 gap-1.5 sm:pl-6">
              {iphone.modelos.map((m) => (
                <li key={m} className="flex items-center gap-3">
                  <Icon name="checkCircle" className="size-5 shrink-0 text-lime" strokeWidth={2.2} />
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </article>

        <article className="card p-6 sm:p-7">
          <header className="flex items-center gap-5">
            <span className="icon-box size-20 shrink-0 text-lime">
              <Icon name="android" className="size-11" />
            </span>
            <div>
              <h3 className="text-2xl font-bold">{android.titulo}</h3>
              <p className="mt-1 text-lime">{android.subtitulo}</p>
            </div>
          </header>
          <div className="mt-6 flex gap-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={android.imagem.src} alt={android.imagem.alt} className="hidden w-24 self-start sm:block" />
            <div className="flex-1 space-y-6">
              {android.marcas.map((marca) => (
                <div key={marca.nome}>
                  <h4 className="flex items-center gap-3 font-bold">
                    <Icon name="checkCircle" className="size-5 shrink-0 text-lime" strokeWidth={2.2} />
                    {marca.nome}
                  </h4>
                  <ul className="mt-2 space-y-1 pl-8 text-white/85">
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

      <div className="card mt-8 flex items-center gap-6 p-6">
        <Icon name="alertCircle" className="size-14 shrink-0 text-lime" strokeWidth={1.6} />
        <div className="border-l border-white/15 pl-6">
          <h4 className="text-xl font-bold text-lime">{aviso.titulo}</h4>
          <p className="mt-1 text-white/85">{aviso.texto}</p>
        </div>
      </div>
    </Section>
  );
}
