"use client";

import type { TipColumn, TipItem } from "@/content/site";
import { Icon } from "./Icon";
import { usePending } from "./Pending";
import { CarouselArrow } from "./ui";
import { StepDots } from "./StepDots";
import { useCarousel } from "./useCarousel";

// Padrão único das dicas: todos os quadros têm o mesmo tamanho e usam os mesmos tamanhos de
// número, título, selos, ícones, linha divisória e rodapé.
type Tone = TipColumn["tipo"];
const toneText = (t: Tone) => (t === "correto" ? "text-lime" : "text-alert");
const toneBorder = (t: Tone) => (t === "correto" ? "border-lime" : "border-alert");
const TEXTO = "text-[clamp(0.78rem,2vh,0.95rem)] leading-snug";
const TITULO = "text-[clamp(0.9rem,2.4vh,1.15rem)] leading-snug font-bold text-white";

// Marcação: **x** = cor da coluna, ++x++ = verde, !!x!! = vermelho, __x__ = branco em negrito.
function TipText({ text, tone = "correto" }: { text: string; tone?: Tone }) {
  return (
    <>
      {text.split("\n").map((line, i) => (
        <span key={i} className="block">
          {line.split(/(\*\*[^*]+\*\*|\+\+[^+]+\+\+|!![^!]+!!|__[^_]+__)/g).map((part, j) => {
            const inner = part.slice(2, -2);
            if (part.startsWith("**") && part.endsWith("**")) return <strong key={j} className={`font-bold ${toneText(tone)}`}>{inner}</strong>;
            if (part.startsWith("++") && part.endsWith("++")) return <strong key={j} className="font-bold text-lime">{inner}</strong>;
            if (part.startsWith("!!") && part.endsWith("!!")) return <strong key={j} className="font-bold text-alert">{inner}</strong>;
            if (part.startsWith("__") && part.endsWith("__")) return <strong key={j} className="font-bold text-white">{inner}</strong>;
            return part;
          })}
        </span>
      ))}
    </>
  );
}

// Ícone redondo dos textos (mesmo tamanho em todas as dicas): ✓ verde, ✗ vermelho ou ícone próprio.
function TextIcon({ tone, icon }: { tone: Tone; icon?: string }) {
  return (
    <span className={`grid size-10 shrink-0 place-items-center rounded-full border-2 ${toneBorder(tone)} ${toneText(tone)}`}>
      <Icon name={icon || (tone === "correto" ? "check" : "x")} className={icon === "hands" ? "size-[26px]" : "size-5"} strokeWidth={2.4} />
    </span>
  );
}

// Foto com contorno e selo ✓/✗ no canto (selo do mesmo tamanho em todas as fotos).
// natural: a foto mantém a proporção original (largura acompanha a altura), sem cortes.
function Photo({ col, i = 0, natural = false, className = "" }: { col: TipColumn; i?: number; natural?: boolean; className?: string }) {
  const foto = col.imagens[i];
  const selo = col.selo !== false;
  return (
    <div className={`relative overflow-hidden rounded-xl border-2 ${toneBorder(col.tipo)} ${className}`}>
      {foto?.src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={foto.src} alt={foto.alt} className={natural ? "block h-auto w-full sm:h-full sm:w-auto sm:max-w-full sm:object-cover" : `block h-full w-full object-cover ${col.foco === "left" ? "object-left" : col.foco === "right" ? "object-right" : ""}`} />
      ) : (
        <div className="grid h-full min-h-24 place-items-center text-sm text-amber-200">foto pendente</div>
      )}
      {selo && (
        <span className={`absolute top-2 left-2 grid size-8 place-items-center rounded-full border-2 bg-black/60 ${toneBorder(col.tipo)} ${toneText(col.tipo)}`}>
          <Icon name={col.tipo === "correto" ? "check" : "x"} className="size-4" strokeWidth={3} />
          <span className="sr-only">{col.tipo === "correto" ? "Faça assim" : "Evite"}</span>
        </span>
      )}
    </div>
  );
}

function ColumnText({ col, icone = true }: { col: TipColumn; icone?: boolean }) {
  if (!col.titulo && !col.texto) return null;
  return (
    <div className="flex items-center gap-3">
      {icone && col.icone !== "-" && <TextIcon tone={col.tipo} icon={col.icone} />}
      <div className="min-w-0">
        {col.titulo && (
          <p className={TITULO}>
            <TipText text={col.titulo} tone={col.tipo} />
          </p>
        )}
        {col.texto && (
          <p className={`${TEXTO} ${col.titulo ? "mt-0.5 text-white/85" : "font-semibold text-white"}`}>
            <TipText text={col.texto} tone={col.tipo} />
          </p>
        )}
      </div>
    </div>
  );
}

// Fotos lado a lado (mesma altura) e o texto de cada uma logo abaixo.
function LayoutColunas({ item }: { item: TipItem }) {
  const [a, b] = item.colunas;
  const temTexto = item.colunas.some((c) => c.titulo || c.texto);
  return (
    <div className="grid min-h-0 flex-1 grid-cols-1 gap-x-6 gap-y-[1.4vh] sm:grid-cols-2 lg:grid-rows-[minmax(0,1fr)_auto]">
      {a && <Photo col={a} className="aspect-[2/1] sm:row-start-1 lg:aspect-auto" />}
      {b && <Photo col={b} className="aspect-[2/1] sm:row-start-1 lg:aspect-auto" />}
      {temTexto ? (
        <>
          {a && <div className="sm:row-start-2"><ColumnText col={a} /></div>}
          {b && <div className="sm:row-start-2 sm:border-l sm:border-white/15 sm:pl-6"><ColumnText col={b} /></div>}
        </>
      ) : (
        item.textoGeral.texto && (
          <div className="flex items-center justify-center gap-3 sm:col-span-2 sm:row-start-2">
            {item.textoGeral.icone && <TextIcon tone="correto" icon={item.textoGeral.icone} />}
            <p className={`${TITULO} font-semibold`}>
              <TipText text={item.textoGeral.texto} />
            </p>
          </div>
        )
      )}
    </div>
  );
}

// Dois quadros (fazer / não fazer), cada um com a foto e o texto ao lado.
function LayoutLado({ item }: { item: TipItem }) {
  return (
    <div className="grid min-h-0 flex-1 gap-5 sm:grid-cols-2">
      {item.colunas.map((col, i) => (
        <div key={i} className={`flex min-h-0 flex-col gap-4 rounded-xl border-2 p-2.5 sm:flex-row sm:items-center ${col.tipo === "correto" ? "border-lime/70" : "border-alert/80"}`}>
          <Photo col={col} natural className="shrink-0 sm:h-[76%] sm:max-w-[64%]" />
          {/* Ícone (se houver) na mesma linha do título; texto embaixo, na largura toda */}
          <div className="min-w-0 flex-1 pr-1">
            <div className="flex items-center gap-2.5">
              {col.icone !== "-" && <TextIcon tone={col.tipo} icon={col.icone} />}
              <p className={TITULO}>
                <TipText text={col.titulo} tone={col.tipo} />
              </p>
            </div>
            {col.texto && (
              <p className={`${TEXTO} mt-1.5 text-white/85`}>
                <TipText text={col.texto} tone={col.tipo} />
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// Sequência da semana: uma faixa por coluna (✗ repetição em cima, ✓ variação embaixo).
function LayoutSemana({ item }: { item: TipItem }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-[1.4vh]">
      {item.colunas.map((col, i) => (
        <div key={i} className={`flex min-h-0 flex-1 flex-col items-center gap-3 rounded-xl border-2 p-2.5 sm:flex-row sm:gap-5 sm:px-4 ${col.tipo === "correto" ? "border-lime/70" : "border-alert/80"}`}>
          <TextIcon tone={col.tipo} />
          <div className="grid h-full min-h-0 w-full flex-1 grid-cols-5 gap-2">
            {col.imagens.map((img, k) => (
              <figure key={k} className="flex h-full min-h-0 flex-col items-center gap-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.src} alt={img.alt} className={`aspect-[4/3] w-full rounded-lg border object-cover sm:aspect-auto sm:min-h-0 sm:flex-1 ${col.tipo === "correto" ? "border-lime/60" : "border-alert/70"}`} />
                {col.rotulos[k] && <figcaption className="text-xs font-bold tracking-wide text-white">{col.rotulos[k]}</figcaption>}
              </figure>
            ))}
          </div>
          <p className={`${TITULO} shrink-0 text-center sm:w-52 sm:border-l sm:border-white/15 sm:pl-5 sm:text-left`}>
            <TipText text={col.titulo} tone={col.tipo} />
          </p>
        </div>
      ))}
    </div>
  );
}

// Uma dica: cabeçalho (número + título + linha/texto lateral), conteúdo, linha e rodapé.
function TipSlide({ item, n }: { item: TipItem; n: number }) {
  return (
    <article className="card flex w-full min-w-0 flex-col gap-[1.6vh] p-3 sm:px-5 sm:py-[1.8vh] lg:h-full lg:min-h-0">
      <header className="flex shrink-0 flex-wrap items-center gap-x-4 gap-y-1">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-lime text-xl font-extrabold text-lime-ink">{n}</span>
        <div className="min-w-0">
          <h3 className="text-[clamp(1.25rem,3.6vh,1.85rem)] leading-tight font-extrabold tracking-tight">
            {item.tituloBranco} <span className="text-lime">{item.tituloVerde}</span>
          </h3>
          {item.subtitulo && <p className={`${TEXTO} text-white/80`}>{item.subtitulo}</p>}
        </div>
        {item.lateral && <p className={`${TEXTO} max-w-md border-l border-white/20 pl-4 text-white/80 sm:ml-2`}>{item.lateral}</p>}
      </header>

      {item.layout === "semana" ? <LayoutSemana item={item} /> : item.layout === "lado" ? <LayoutLado item={item} /> : <LayoutColunas item={item} />}

      {item.nota.texto && (
        <p className={`flex shrink-0 items-center gap-3 border-t border-lime/40 pt-[1.4vh] ${TEXTO} text-white/90`}>
          <Icon name={item.nota.tipo === "evitar" ? "xCircle" : "alertCircle"} className="size-7 shrink-0 text-alert" strokeWidth={2.2} />
          <span>
            <TipText text={item.nota.texto} />
          </span>
        </p>
      )}
    </article>
  );
}

// Carrossel de dicas de gravação: uma dica por vez, todas no mesmo quadro, com setas dos dois
// lados e só as bolinhas embaixo (a verde acesa anda até a dica atual). Sem reprodução automática.
export function TipsCarousel({ items: all }: { items: TipItem[] }) {
  const showPending = usePending();
  const items = all.filter((it) => it.colunas.some((c) => c.imagens.some((m) => m.src)) || showPending);
  const { index, goTo, prev, next, regionProps } = useCarousel(items.length);
  if (items.length === 0) return null;
  const many = items.length > 1;

  return (
    <div role="region" aria-roledescription="carrossel" aria-label="Dicas de gravação" className="flex flex-col gap-[1.2vh] outline-offset-8 lg:h-full lg:min-h-0" {...regionProps}>
      <div className="flex min-h-0 items-center gap-3 lg:flex-1 lg:gap-5">
        <div className="hidden sm:block">
          <CarouselArrow direction="prev" label="Dica anterior" onClick={prev} disabled={!many} />
        </div>
        <div key={index} className="flex min-w-0 flex-1 animate-[slide_350ms_ease-out] lg:h-full lg:min-h-0" aria-live="polite">
          <TipSlide item={items[index]} n={index + 1} />
        </div>
        <div className="hidden sm:block">
          <CarouselArrow direction="next" label="Próxima dica" onClick={next} disabled={!many} />
        </div>
      </div>
      <div className="flex shrink-0 items-center justify-center gap-4">
        <div className="sm:hidden">
          <CarouselArrow direction="prev" label="Dica anterior" onClick={prev} disabled={!many} />
        </div>
        <StepDots count={items.length} index={index} onSelect={goTo} itemLabel="a dica" />
        <div className="sm:hidden">
          <CarouselArrow direction="next" label="Próxima dica" onClick={next} disabled={!many} />
        </div>
      </div>
    </div>
  );
}
