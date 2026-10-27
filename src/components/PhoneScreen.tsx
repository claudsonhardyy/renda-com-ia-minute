"use client";

import { useState } from "react";
import { createPortal } from "react-dom";

const ZOOM = 2.6; // aumento da lupa
const LENS = 180; // diâmetro da lupa, em px

// Tela do celular: a imagem aparece inteira (sem cortes nem distorção), centralizada na tela.
// Ao passar o mouse, uma lupa mostra o trecho ampliado em alta resolução para leitura.
export function PhoneScreen({ src, alt }: { src: string; alt: string }) {
  const [lens, setLens] = useState<{ x: number; y: number; bg: string; pos: string } | null>(null);

  function onMove(e: React.MouseEvent<HTMLImageElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const fx = (e.clientX - r.left) / r.width;
    const fy = (e.clientY - r.top) / r.height;
    const w = r.width * ZOOM;
    const h = r.height * ZOOM;
    setLens({
      x: e.clientX,
      y: e.clientY,
      bg: `${w}px ${h}px`,
      pos: `${-(fx * w - LENS / 2)}px ${-(fy * h - LENS / 2)}px`,
    });
  }

  return (
    <div className="relative flex min-h-0 flex-1 items-center justify-center bg-black">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={src}
        src={src}
        alt={alt}
        onMouseMove={onMove}
        onMouseLeave={() => setLens(null)}
        className="block h-auto max-h-full w-auto max-w-full animate-[fade_250ms_ease-out] cursor-zoom-in"
      />

      {lens &&
        createPortal(
          <span
            aria-hidden="true"
            className="pointer-events-none fixed z-[100] rounded-full border-[3px] border-lime bg-black bg-no-repeat shadow-[0_10px_40px_rgb(0_0_0/0.6)]"
            style={{
              width: LENS,
              height: LENS,
              left: lens.x - LENS / 2,
              top: lens.y - LENS / 2,
              backgroundImage: `url("${src}")`,
              backgroundSize: lens.bg,
              backgroundPosition: lens.pos,
            }}
          />,
          document.body,
        )}
    </div>
  );
}
