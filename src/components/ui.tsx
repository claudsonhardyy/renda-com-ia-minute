import { Icon } from "./Icon";

// Em desenvolvimento mostramos o que ainda falta configurar; em produção, nunca.
export const showPending = process.env.NODE_ENV !== "production";

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
      className={`relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 md:py-28 lg:px-8 ${className}`}
    >
      {children}
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
    <As className="mt-5 text-[2.6rem] leading-[1.05] font-extrabold tracking-tight text-balance sm:text-6xl">
      {white}
      {inline ? " " : <br />}
      <span className="text-lime">{green}</span>
    </As>
  );
}

// Link externo configurável. Se o destino estiver vazio, o botão continua visível
// (como no desenho), mas desabilitado e com aviso acessível — nunca aponta para "#".
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
        className={`${className} cursor-not-allowed opacity-60`}
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

export function PendingNote({ children }: { children: React.ReactNode }) {
  if (!showPending) return null;
  return (
    <p className="mt-2 rounded-md border border-dashed border-amber-300/60 bg-amber-300/10 px-2 py-1 text-xs text-amber-200">
      Pendente: {children}
    </p>
  );
}

// Moldura de celular; a tela interna é uma mídia editável (imagem ou vídeo).
export function PhoneFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-[2.6rem] border border-white/15 bg-gradient-to-b from-zinc-700 to-zinc-900 p-[7px] shadow-[0_0_70px_-15px_rgb(182_241_126/0.45)] ${className}`}
    >
      <div className="relative overflow-hidden rounded-[2.2rem] bg-black">
        <div className="absolute top-2 left-1/2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
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
