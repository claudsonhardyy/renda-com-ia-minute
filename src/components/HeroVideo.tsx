"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { Media } from "@/content/site";
import { Icon } from "./Icon";

// Vídeos da tela do celular do Início: tocam sozinhos ao abrir a página (sem som, como os
// navegadores exigem), um atrás do outro (1 → 2 → 1…). O botão ao lado do título pausa e
// retoma o mesmo vídeo; na tela há um botãozinho para ligar o som.
type Ctx = { playing: boolean; toggle: () => void; video: React.RefObject<HTMLVideoElement | null>; setPlaying: (p: boolean) => void };
const HeroVideoCtx = createContext<Ctx | null>(null);

export function HeroVideoProvider({ children }: { children: React.ReactNode }) {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
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
  const [mudo, setMudo] = useState(true);
  const [tempo, setTempo] = useState(0);
  const [duracao, setDuracao] = useState(0);
  const atual = lista[i % Math.max(lista.length, 1)];

  // Ao trocar de vídeo, continua tocando se estava tocando
  useEffect(() => {
    const v = ctx?.video.current;
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
        src={atual.src}
        aria-label={atual.alt}
        className="h-full w-full object-cover"
        autoPlay
        muted={mudo}
        playsInline
        preload="auto"
        onPlay={() => ctx.setPlaying(true)}
        onPause={() => ctx.setPlaying(false)}
        onEnded={() => setI((n) => (n + 1) % lista.length)}
        onLoadedMetadata={(e) => {
          setDuracao(e.currentTarget.duration || 0);
          setTempo(0);
        }}
        onTimeUpdate={(e) => setTempo(e.currentTarget.currentTime)}
      />
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
          onChange={(e) => {
            const v = ctx.video.current;
            if (v) v.currentTime = Number(e.target.value);
            setTempo(Number(e.target.value));
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
