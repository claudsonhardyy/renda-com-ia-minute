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
      />
      <button
        type="button"
        onClick={() => setMudo((m) => !m)}
        aria-label={mudo ? "Ligar o som do vídeo" : "Desligar o som do vídeo"}
        className="absolute right-2.5 bottom-2.5 grid size-9 place-items-center rounded-full bg-black/65 text-lime ring-1 ring-lime/50 transition hover:bg-black/85"
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
