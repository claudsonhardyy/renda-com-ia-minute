// Ícones de traço (estilo das referências), desenhados inline para não depender de pacote.
const paths: Record<string, React.ReactNode> = {
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  chevronLeft: <path d="M15 6l-6 6 6 6" />,
  chevronRight: <path d="M9 6l6 6-6 6" />,
  play: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <path d="M10 9l5 3-5 3z" />
    </>
  ),
  playCircle: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M10 8.5l5 3.5-5 3.5z" />
    </>
  ),
  pause: (
    <>
      <path d="M9 7v10M15 7v10" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" />
    </>
  ),
  phone: (
    <>
      <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
      <path d="M11 18h2" />
    </>
  ),
  video: (
    <>
      <rect x="3" y="6" width="13" height="12" rx="2" />
      <path d="M16 10l5-3v10l-5-3" />
    </>
  ),
  dollar: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15 9.2c-.6-1-1.7-1.5-3-1.5-1.7 0-3 .9-3 2.2 0 3 6 1.6 6 4.4 0 1.3-1.3 2.2-3 2.2-1.4 0-2.6-.6-3.1-1.6M12 6v1.7M12 16.5V18" />
    </>
  ),
  link: (
    <>
      <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
      <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
    </>
  ),
  file: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  download: <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />,
  alert: (
    <>
      <path d="M12 3.5L2.5 20h19z" />
      <path d="M12 10v4M12 17h.01" />
    </>
  ),
  alertCircle: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v6M12 16.5h.01" />
    </>
  ),
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  checkCircle: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l2.8 2.8L16.5 9.5" />
    </>
  ),
  x: <path d="M7 7l10 10M17 7L7 17" />,
  wallet: (
    <>
      <path d="M19 7V5.5A1.5 1.5 0 0 0 17.5 4H5a2 2 0 0 0 0 4h14a1 1 0 0 1 1 1v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6" />
      <path d="M16 13.5h.01" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4M8 14h.01M12 14h.01M16 14h.01M8 17.5h.01M12 17.5h.01" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l8 3v6c0 4.5-3.3 8-8 9-4.7-1-8-4.5-8-9V6z" />
      <path d="M8.5 12l2.5 2.5 4.5-5" />
    </>
  ),
  truck: (
    <>
      <path d="M2 6h12v10H2zM14 9h4l4 4v3h-8" />
      <circle cx="6" cy="17.5" r="2" />
      <circle cx="17" cy="17.5" r="2" />
    </>
  ),
  cart: (
    <>
      <path d="M3 4h2l2.4 11h10.8L21 8H6.2" />
      <circle cx="9" cy="19.5" r="1.5" />
      <circle cx="17" cy="19.5" r="1.5" />
    </>
  ),
  camera: (
    <>
      <path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
      <circle cx="12" cy="13.5" r="3.5" />
    </>
  ),
  home: <path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />,
  headset: (
    <>
      <circle cx="12" cy="10" r="5" />
      <path d="M4 10a8 8 0 0 1 16 0M7 20c1.3-1.5 3-2.3 5-2.3s3.7.8 5 2.3" />
    </>
  ),
  brain: (
    <>
      <path d="M9.5 4A3 3 0 0 0 6 6.5 3 3 0 0 0 3.5 10a3 3 0 0 0 1 4.5A3.5 3.5 0 0 0 9 19.5a2.5 2.5 0 0 0 3-.5V5a2.5 2.5 0 0 0-2.5-1z" />
      <path d="M14.5 4A3 3 0 0 1 18 6.5a3 3 0 0 1 2.5 3.5 3 3 0 0 1-1 4.5 3.5 3.5 0 0 1-4.5 5 2.5 2.5 0 0 1-3-.5" />
      <path d="M8 9.5h2M14 9.5h2M8 14h2M14 14h2" />
    </>
  ),
  bot: (
    <>
      <rect x="4" y="8" width="16" height="11" rx="3" />
      <path d="M12 4v4M9 13h.01M15 13h.01M9.5 16h5M2 12v3M22 12v3" />
      <circle cx="12" cy="3.5" r="1" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  apple: (
    <path
      fill="currentColor"
      stroke="none"
      d="M16.4 12.6c0-2.4 2-3.6 2.1-3.7-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.1 1-4 2.4-1.7 3-.4 7.3 1.2 9.7.8 1.2 1.8 2.5 3 2.4 1.2 0 1.7-.8 3.2-.8s1.9.8 3.2.8c1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8 0 0-2.6-1-2.6-3.8zM14 5.4c.7-.8 1.1-1.9 1-3-1 0-2.1.7-2.8 1.5-.6.7-1.2 1.8-1 2.9 1 .1 2.1-.6 2.8-1.4z"
    />
  ),
  android: (
    <path
      fill="currentColor"
      stroke="none"
      d="M6 9h12v8.5a1.5 1.5 0 0 1-1.5 1.5H15v2.5a1.25 1.25 0 0 1-2.5 0V19h-1v2.5a1.25 1.25 0 0 1-2.5 0V19H7.5A1.5 1.5 0 0 1 6 17.5zM3.75 9A1.25 1.25 0 0 1 5 10.25v5.5a1.25 1.25 0 0 1-2.5 0v-5.5A1.25 1.25 0 0 1 3.75 9zm16.5 0a1.25 1.25 0 0 1 1.25 1.25v5.5a1.25 1.25 0 0 1-2.5 0v-5.5A1.25 1.25 0 0 1 20.25 9zM15.5 3.2l1-1.6M8.5 3.2l-1-1.6M6 8a6 6 0 0 1 12 0zm3.5-2.2a.8.8 0 1 0 0 1.6.8.8 0 0 0 0-1.6zm5 0a.8.8 0 1 0 0 1.6.8.8 0 0 0 0-1.6z"
    />
  ),
  pix: (
    <path
      fill="currentColor"
      stroke="none"
      d="M12 2.5l3.6 3.6-3.6 3.6-3.6-3.6zM5.9 8.6l3.6 3.4-3.6 3.4L2.5 12zm12.2 0L21.5 12l-3.4 3.4-3.6-3.4zM12 14.3l3.6 3.6-3.6 3.6-3.6-3.6z"
    />
  ),
};

export function Icon({
  name,
  className = "size-6",
  strokeWidth = 1.8,
}: {
  name: keyof typeof paths | string;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
