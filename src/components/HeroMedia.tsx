"use client";

import { useRef, useState } from "react";
import type { Media } from "@/content/site";
import { Icon } from "./Icon";

// Mídia dentro da tela do celular do hero: imagem ou vídeo tutorial (hero_video_or_image).
// O vídeo cabe na tela (object-contain), toca sem som e tem play/pause acessível.
export function HeroMedia({ media }: { media: Media }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  if (media.type !== "video") {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={media.src} alt={media.alt} className="block h-full w-full object-cover object-top" />;
  }

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="relative h-full w-full">
      <video
        ref={ref}
        src={media.src}
        aria-label={media.alt}
        className="h-full w-full bg-black object-contain"
        autoPlay
        muted
        loop
        playsInline
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pausar vídeo" : "Reproduzir vídeo"}
        className="absolute right-3 bottom-3 grid size-10 place-items-center rounded-full bg-black/70 text-lime ring-1 ring-lime/50"
      >
        <Icon name={playing ? "pause" : "playCircle"} className="size-5" />
      </button>
    </div>
  );
}
