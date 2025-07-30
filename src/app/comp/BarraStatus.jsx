import React, { useState, useEffect } from "react";

export default function BarraStatus({ itens, hp, hpMaximo = 100 }) {
  const [nivel, setNivel] = useState(0);
  const [xp, setXp] = useState(0);
  const [abaAtiva, setAbaAtiva] = useState("status");
  const [animacao, setAnimacao] = useState(false);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setAnimacao(true);
      setTimeout(() => setAnimacao(false), 1000);
    }, 5000);
    return () => clearInterval(intervalo);
  }, []);

  const renderizarConteudo = () => {
    switch (abaAtiva) {
      case "status":
        return (
          <div className="flex flex-col gap-3 w-full p-2">
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-xs">
                <span className="text-blue-300">Nível {nivel}</span>
                <span className="text-blue-400">{xp}/100 XP</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-300 transition-all duration-500"
                  style={{ width: `${xp}%` }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-xs">
                <span className="text-red-300">Vida</span>
                <span className="text-red-400">{hp}/{hpMaximo} HP</span>
              </div>
              <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r from-red-600 to-yellow-500 transition-all duration-300 ${animacao ? 'animate-pulse' : ''}`}
                  style={{ width: `${(hp / hpMaximo) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-xs">
                <span className="text-purple-300">Itens</span>
                <span className="text-purple-400">{itens}/20 Itens</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-600 to-pink-400 transition-all duration-500"
                  style={{ width: `${(itens / 20) * 100}%` }}
                />
              </div>
            </div>
          </div>
        );

      case "habilidades":
        return (
          <div className="bg-black border border-green-600 text-green-300 p-4 rounded-md font-mono shadow-inner w-fit">
            <h2 className="text-green-400 text-sm mb-2">Habilidades Ativas</h2>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {["Ataque 1", "Defesa 1", "Vida 1", "Veloz 1"].map((habilidade, i) => (
                <button
                  key={i}
                  className="border border-green-500 bg-black hover:bg-green-900/30 transition rounded px-2 py-1"
                >
                  {habilidade}
                </button>
              ))}
            </div>
          </div>
        );

    case "itens":
        return (
          <div className="bg-black border border-green-600 text-green-300 p-4 rounded-md font-mono shadow-inner w-fit">
            <h2 className="text-green-400 text-sm pb-2 ">itens</h2>
            <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  key={i}
                  className="border border-green-500 bg-black hover:bg-green-900/30 transition rounded px-2 py-1"
                >
                  {itens || "Vazio"}
                </button>
            </div>
          </div>
        );

        return null;
    }
  };

  return (
    <div className="h-screen w-48 flex flex-col bg-gray-900/90 border-r border-gray-700 text-white">
      <div className="flex flex-col items-center border-b border-gray-700 p-3">
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          EDGEWAKE
        </span>
        <span className="text-xs text-gray-400 mt-1">Nível {nivel} - Desperto</span>
      </div>

      <div className="flex border-b border-gray-700">
        {[
          { id: "status", label: "Status" },
          { id: "habilidades", label: "Habilidades" },
          { id: "itens", label: "Itens" }
        ].map(aba => (
          <button
            key={aba.id}
            className={`flex-1 py-2 text-xs ${abaAtiva === aba.id ?
              "text-blue-400 border-b-2 border-blue-400" :
              "text-gray-400 hover:text-white"}`}
            onClick={() => setAbaAtiva(aba.id)}
          >
            {aba.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        {renderizarConteudo()}
      </div>
      
      <div className="p-3 border-t border-gray-700">
        <div className="grid grid-cols-2 gap-2">
          <button className="bg-red-600 hover:bg-red-700 text-xs py-2 rounded transition">
            ATACAR
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-xs py-2 rounded transition">
            FUGIR
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 text-xs py-2 rounded transition col-span-2">
            INTERAGIR
          </button>
        </div>
      </div>
    </div>
  );
}