"use client";

import { useRef } from "react";
import { Icon } from "./Icon";

function embedUrl(url: string): string | null {
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=1`;
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1`;
  return null;
}

// "Assistir ao tutorial": abre um modal com o vídeo de url_tutorial.
// Sem URL configurada, o botão aparece desabilitado (nunca leva a destino inventado).
export function TutorialButton({ url, label, className }: { url: string; label: string; className: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const embed = url ? embedUrl(url) : null;

  const content = (
    <>
      <Icon name="playCircle" className="size-7" />
      {label}
    </>
  );

  if (!url) {
    return (
      <button type="button" disabled title="Vídeo tutorial ainda não configurado" className={`${className} cursor-not-allowed opacity-60`}>
        {content}
        <span className="sr-only"> (vídeo ainda não configurado)</span>
      </button>
    );
  }

  return (
    <>
      <button type="button" className={className} onClick={() => dialog.current?.showModal()}>
        {content}
      </button>
      <dialog
        ref={dialog}
        aria-label={label}
        className="m-auto w-[min(92vw,960px)] rounded-2xl border border-line bg-bg p-0 text-white backdrop:bg-black/80"
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
      >
        <div className="flex justify-end p-2">
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            aria-label="Fechar tutorial"
            className="grid size-10 place-items-center rounded-full text-lime hover:bg-white/5"
          >
            <Icon name="x" className="size-5" />
          </button>
        </div>
        <div className="aspect-video w-full bg-black">
          {embed ? (
            <iframe src={embed} title={label} allow="autoplay; encrypted-media; fullscreen" allowFullScreen className="h-full w-full" />
          ) : (
            <video src={url} controls className="h-full w-full object-contain" />
          )}
        </div>
      </dialog>
    </>
  );
}
