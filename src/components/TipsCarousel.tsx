"use client";

import type { TipColumn, TipItem } from "@/content/site";
import { Icon } from "./Icon";
import { usePending } from "./Pending";
import { CarouselArrow, NumberBadge } from "./ui";
import { StepDots } from "./StepDots";
import { useCarousel } from "./useCarousel";

type Tone = TipColumn["tipo"];
const toneText = (tone: Tone) => (tone === "correto" ? "text-lime" : "text-alert");
const toneBorder = (tone: Tone) => (tone === "correto" ? "border-lime" : "border-alert");

// Marcação dos textos das dicas: **x** = cor da coluna, ++x++ = verde, !!x!! = vermelho,
// __x__ = branco em negrito; cada quebra de linha vira uma nova linha.
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

// Selo redondo ✓ (verde) ou ✗ (vermelho), ou o ícone próprio do texto.
function ToneBadge({ tone, icon, className = "size-9" }: { tone: Tone; icon?: string; className?: string }) {
  return (
    <span className={`grid shrink-0 place-items-center rounded-full border-2 ${toneBorder(tone)} ${toneText(tone)} ${className}`}>
      <Icon name={icon || (tone === "correto" ? "check" : "x")} className="size-[55%]" strokeWidth={2.6} />
      <span className="sr-only">{tone === "correto" ? "Faça assim" : "Evite"}</span>
    </span>
  );
}

function ColumnText({ col }: { col: TipColumn }) {
  if (!col.titulo && !col.texto) return null;
  return (
    <div className="flex shrink-0 items-start gap-3">
      <ToneBadge tone={col.tipo} icon={col.icone} />
      <div className="min-w-0 pt-0.5">
        {col.titulo && (
          <p className="text-[15px] leading-snug font-bold text-white lg:text-[clamp(0.9rem,2.3vh,1.1rem)]">
            <TipText text={col.titulo} tone={col.tipo} />
          </p>
        )}
        {col.texto && (
          <p className={`text-sm leading-snug lg:text-[clamp(0.8rem,2vh,0.95rem)] ${col.titulo ? "mt-0.5 text-white/80" : "font-semibold text-white"}`}>
            <TipText text={col.texto} tone={col.tipo} />
          </p>
        )}
      </div>
    </div>
  );
}

// Fotos lado a lado na mesma altura (linha de cima da grade) e o texto de cada uma logo abaixo
// (linha de baixo), com contorno verde (fazer) ou vermelho (não fazer).
const COL = ["sm:col-start-1", "sm:col-start-2"];
function PhotoColumn({ col, i }: { col: TipColumn; i: number }) {
  const foto = col.imagens[0];
  return (
    <>
      <div className={`flex min-h-0 justify-center sm:row-start-1 ${COL[i] ?? ""}`}>
        {foto?.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={foto.src}
            alt={foto.alt}
            className={`h-auto w-full rounded-xl border-2 object-contain lg:h-full lg:w-auto lg:max-w-full ${toneBorder(col.tipo)}`}
          />
        ) : (
          <div className="grid aspect-[3/2] w-full place-items-center rounded-xl border border-dashed border-amber-300/60 text-sm text-amber-200">foto pendente</div>
        )}
      </div>
      <div className={`flex justify-center sm:row-start-2 ${COL[i] ?? ""}`}>
        <ColumnText col={col} />
      </div>
    </>
  );
}

// Linha de sequência (ex.: os 5 dias da semana): selo ✓/✗, fotos com legenda e o texto ao lado.
function SequenceRow({ col }: { col: TipColumn }) {
  return (
    <div className={`flex min-h-0 flex-col items-center justify-center gap-3 rounded-xl border-2 p-2.5 sm:flex-row lg:flex-1 lg:gap-6 lg:px-4 ${col.tipo === "correto" ? "border-lime/70" : "border-alert/80"}`}>
      <ToneBadge tone={col.tipo} className="size-11 lg:size-12" />
      <div className="flex min-h-0 w-full min-w-0 justify-center gap-1.5 sm:gap-2.5 lg:h-full lg:w-auto">
        {col.imagens.map((img, i) => (
          <figure key={i} className="flex min-h-0 min-w-0 flex-1 flex-col items-center gap-1 lg:h-full lg:flex-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.src} alt={img.alt} className="h-auto w-full rounded-lg border border-white/15 object-cover lg:h-[calc(100%-1.4rem)] lg:w-auto" />
            {col.rotulos[i] && <figcaption className="text-xs font-bold tracking-wide text-white">{col.rotulos[i]}</figcaption>}
          </figure>
        ))}
      </div>
      <p className="shrink-0 text-center text-lg leading-snug font-bold text-white sm:w-56 sm:border-l sm:border-white/15 sm:pl-5 sm:text-left lg:text-[clamp(1rem,2.8vh,1.4rem)]">
        <TipText text={col.titulo} tone={col.tipo} />
      </p>
    </div>
  );
}

// Uma dica inteira: número + título, fotos com seus textos, texto geral (se houver) e a faixa de aviso.
function TipSlide({ item, n }: { item: TipItem; n: number }) {
  const sequencia = item.colunas.some((c) => c.imagens.length > 1);
  return (
    <article className="card flex w-full min-w-0 flex-col gap-[1.4vh] p-3 sm:p-4 lg:h-full lg:min-h-0">
      <header className="flex shrink-0 flex-wrap items-center gap-x-3 gap-y-1">
        <NumberBadge n={n} className="size-9 text-lg lg:size-10" />
        <h3 className="text-xl font-extrabold tracking-tight lg:text-[clamp(1.2rem,3.4vh,1.9rem)]">
          {item.tituloBranco} <span className="text-lime">{item.tituloVerde}</span>
        </h3>
        {item.subtitulo && <p className="w-full text-sm text-white/80 sm:ml-12 lg:text-[clamp(0.8rem,2vh,0.95rem)]">{item.subtitulo}</p>}
      </header>

      {sequencia ? (
        <div className="flex min-h-0 flex-col gap-[1.4vh] lg:flex-1">
          {item.colunas.map((col, i) => (
            <SequenceRow key={i} col={col} />
          ))}
        </div>
      ) : (
        <div className="grid min-h-0 gap-x-6 gap-y-[1.2vh] sm:grid-cols-2 lg:flex-1 lg:grid-rows-[minmax(0,1fr)_auto]">
          {item.colunas.map((col, i) => (
            <PhotoColumn key={i} col={col} i={i} />
          ))}
        </div>
      )}

      {item.textoGeral.texto && (
        <div className="flex shrink-0 items-center justify-center gap-3 text-center">
          {item.textoGeral.icone && <ToneBadge tone="correto" icon={item.textoGeral.icone} className="size-10" />}
          <p className="text-[15px] leading-snug lg:text-[clamp(0.9rem,2.4vh,1.15rem)]">
            <TipText text={item.textoGeral.texto} />
          </p>
        </div>
      )}

      {item.nota.texto && (
        <p className="flex shrink-0 items-center gap-3 border-t border-white/10 pt-[1.2vh] text-sm text-white/90 lg:text-[clamp(0.8rem,2vh,0.95rem)]">
          <Icon name={item.nota.tipo === "evitar" ? "xCircle" : "alertCircle"} className="size-7 shrink-0 text-alert" strokeWidth={2.2} />
          {item.nota.dica && <Icon name="lightbulb" className="size-6 shrink-0 text-white" />}
          <span>
            <TipText text={item.nota.texto} />
          </span>
        </p>
      )}
    </article>
  );
}

// Carrossel de dicas de gravação: uma dica por vez ocupando o espaço da página, com setas dos
// dois lados; as bolinhas mostram em qual dica a pessoa está. Sem reprodução automática.
export function TipsCarousel({ items: all, hint }: { items: TipItem[]; hint: string[] }) {
  const showPending = usePending();
  const items = all.filter((it) => it.colunas.some((c) => c.imagens.some((m) => m.src)) || showPending);
  const { index, goTo, prev, next, regionProps } = useCarousel(items.length);
  if (items.length === 0) return null;
  const many = items.length > 1;

  return (
    <div
      role="region"
      aria-roledescription="carrossel"
      aria-label="Dicas de gravação"
      className="flex flex-col gap-[1.4vh] outline-offset-8 lg:h-full lg:min-h-0"
      {...regionProps}
    >
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

      {/* Contador + bolinhas (a verde acesa anda até a dica atual) + setas no celular */}
      <div className="flex shrink-0 flex-wrap items-center justify-center gap-x-5 gap-y-2">
        <span className="rounded-lg border border-lime/60 bg-lime/10 px-3 py-0.5 text-sm font-semibold text-lime">
          Dica {index + 1} de {items.length}
        </span>
        <div className="flex items-center gap-4">
          <div className="sm:hidden">
            <CarouselArrow direction="prev" label="Dica anterior" onClick={prev} disabled={!many} />
          </div>
          <StepDots count={items.length} index={index} onSelect={goTo} itemLabel="a dica" />
          <div className="sm:hidden">
            <CarouselArrow direction="next" label="Próxima dica" onClick={next} disabled={!many} />
          </div>
        </div>
        {many && (
          <button type="button" onClick={next} className="hidden items-center gap-1.5 text-sm font-semibold text-white/85 hover:text-lime sm:inline-flex">
            {hint[0]} <span className="text-lime">{hint[1]}</span>
            <Icon name="arrowRight" className="size-4 text-lime" />
          </button>
        )}
      </div>
    </div>
  );
}
