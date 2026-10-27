"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "./Icon";

const ZOOM = 2.6; // aumento da lupa
const LENS = 180; // diâmetro da lupa, em px

// Tela do celular: a imagem ocupa a largura toda da tela (letras maiores) e, quando é mais
// comprida que a tela, rola dentro do celular como num aparelho de verdade (roda do mouse ou
// dedo). Ao passar o mouse, uma lupa mostra o trecho ampliado em alta resolução para leitura.
export function PhoneScreen({ src, alt }: { src: string; alt: string }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [more, setMore] = useState(false); // ainda há conteúdo abaixo
  const [lens, setLens] = useState<{ x: number; y: number; bg: string; pos: string } | null>(null);

  const update = () => {
    const el = scroller.current;
    if (el) setMore(el.scrollTop + el.clientHeight < el.scrollHeight - 4);
  };

  // Ao trocar de passo, a tela volta para o topo
  useEffect(() => {
    if (scroller.current) scroller.current.scrollTop = 0;
  }, [src]);

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
    <div className="relative min-h-0 flex-1">
      <div
        ref={scroller}
        onScroll={update}
        className="h-full overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={src}
          src={src}
          alt={alt}
          onLoad={update}
          onMouseMove={onMove}
          onMouseLeave={() => setLens(null)}
          className="block h-auto w-full animate-[fade_250ms_ease-out] cursor-zoom-in"
        />
      </div>

      {more && (
        <span className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-black/85 to-transparent pt-8 pb-2">
          <span className="flex items-center gap-1 rounded-full bg-lime px-2.5 py-1 text-[11px] font-bold text-lime-ink shadow-lg">
            Role a tela
            <Icon name="chevronRight" className="size-3.5 rotate-90" strokeWidth={3} />
          </span>
        </span>
      )}

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
