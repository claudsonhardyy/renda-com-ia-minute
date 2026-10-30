"use client";

import { useId, useState } from "react";
import { Icon } from "@/components/Icon";
import type { Media } from "@/content/site";
import { MEDIA_BUCKET } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/client";
import { autorizarEnvioMidia } from "./actions";
import { getAt, join } from "./paths";
import type { Field } from "./schema";

export const isHttpUrl = (v: string) => /^https?:\/\/[^\s]+\.[^\s]+$/i.test(v.trim());
const isVideoSrc = (src: string) => /\.(mp4|webm|mov)(\?|$)/i.test(src);

type Props = {
  field: Field;
  base: string; // caminho do item da lista (vazio no nível de cima)
  content: unknown;
  defaults: unknown;
  onChange: (path: string, value: unknown) => void;
};

export function FieldEditor({ field, base, content, defaults, onChange }: Props) {
  const path = join(base, field.path);
  const value = getAt(content, path);
  const id = useId();

  switch (field.kind) {
    case "text":
    case "textarea":
      return (
        <label htmlFor={id} className="block">
          <span className="text-sm font-semibold">{field.label}</span>
          {field.kind === "text" ? (
            <input id={id} className="admin-input mt-1.5" value={String(value ?? "")} onChange={(e) => onChange(path, e.target.value)} />
          ) : (
            <textarea id={id} rows={3} className="admin-input mt-1.5" value={String(value ?? "")} onChange={(e) => onChange(path, e.target.value)} />
          )}
          {field.hint && <span className="mt-1 block text-xs text-white/50">{field.hint}</span>}
        </label>
      );

    case "url": {
      const v = String(value ?? "");
      const invalid = v !== "" && !isHttpUrl(v);
      return (
        <div>
          <label htmlFor={id} className="flex flex-wrap items-center gap-2 text-sm font-semibold">
            {field.label}
            {!v && <span className="rounded bg-amber-300/15 px-1.5 py-0.5 text-xs font-medium text-amber-200">pendente</span>}
            {v && !invalid && <span className="rounded bg-lime/15 px-1.5 py-0.5 text-xs font-medium text-lime">ok</span>}
          </label>
          <input
            id={id}
            type="url"
            inputMode="url"
            placeholder="https://"
            className="admin-input mt-1.5"
            value={v}
            aria-invalid={invalid}
            aria-describedby={invalid ? `${id}-erro` : undefined}
            onChange={(e) => onChange(path, e.target.value.trim())}
          />
          {invalid && (
            <span id={`${id}-erro`} className="mt-1 block text-xs text-red-300">
              O link precisa começar com https:// ou http://
            </span>
          )}
          {field.hint && <span className="mt-1 block font-mono text-[11px] text-white/40">{field.hint}</span>}
        </div>
      );
    }

    case "lines":
      return (
        <label htmlFor={id} className="block">
          <span className="text-sm font-semibold">{field.label}</span>
          <textarea
            id={id}
            rows={Math.min(14, Math.max(4, ((value as string[]) ?? []).length + 1))}
            className="admin-input mt-1.5 font-mono text-sm"
            value={((value as string[]) ?? []).join("\n")}
            onChange={(e) => onChange(path, e.target.value.split("\n"))}
            onBlur={(e) => onChange(path, e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))}
          />
          {field.hint && <span className="mt-1 block text-xs text-white/50">{field.hint}</span>}
        </label>
      );

    case "select":
      return (
        <label htmlFor={id} className="block">
          <span className="text-sm font-semibold">{field.label}</span>
          <select
            id={id}
            className="admin-input mt-1.5"
            value={String(value ?? "")}
            onChange={(e) => onChange(path, e.target.value || null)}
          >
            {field.options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      );

    case "media":
      return (
        <MediaEditor
          label={field.label}
          video={field.video}
          media={(value as Media) ?? { src: "", alt: "" }}
          original={base ? undefined : (getAt(defaults, path) as Media | undefined)}
          onChange={(m) => onChange(path, m)}
        />
      );

    case "list":
      return <ListEditor field={field} path={path} content={content} defaults={defaults} onChange={onChange} />;
  }
}

function MediaEditor({
  label,
  video,
  media,
  original,
  onChange,
}: {
  label: string;
  video?: boolean;
  media: Media;
  original?: Media;
  onChange: (m: Media) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [erro, setErro] = useState("");
  const id = useId();
  const isVideo = media.type === "video" || isVideoSrc(media.src);

  async function upload(file: File) {
    setErro("");
    setUploading(true);
    try {
      // O servidor confere a permissão e devolve uma autorização de uso único para este arquivo.
      const auth = await autorizarEnvioMidia({ nome: file.name, tipo: file.type, tamanho: file.size });
      if (!auth.ok) throw new Error(auth.message);
      const supabase = createClient();
      const { error } = await supabase.storage.from(MEDIA_BUCKET).uploadToSignedUrl(auth.path, auth.token, file, { contentType: file.type });
      if (error) throw error;
      const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(auth.path);
      onChange({ ...media, src: data.publicUrl, type: file.type.startsWith("video/") ? "video" : "image" });
    } catch (e) {
      setErro(`Falha no envio: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setUploading(false);
    }
  }

  return (
    <fieldset className="rounded-xl border border-white/10 p-4">
      <legend className="px-1 text-sm font-semibold">{label}</legend>
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="grid h-36 w-full shrink-0 place-items-center overflow-hidden rounded-lg bg-black/40 sm:w-48">
          {!media.src ? (
            <span className="text-xs text-amber-200">sem mídia</span>
          ) : isVideo ? (
            <video src={media.src} className="h-full w-full object-contain" muted controls />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={media.src} alt="" className="h-full w-full object-contain" />
          )}
        </div>
        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex flex-wrap gap-2">
            <label className={`admin-btn cursor-pointer text-sm ${uploading ? "opacity-50" : ""}`}>
              {uploading ? "Enviando…" : media.src ? "Substituir arquivo" : "Enviar arquivo"}
              <input
                type="file"
                className="sr-only"
                accept={video ? "image/*,video/mp4,video/webm" : "image/*"}
                disabled={uploading}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) void upload(f);
                  e.target.value = "";
                }}
              />
            </label>
            {original && original.src !== media.src && (
              <button type="button" className="admin-btn text-sm" onClick={() => onChange({ ...original })}>
                Restaurar original
              </button>
            )}
          </div>
          <label htmlFor={id} className="block">
            <span className="text-xs text-white/70">Texto alternativo (descrição para leitores de tela)</span>
            <input id={id} className="admin-input mt-1 text-sm" value={media.alt} onChange={(e) => onChange({ ...media, alt: e.target.value })} />
          </label>
          {erro && <p className="text-xs text-red-300">{erro}</p>}
        </div>
      </div>
    </fieldset>
  );
}

function ListEditor({
  field,
  path,
  content,
  defaults,
  onChange,
}: {
  field: Extract<Field, { kind: "list" }>;
  path: string;
  content: unknown;
  defaults: unknown;
  onChange: (path: string, value: unknown) => void;
}) {
  const items = (getAt(content, path) as unknown[]) ?? [];
  const move = (from: number, to: number) => {
    const copy = [...items];
    const [it] = copy.splice(from, 1);
    copy.splice(to, 0, it);
    onChange(path, copy);
  };

  return (
    <fieldset className="space-y-4">
      <legend className="text-base font-bold">{field.label}</legend>
      {items.map((_, i) => (
        <div key={i} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <div className="mb-3 flex items-center justify-between gap-2">
            <p className="text-sm font-bold text-lime">
              {field.itemLabel} {i + 1}
            </p>
            {!field.fixed && (
              <div className="flex gap-1">
                <button type="button" className="admin-btn px-2 py-1 text-xs" disabled={i === 0} onClick={() => move(i, i - 1)} aria-label={`Mover ${field.itemLabel} ${i + 1} para cima`}>
                  ↑
                </button>
                <button type="button" className="admin-btn px-2 py-1 text-xs" disabled={i === items.length - 1} onClick={() => move(i, i + 1)} aria-label={`Mover ${field.itemLabel} ${i + 1} para baixo`}>
                  ↓
                </button>
                <button
                  type="button"
                  className="admin-btn px-2 py-1 text-xs text-red-300"
                  onClick={() => confirm(`Remover ${field.itemLabel.toLowerCase()} ${i + 1}?`) && onChange(path, items.filter((__, j) => j !== i))}
                >
                  Remover
                </button>
              </div>
            )}
          </div>
          <div className="space-y-4">
            {field.fields.map((f) => (
              <FieldEditor key={f.path} field={f} base={`${path}.${i}`} content={content} defaults={defaults} onChange={onChange} />
            ))}
          </div>
        </div>
      ))}
      {!field.fixed && (
        <button type="button" className="admin-btn inline-flex items-center gap-2 text-sm" onClick={() => onChange(path, [...items, structuredClone(field.newItem)])}>
          <Icon name="x" className="size-4 rotate-45" /> Adicionar {field.itemLabel.toLowerCase()}
        </button>
      )}
    </fieldset>
  );
}
