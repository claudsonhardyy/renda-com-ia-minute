// Leitura/escrita imutável por caminho com pontos ("hero.foto.src", "dicas.itens.2").

export function getAt(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((cur, key) => (cur == null ? undefined : (cur as Record<string, unknown>)[key]), obj);
}

export function setAt<T>(obj: T, path: string, value: unknown): T {
  const [head, ...rest] = path.split(".");
  const container = (obj ?? {}) as Record<string, unknown> | unknown[];
  const next = rest.length ? setAt((container as Record<string, unknown>)[head], rest.join("."), value) : value;
  if (Array.isArray(container)) {
    const copy = [...container];
    copy[Number(head)] = next;
    return copy as T;
  }
  return { ...container, [head]: next } as T;
}

// path vazio = o próprio item da lista (ex.: lista de fotos, em que cada item já é a mídia)
export const join = (base: string, path: string) => (base && path ? `${base}.${path}` : base || path);
