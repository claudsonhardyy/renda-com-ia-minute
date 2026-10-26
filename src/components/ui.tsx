import { Icon } from "./Icon";

// Uma "página" do guia: ocupa a tela inteira (descontada a barra superior) e centraliza o conteúdo.
export function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative flex min-h-dvh w-full snap-start items-center border-t border-white/[0.06] pt-16 first:border-t-0 ${className}`}
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-10 lg:py-[2.5vh]">{children}</div>
    </section>
  );
}

export function Tag({ icon, children }: { icon?: string; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-lime/50 bg-lime/10 px-3 py-1 text-sm font-semibold text-lime">
      {icon && <Icon name={icon} className="size-4" />}
      {children}
    </span>
  );
}

export function Heading({
  white,
  green,
  inline = false,
  as: As = "h2",
}: {
  white: string;
  green: string;
  inline?: boolean;
  as?: "h1" | "h2";
}) {
  return (
    <As className="page-title mt-4">
      {white}
      {inline ? " " : <br />}
      <span className="text-lime">{green}</span>
    </As>
  );
}

// Link externo configurável. Se o destino estiver vazio, o botão continua visível e com a
// mesma aparência (a pedido do cliente), mas sem clique e com aviso acessível — nunca aponta para "#".
export function ExternalLink({
  href,
  className,
  children,
  pendingLabel = "Link ainda não configurado",
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  pendingLabel?: string;
}) {
  if (!href) {
    return (
      <span
        role="link"
        aria-disabled="true"
        title={pendingLabel}
        className={`${className} cursor-default`}
      >
        {children}
        <span className="sr-only"> ({pendingLabel})</span>
      </span>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

// Moldura de celular dimensionada pela ALTURA (className com h-…), para caber na página.
// A tela interna é uma mídia editável (imagem ou vídeo).
export function PhoneFrame({
  children,
  ratio,
  className = "",
}: {
  children: React.ReactNode;
  ratio: string; // proporção da tela interna, ex.: "202/456"
  className?: string;
}) {
  return (
    <div
      className={`relative shrink-0 rounded-[2.4rem] border border-white/15 bg-gradient-to-b from-zinc-700 to-zinc-900 p-[6px] shadow-[0_0_70px_-15px_rgb(166_247_116/0.45)] ${className}`}
      style={{ aspectRatio: ratio.replace("/", " / ") }}
    >
      <div className="relative h-full overflow-hidden rounded-[2rem] bg-black">
        <div className="absolute top-2 left-1/2 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-black" />
        {children}
      </div>
    </div>
  );
}

export function NumberBadge({ n, className = "size-12 text-xl" }: { n: number; className?: string }) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full bg-lime font-extrabold text-lime-ink ${className}`}
    >
      {n}
    </span>
  );
}

// Seta de carrossel em destaque: círculo verde sólido com brilho. Com uma imagem só,
// fica visível mas desativada (aparência apagada), sem fingir que funciona.
export function CarouselArrow({
  direction,
  label,
  onClick,
  disabled = false,
  className = "",
}: {
  direction: "prev" | "next";
  label: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`group relative grid size-12 shrink-0 place-items-center rounded-full bg-lime text-lime-ink shadow-[0_0_22px_rgb(166_247_116/0.65)] ring-4 ring-lime/20 transition enabled:hover:scale-110 enabled:hover:shadow-[0_0_34px_rgb(166_247_116/0.9)] enabled:active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none ${className}`}
    >
      {/* anel pulsando para chamar atenção (só quando há para onde passar) */}
      <span className="absolute inset-0 rounded-full ring-2 ring-lime/70 group-enabled:animate-[ping_2.2s_cubic-bezier(0,0,0.2,1)_infinite] group-disabled:hidden" />
      <Icon name={direction === "prev" ? "chevronLeft" : "chevronRight"} className="relative size-6" strokeWidth={3} />
    </button>
  );
}
