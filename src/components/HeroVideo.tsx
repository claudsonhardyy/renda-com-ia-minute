"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { Media } from "@/content/site";
import { Icon } from "./Icon";

// Vídeos da tela do celular do Início: começam PARADOS, mostrando a capa, e só são baixados
// quando a pessoa aperta play (botão ao lado do título, botão da barra ou toque no próprio
// vídeo). Assim quem só quer ler não gasta os dados do celular com o vídeo. Depois do play,
// tocam um atrás do outro (1 → 2 → 1…) com som; há um botão para desligar o som.
type Ctx = { playing: boolean; toggle: () => void; video: React.RefObject<HTMLVideoElement | null>; setPlaying: (p: boolean) => void };
const HeroVideoCtx = createContext<Ctx | null>(null);

export function HeroVideoProvider({ children }: { children: React.ReactNode }) {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const toggle = useCallback(() => {
    const v = video.current;
    if (!v) return;
    if (v.paused) void v.play().catch(() => {});
    else v.pause();
  }, []);
  return <HeroVideoCtx.Provider value={{ playing, toggle, video, setPlaying }}>{children}</HeroVideoCtx.Provider>;
}

export function HeroPlaylist({ videos, fallback }: { videos: Media[]; fallback: Media }) {
  const ctx = useContext(HeroVideoCtx);
  const lista = videos.filter((v) => v.src);
  const [i, setI] = useState(0);
  // O play sempre vem de um clique da pessoa, então o vídeo pode começar com som.
  const [mudo, setMudo] = useState(false);
  const [tempo, setTempo] = useState(0);
  const [duracao, setDuracao] = useState(0);
  // true enquanto a pessoa arrasta a barra: o vídeo não "puxa" a barra de volta
  const arrastando = useRef(false);
  const atual = lista[i % Math.max(lista.length, 1)];
  // A capa só vale para o vídeo dela (ex.: hero-video-1.mp4 → hero-video-1-capa.jpg). Se um vídeo
  // novo for enviado pelo painel, a capa antiga não aparece sobre ele.
  const capa =
    atual?.poster && atual.poster.startsWith(atual.src.replace(/\.[a-z0-9]+$/i, "")) ? atual.poster : undefined;
  // iPhone/iPad (Safari) só toca MP4 se o servidor entregar o vídeo "em pedaços" (Range/206), e a
  // hospedagem gratuita da Cloudflare entrega o arquivo inteiro. Para os vídeos padrão do site há
  // uma versão HLS (public/media/hls/…: o mesmo vídeo, sem recompressão, dividido em partes), que o
  // Safari toca nativamente. Os outros navegadores continuam usando o MP4. Vídeos enviados pelo
  // painel não têm HLS e seguem só com o MP4.
  const hls = /^\/media\/(hero-video-[12])\.mp4$/.exec(atual?.src ?? "")?.[1];

  // Ao trocar de vídeo, continua tocando se estava tocando. Também lê a duração aqui, caso o
  // evento onLoadedMetadata tenha acontecido antes de a página ficar interativa (sem a
  // duração, a barra ficaria presa no primeiro segundo).
  useEffect(() => {
    const v = ctx?.video.current;
    if (v && v.readyState >= 1 && Number.isFinite(v.duration)) setDuracao(v.duration);
    if (v && ctx?.playing) void v.play().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i]);

  if (!ctx || lista.length === 0) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={fallback.src} alt={fallback.alt} className="block h-full w-full object-cover object-top" />;
  }

  return (
    <div className="relative h-full w-full bg-black">
      <video
        ref={ctx.video}
        key={atual.src}
        src={hls ? undefined : atual.src}
        aria-label={atual.alt}
        poster={capa}
        className="h-full w-full object-cover"
        muted={mudo}
        playsInline
        preload="none"
        onClick={ctx.toggle}
        onPlay={() => ctx.setPlaying(true)}
        onPause={() => ctx.setPlaying(false)}
        onEnded={() => setI((n) => (n + 1) % lista.length)}
        onLoadedMetadata={(e) => {
          setDuracao(e.currentTarget.duration || 0);
          setTempo(0);
        }}
        onDurationChange={(e) => {
          const d = e.currentTarget.duration;
          if (Number.isFinite(d)) setDuracao(d);
        }}
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          if (!duracao && Number.isFinite(v.duration)) setDuracao(v.duration);
          if (!arrastando.current) setTempo(v.currentTime);
        }}
      >
        {hls && <source src={`/media/hls/${hls}/index.m3u8`} type="application/vnd.apple.mpegurl" />}
        {hls && <source src={atual.src} type="video/mp4" />}
      </video>
      {/* Celular/tablet: barra mínima na base do vídeo — tocar/pausar, avançar/voltar arrastando e som */}
      <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-black/75 to-transparent px-2.5 pt-5 pb-2 lg:hidden">
        <button
          type="button"
          onClick={ctx.toggle}
          aria-label={ctx.playing ? "Pausar vídeo" : "Assistir ao vídeo"}
          className="grid size-7 shrink-0 place-items-center rounded-full text-white"
        >
          <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
            {ctx.playing ? <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" /> : <path d="M8 5.5v13l11-6.5z" />}
          </svg>
        </button>
        <input
          type="range"
          min={0}
          max={duracao || 1}
          step={0.1}
          value={Math.min(tempo, duracao || 1)}
          onPointerDown={() => {
            arrastando.current = true;
          }}
          onPointerUp={() => {
            arrastando.current = false;
          }}
          onPointerCancel={() => {
            arrastando.current = false;
          }}
          onChange={(e) => {
            const t = Number(e.target.value);
            const v = ctx.video.current;
            if (v) v.currentTime = t;
            setTempo(t);
          }}
          aria-label="Posição do vídeo"
          className="video-seek h-5 min-w-0 flex-1"
          style={{ ["--p" as string]: `${duracao ? (tempo / duracao) * 100 : 0}%` }}
        />
        <button
          type="button"
          onClick={() => setMudo((m) => !m)}
          aria-label={mudo ? "Ligar o som do vídeo" : "Desligar o som do vídeo"}
          className="grid size-7 shrink-0 place-items-center rounded-full text-white"
        >
          <Icon name={mudo ? "volumeOff" : "volume"} className="size-4" />
        </button>
      </div>
      <button
        type="button"
        onClick={() => setMudo((m) => !m)}
        aria-label={mudo ? "Ligar o som do vídeo" : "Desligar o som do vídeo"}
        className="absolute right-2.5 bottom-2.5 grid size-9 max-lg:hidden place-items-center rounded-full bg-black/65 text-lime ring-1 ring-lime/50 transition hover:bg-black/85"
      >
        <Icon name={mudo ? "volumeOff" : "volume"} className="size-5" />
      </button>
    </div>
  );
}

// Botão "Pausar vídeo / Assistir ao vídeo" ligado ao vídeo da tela do celular.
export function HeroVideoButton({ labels, className }: { labels: { pausar: string; assistir: string }; className: string }) {
  const ctx = useContext(HeroVideoCtx);
  const playing = ctx?.playing ?? false;
  return (
    <button type="button" onClick={() => ctx?.toggle()} className={className} aria-pressed={!playing}>
      <Icon name={playing ? "pauseCircle" : "playCircle"} className="size-7" />
      {playing ? labels.pausar : labels.assistir}
    </button>
  );
}
