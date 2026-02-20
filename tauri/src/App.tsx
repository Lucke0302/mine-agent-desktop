import { useState } from "react";

function App() {
  const [status, setStatus] = useState("Aguardando Bostossauro...");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-8 font-sans selection:bg-blue-500/30">
      
      {/* Cabeçalho simples */}
      <header className="mb-8 border-b border-slate-800 pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-blue-500 tracking-tight">Agente Local</h1>
          <p className="text-slate-500 text-sm">Painel de Controle do Servidor</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 rounded-full border border-slate-800">
          <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
          <span className="text-xs font-mono text-slate-400">{status}</span>
        </div>
      </header>

      {/* Corpo principal */}
      <main className="grid gap-4">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold mb-2">Setup Inicial</h2>
          <p className="text-slate-400 text-sm mb-4">
            Se você está lendo isso com o fundo escuro e o texto azul lá em cima, o Tailwind v4 está configurado com sucesso!
          </p>
          <button 
            onClick={() => setStatus("Conectado!")}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
          >
            Testar Botão
          </button>
        </div>
      </main>

    </div>
  );
}

export default App;