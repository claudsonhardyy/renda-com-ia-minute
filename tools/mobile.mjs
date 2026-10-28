// Captura cada seção inteira num celular (emulação mobile, escala 2).

// uso: node mobile.mjs <url> <pastaSaida> <LxA>
import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";

const [url, outDir, ...sizes] = process.argv.slice(2);
const chrome = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const port = 9333 + Math.floor(Math.random() * 500);
const proc = spawn(chrome, ["--headless=new", "--disable-gpu", "--hide-scrollbars", `--remote-debugging-port=${port}`, `--user-data-dir=${process.env.TEMP}/cdp-${port}`, "about:blank"]);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let wsUrl;
for (let i = 0; i < 50 && !wsUrl; i++) {
  await sleep(200);
  try {
    wsUrl = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === "page")?.webSocketDebuggerUrl;
  } catch {}
}
const ws = new WebSocket(wsUrl);
await new Promise((r) => ws.addEventListener("open", r));
let id = 0;
const pending = new Map();
ws.addEventListener("message", (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) pending.get(m.id)(m.result ?? m.error), pending.delete(m.id);
});
const send = (method, params = {}) => new Promise((r) => { pending.set(++id, r); ws.send(JSON.stringify({ id, method, params })); });
const evaluate = async (expr) => (await send("Runtime.evaluate", { expression: expr, awaitPromise: true, returnByValue: true })).result.value;
const [w, h] = sizes[0].split("x").map(Number);
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 2, mobile: true });
await send("Emulation.setUserAgentOverride", { userAgent: "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Mobile Safari/537.36" });
await send("Page.navigate", { url });
await sleep(6000);
const info = await evaluate(`(() => {
  document.documentElement.style.scrollSnapType = 'none';
  return [...document.querySelectorAll('main > section, body > footer, #app-minute-tutorial')].map(s => {
    const r = s.getBoundingClientRect();
    return { id: s.id || s.tagName.toLowerCase(), top: Math.round(r.top + scrollY), height: Math.round(r.height) };
  });
})()`);
const overflow = await evaluate("document.documentElement.scrollWidth - innerWidth");
console.log(`${w}x${h} rolagem lateral: ${overflow > 0 ? overflow + "px" : "não"}`);
let n = 0;
for (const s of info) {
  n++;
  console.log(`  ${s.id.padEnd(22)} ${s.height}px`);
  await evaluate(`window.scrollTo(0, ${s.top})`);
  await sleep(500);
  const shot = await send("Page.captureScreenshot", { format: "jpeg", quality: 72, captureBeyondViewport: true, clip: { x: 0, y: s.top, width: w, height: Math.min(s.height, 2400), scale: 1 } });
  writeFileSync(`${outDir}/${String(n).padStart(2, "0")}-${s.id}.jpg`, Buffer.from(shot.data, "base64"));
}
ws.close();
proc.kill();
await sleep(1500);
try { (await import("node:fs")).rmSync(`${process.env.TEMP}/cdp-${port}`, { recursive: true, force: true, maxRetries: 5, retryDelay: 300 }); } catch {}
process.exit(0);
