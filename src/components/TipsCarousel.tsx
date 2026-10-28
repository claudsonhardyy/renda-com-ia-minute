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

// Imagem com a versão de celular (srcMobile), quando houver, em telas menores que 1024 px.
function Pic({ m, className }: { m: { src: string; alt: string; srcMobile?: string }; className: string }) {
  return (
    <picture className="contents">
      {m.srcMobile && <source media="(max-width: 1023px)" srcSet={m.srcMobile} />}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={m.src} alt={m.alt} className={className} />
    </picture>
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
        <Pic
          m={foto}
          className={
            natural
              ? "block h-auto w-full sm:h-full sm:w-auto sm:max-w-full sm:object-cover"
              : `block h-auto w-full lg:h-full lg:object-cover ${col.foco === "left" ? "object-left" : col.foco === "right" ? "object-right" : ""}`
          }
        />
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
      {/* No celular (uma coluna) a ordem é foto 1 → texto 1 → foto 2 → texto 2; a partir de 640 px,
          fotos lado a lado em cima e os textos embaixo de cada uma */}
      {a && <Photo col={a} className="max-sm:order-1 sm:row-start-1" />}
      {b && <Photo col={b} className="max-sm:order-3 max-sm:mt-2 sm:row-start-1" />}
      {temTexto ? (
        <>
          {a && <div className="max-sm:order-2 sm:row-start-2"><ColumnText col={a} /></div>}
          {b && <div className="max-sm:order-4 sm:row-start-2 sm:border-l sm:border-white/15 sm:pl-6"><ColumnText col={b} /></div>}
        </>
      ) : (
        item.textoGeral.texto && (
          <div className="flex items-center justify-center gap-3 max-sm:order-5 sm:col-span-2 sm:row-start-2">
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
                <Pic
                  m={img}
                  className={`aspect-[4/5] w-full rounded-lg border object-cover sm:aspect-auto sm:min-h-0 sm:flex-1 ${col.tipo === "correto" ? "border-lime/60" : "border-alert/70"}`}
                />
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
      <header className="flex shrink-0 flex-wrap items-center gap-x-4 gap-y-2">
        {/* número + título sempre na mesma linha (no celular o título quebra ao lado do número) */}
        <div className="flex min-w-0 items-center gap-3 lg:gap-4">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-lime text-xl font-extrabold text-lime-ink">{n}</span>
          <div className="min-w-0">
            <h3 className="text-xl leading-tight font-extrabold tracking-tight lg:text-[clamp(1.25rem,3.6vh,1.85rem)]">
              {item.tituloBranco} <span className="text-lime">{item.tituloVerde}</span>
            </h3>
            {item.subtitulo && <p className={`${TEXTO} text-white/80`}>{item.subtitulo}</p>}
          </div>
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

// Computador: carrossel de dicas de gravação, uma dica por vez, todas no mesmo quadro, com setas dos dois
// lados e só as bolinhas embaixo (a verde acesa anda até a dica atual). Sem reprodução automática.
function DesktopTips({ items: all }: { items: TipItem[] }) {
  const showPending = usePending();
  const items = all.filter((it) => it.colunas.some((c) => c.imagens.some((m) => m.src)) || showPending);
  const { index, goTo, prev, next, regionProps } = useCarousel(items.length);
  if (items.length === 0) return null;
  const many = items.length > 1;

  return (
    <div role="region" aria-roledescription="carrossel" aria-label="Dicas de gravação" className="flex flex-col gap-[1.2vh] outline-offset-8 max-lg:hidden lg:h-full lg:min-h-0" {...regionProps}>
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

// Celular: cada foto da dica vira uma tela própria (foto inteira, sem cortes, com o texto dela
// logo abaixo), na mesma sequência das dicas; a sequência da semana (dica 7) fica numa tela só.
// As bolinhas continuam uma por dica.
type Parte = { tip: number; col: number; total: number };

function MobileSlide({ item, n, parte }: { item: TipItem; n: number; parte: Parte }) {
  const col = parte.col >= 0 ? item.colunas[parte.col] : null;
  const foto = col?.imagens[0];
  const selo = col?.selo !== false;
  return (
    <article className="card flex w-full min-w-0 flex-col gap-[1.6svh] p-3">
      <header className="flex shrink-0 items-center gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-lime text-lg font-extrabold text-lime-ink">{n}</span>
        <div className="min-w-0 flex-1">
          <h3 className="text-[clamp(1rem,2.5svh,1.2rem)] leading-tight font-extrabold tracking-tight">
            {item.tituloBranco} <span className="text-lime">{item.tituloVerde}</span>
          </h3>
          {item.subtitulo && <p className="text-xs leading-snug text-white/75">{item.subtitulo}</p>}
        </div>
        {parte.total > 1 && (
          <span className="shrink-0 rounded-full border border-white/20 px-2 py-0.5 text-[0.7rem] font-semibold text-white/75">
            {parte.col + 1}/{parte.total}
          </span>
        )}
      </header>
      {item.lateral && <p className="-mt-1 text-xs leading-snug text-white/75">{item.lateral}</p>}

      {col ? (
        <>
          <div className={`relative mx-auto w-full max-w-[calc(29svh*1.6)] overflow-hidden rounded-xl border-2 ${toneBorder(col.tipo)}`}>
            {foto?.src ? (
              <Pic m={foto} className="block h-auto w-full" />
            ) : (
              <div className="grid min-h-40 place-items-center text-sm text-amber-200">foto pendente</div>
            )}
            {selo && (
              <span className={`absolute top-2 left-2 grid size-8 place-items-center rounded-full border-2 bg-black/60 ${toneBorder(col.tipo)} ${toneText(col.tipo)}`}>
                <Icon name={col.tipo === "correto" ? "check" : "x"} className="size-4" strokeWidth={3} />
                <span className="sr-only">{col.tipo === "correto" ? "Faça assim" : "Evite"}</span>
              </span>
            )}
          </div>
          {col.titulo || col.texto ? (
            <ColumnText col={col} />
          ) : (
            item.textoGeral.texto && (
              <div className="flex items-center gap-3">
                {item.textoGeral.icone && <TextIcon tone="correto" icon={item.textoGeral.icone} />}
                <p className={`${TITULO} font-semibold`}>
                  <TipText text={item.textoGeral.texto} />
                </p>
              </div>
            )
          )}
        </>
      ) : (
        <SemanaMobile item={item} />
      )}

      {item.nota.texto && (
        <p className={`flex shrink-0 items-center gap-2.5 border-t border-lime/40 pt-[1.4svh] ${TEXTO} text-white/90`}>
          <Icon name={item.nota.tipo === "evitar" ? "xCircle" : "alertCircle"} className="size-6 shrink-0 text-alert" strokeWidth={2.2} />
          <span>
            <TipText text={item.nota.texto} />
          </span>
        </p>
      )}
    </article>
  );
}

// Dica da semana no celular: em cada faixa, ícone + frase numa linha e os 5 dias logo abaixo.
function SemanaMobile({ item }: { item: TipItem }) {
  return (
    <div className="flex flex-col gap-[1.4svh]">
      {item.colunas.map((col, i) => (
        <div key={i} className={`rounded-xl border-2 p-2 ${col.tipo === "correto" ? "border-lime/70" : "border-alert/80"}`}>
          <div className="flex items-center gap-2.5">
            <span className={`grid size-8 shrink-0 place-items-center rounded-full border-2 ${toneBorder(col.tipo)} ${toneText(col.tipo)}`}>
              <Icon name={col.tipo === "correto" ? "check" : "x"} className="size-4" strokeWidth={2.6} />
            </span>
            <p className={`${TEXTO} font-bold text-white`}>
              <TipText text={col.titulo} tone={col.tipo} />
            </p>
          </div>
          <div className="mt-2 grid grid-cols-5 gap-1.5">
            {col.imagens.map((img, k) => (
              <figure key={k} className="flex flex-col items-center gap-0.5">
                <Pic m={img} className={`aspect-[4/5] w-full rounded-md border object-cover ${col.tipo === "correto" ? "border-lime/60" : "border-alert/70"}`} />
                {col.rotulos[k] && <figcaption className="text-[0.65rem] font-bold tracking-wide text-white">{col.rotulos[k]}</figcaption>}
              </figure>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function MobileTips({ items: all }: { items: TipItem[] }) {
  const showPending = usePending();
  const items = all.filter((it) => it.colunas.some((c) => c.imagens.some((m) => m.src)) || showPending);
  const partes: Parte[] = items.flatMap((it, tip) =>
    it.layout === "semana" ? [{ tip, col: -1, total: 1 }] : it.colunas.map((_, col) => ({ tip, col, total: it.colunas.length })),
  );
  const { index, goTo, prev, next, regionProps } = useCarousel(partes.length);
  if (partes.length === 0) return null;
  const parte = partes[index];
  const many = partes.length > 1;

  return (
    <div role="region" aria-roledescription="carrossel" aria-label="Dicas de gravação" className="flex flex-col gap-[1.6svh] outline-offset-8 lg:hidden" {...regionProps}>
      <div key={index} className="flex min-w-0 animate-[slide_350ms_ease-out]" aria-live="polite">
        <MobileSlide item={items[parte.tip]} n={parte.tip + 1} parte={parte} />
      </div>
      <div className="flex shrink-0 items-center justify-center gap-4">
        <CarouselArrow direction="prev" label="Anterior" onClick={prev} disabled={!many} />
        <StepDots count={items.length} index={parte.tip} onSelect={(t) => goTo(partes.findIndex((p) => p.tip === t))} itemLabel="a dica" />
        <CarouselArrow direction="next" label="Próxima" onClick={next} disabled={!many} />
      </div>
    </div>
  );
}

export function TipsCarousel({ items }: { items: TipItem[] }) {
  return (
    <>
      <DesktopTips items={items} />
      <MobileTips items={items} />
    </>
  );
}
