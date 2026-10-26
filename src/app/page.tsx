import { Header } from "@/components/Header";
import { AppMinute } from "@/components/sections/AppMinute";
import { Cadastro } from "@/components/sections/Cadastro";
import { Celulares } from "@/components/sections/Celulares";
import { ComoFunciona } from "@/components/sections/ComoFunciona";
import { Dicas } from "@/components/sections/Dicas";
import { Inicio } from "@/components/sections/Inicio";
import { Pagamentos } from "@/components/sections/Pagamentos";
import { Proposito } from "@/components/sections/Proposito";
import { Suporte } from "@/components/sections/Suporte";

// Ordem = numeração dos arquivos de referência no Drive.
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Inicio />
        <ComoFunciona />
        <Cadastro />
        <AppMinute />
        <Pagamentos />
        <Suporte />
        <Dicas />
        <Celulares />
        <Proposito />
      </main>
      <footer className="border-t border-white/10 py-8 text-center text-sm text-white/50">MINUTE · Guia independente</footer>
    </>
  );
}
