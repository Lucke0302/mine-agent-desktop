import { useState } from "react";
import { open } from "@tauri-apps/plugin-dialog";
import * as path from '@tauri-apps/api/path';
import { writeTextFile, readTextFile, exists } from "@tauri-apps/plugin-fs";

interface ServerStats {
  cpu: number;
  ram: number;
  status: "OFFLINE" | "SYNCING" | "ONLINE" | "WAITING_AUTH";
  activePlayers: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<ServerStats>({
    cpu: 0,
    ram: 0,
    status: "OFFLINE",
    activePlayers: 0
  });

  const [paths, setPaths] = useState({
    serverBat: "",
    rcloneExe: "C:\\rclone\\rclone.exe"
  });

  const handleSelectPath = async (key: "serverBat" | "rcloneExe") => {
    const selected = await open({
      multiple: false,
      filters: [{ name: "Executáveis", extensions: ["bat", "exe", "cmd"] }]
    });
    if (selected) setPaths({ ...paths, [key]: selected as string });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 font-sans">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-blue-400">Bostossauro Agent</h1>
          <p className="text-slate-400 text-sm">Hardware Orchestrator v1.0</p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`h-3 w-3 rounded-full ${stats.status === 'ONLINE' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
          <span className="font-mono font-bold text-sm uppercase">{stats.status}</span>
        </div>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* MONITORAMENTO */}
        <section className="bg-slate-900 p-5 rounded-xl border border-slate-800 shadow-lg">
          <h3 className="text-slate-400 text-xs font-bold uppercase mb-4 tracking-wider">Monitoramento em Tempo Real</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Carga do Java (CPU)</span>
                <span className="text-blue-400 font-mono">{stats.cpu}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full transition-all duration-500" style={{ width: `${stats.cpu}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Uso de RAM</span>
                <span className="text-purple-400 font-mono">{stats.ram} MB</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full transition-all duration-500" style={{ width: `${(stats.ram / 8192) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* CONFIGURAÇÕES */}
        <section className="bg-slate-900 p-5 rounded-xl border border-slate-800">
          <h3 className="text-slate-400 text-xs font-bold uppercase mb-4 tracking-wider">Caminhos do Sistema</h3>
          <div className="space-y-4">
            <div className="group">
              <label className="text-[10px] text-slate-500 uppercase font-bold">Script de Inicialização (.bat)</label>
              <div className="flex gap-2 mt-1">
                <input readOnly value={paths.serverBat} className="bg-slate-950 border border-slate-800 rounded p-2 text-xs flex-1 truncate text-slate-400" />
                <button onClick={() => handleSelectPath("serverBat")} className="bg-slate-800 hover:bg-slate-700 px-3 rounded text-xs transition-colors">Procurar</button>
              </div>
            </div>
            <div className="group">
              <label className="text-[10px] text-slate-500 uppercase font-bold">Executável Rclone</label>
              <div className="flex gap-2 mt-1">
                <input readOnly value={paths.rcloneExe} className="bg-slate-950 border border-slate-800 rounded p-2 text-xs flex-1 truncate text-slate-400" />
                <button onClick={() => handleSelectPath("rcloneExe")} className="bg-slate-800 hover:bg-slate-700 px-3 rounded text-xs transition-colors">Procurar</button>
              </div>
            </div>
          </div>
        </section>

        {/* CONTROLE DE ESTADO */}
        <section className="bg-slate-900 p-5 rounded-xl border border-slate-800 col-span-1 md:col-span-2">
          <h3 className="text-slate-400 text-xs font-bold uppercase mb-4 tracking-wider">Logs de Automação</h3>
          <div className="bg-slate-950 rounded p-4 h-32 font-mono text-[11px] overflow-y-auto border border-slate-900 text-slate-500">
            <p className="text-blue-500">[SYSTEM] Agente iniciado com sucesso.</p>
            <p>[FIREBASE] Aguardando comando do Bostossauro...</p>
            {stats.status === "WAITING_AUTH" && (
              <p className="text-yellow-500 animate-pulse">[AUTH] Lucas solicitou acesso. Aguardando aprovação do dono do PC...</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}