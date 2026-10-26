"use client";

const DOT = 12; // px
const GAP = 10; // px

// Indicador de passo dos carrosséis: uma bolinha para cada item e uma bolinha verde acesa
// que "anda" até a posição do item atual a cada troca.
export function StepDots({
  count,
  index,
  onSelect,
  itemLabel,
}: {
  count: number;
  index: number;
  onSelect: (i: number) => void;
  itemLabel: string;
}) {
  return (
    <div className="relative flex" style={{ gap: GAP }}>
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onSelect(i)}
          aria-label={`Ir para ${itemLabel} ${i + 1}`}
          aria-current={i === index ? "true" : undefined}
          className="rounded-full border-2 border-lime/60 transition hover:bg-lime/30"
          style={{ width: DOT, height: DOT }}
        />
      ))}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 rounded-full bg-lime shadow-[0_0_10px_rgb(166_247_116/0.9)] transition-transform duration-500 ease-out"
        style={{ width: DOT, height: DOT, transform: `translateX(${index * (DOT + GAP)}px)` }}
      />
    </div>
  );
}
