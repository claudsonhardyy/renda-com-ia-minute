"use client";

import { useEffect, useRef, useState } from "react";

// Seta tracejada e sutil ligando dois elementos da página (por id). A posição é recalculada
// quando a janela muda de tamanho, então acompanha o layout em qualquer tela de computador.
export function Connector({ fromId, toId }: { fromId: string; toId: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [path, setPath] = useState<{ d: string; x: number; y: number } | null>(null);

  useEffect(() => {
    const update = () => {
      const svg = svgRef.current;
      const from = document.getElementById(fromId);
      const to = document.getElementById(toId);
      if (!svg || !from || !to || !svg.getBoundingClientRect().width) return setPath(null);
      const box = svg.getBoundingClientRect();
      const a = from.getBoundingClientRect();
      const b = to.getBoundingClientRect();
      const x1 = a.left - box.left - 4;
      const y1 = a.top + a.height / 2 - box.top;
      const x2 = b.right - box.left + 10;
      const y2 = b.top + b.height / 2 - box.top;
      const mx = (x1 + x2) / 2;
      setPath({ d: `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`, x: x1, y: y1 });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(document.body);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [fromId, toId]);

  return (
    <svg ref={svgRef} aria-hidden="true" className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible lg:block">
      <defs>
        <marker id={`seta-${toId}`} viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="#a6f774" />
        </marker>
      </defs>
      {path && (
        <>
          <circle cx={path.x} cy={path.y} r="4" fill="#a6f774" />
          <path
            d={path.d}
            fill="none"
            stroke="#a6f774"
            strokeWidth="2"
            strokeDasharray="6 6"
            strokeLinecap="round"
            markerEnd={`url(#seta-${toId})`}
            className="animate-[dash_1.6s_linear_infinite] opacity-90"
          />
        </>
      )}
    </svg>
  );
}
