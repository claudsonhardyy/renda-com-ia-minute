// Mede, a cada passo dos carrosséis no celular, se a página cabe na tela.
// uso: node slides.mjs <url> <LxA> [pastaCapturas]
import { spawn } from "node:child_process";
import { writeFileSync, rmSync } from "node:fs";

const [url, size, outDir] = process.argv.slice(2);
const [w, h] = size.split("x").map(Number);
const chrome = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const port = 9333 + Math.floor(Math.random() * 500);
const proc = spawn(chrome, ["--headless=new", "--disable-gpu", "--hide-scrollbars", `--remote-debugging-port=${port}`, `--user-data-dir=${process.env.TEMP}/cdp-${port}`, "about:blank"]);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let wsUrl;
for (let i = 0; i < 50 && !wsUrl; i++) {
  await sleep(200);
  try { wsUrl = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === "page")?.webSocketDebuggerUrl; } catch {}
}
const ws = new WebSocket(wsUrl);
await new Promise((r) => ws.addEventListener("open", r));
let id = 0;
const pending = new Map();
ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) pending.get(m.id)(m.result ?? m.error), pending.delete(m.id); });
const send = (method, params = {}) => new Promise((r) => { pending.set(++id, r); ws.send(JSON.stringify({ id, method, params })); });
const ev = async (e) => (await send("Runtime.evaluate", { expression: e, awaitPromise: true, returnByValue: true })).result.value;
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 2, mobile: true });
await send("Page.navigate", { url });
await sleep(6000);
await ev("document.documentElement.style.scrollBehavior='auto'; document.documentElement.style.scrollSnapType='none'; 1");

async function shot(name, el) {
  if (!outDir) return;
  await ev(`window.scrollTo(0, document.querySelector('${el}').getBoundingClientRect().top + scrollY - (${el === "#app-minute-tutorial" ? 64 : 0}))`);
  await sleep(400);
  const s = await send("Page.captureScreenshot", { format: "jpeg", quality: 70 });
  writeFileSync(`${outDir}/${name}.jpg`, Buffer.from(s.data, "base64"));
}

// Dicas: altura da página a cada tela
const nDicas = 15;
const alturas = [];
for (let i = 0; i < nDicas; i++) {
  const hh = await ev("Math.round(document.getElementById('dicas-gravacao').getBoundingClientRect().height)");
  alturas.push(hh);
  if (hh > h) await shot(`dica-${i + 1}`, "#dicas-gravacao");
  await ev(`[...document.querySelectorAll('#dicas-gravacao [aria-label="Próxima"]')].pop().click(); 1`);
  await sleep(450);
}
console.log(`${size} dicas: ${alturas.join(" ")} (tela ${h})`);

// Tutorial do MINUTE: quanto o texto do passo passa do fim da "página" do celular
const sobras = [];
for (let i = 0; i < 7; i++) {
  const s = await ev(`(() => { const b = document.getElementById('app-minute-tutorial'); const r = b.getBoundingClientRect(); const last = b.lastElementChild.getBoundingClientRect(); return Math.round(last.bottom - r.bottom); })()`);
  sobras.push(s);
  if (i === 0 || s > 0) await shot(`tut-${i + 1}`, "#app-minute-tutorial");
  await ev(`document.querySelector('#app-minute [aria-label="Próxima imagem do aplicativo"]').click(); 1`);
  await sleep(450);
}
console.log(`${size} tutorial (px além da tela, negativo = sobra): ${sobras.join(" ")}`);

ws.close();
proc.kill();
await sleep(1500);
try { rmSync(`${process.env.TEMP}/cdp-${port}`, { recursive: true, force: true, maxRetries: 5, retryDelay: 300 }); } catch {}
process.exit(0);
