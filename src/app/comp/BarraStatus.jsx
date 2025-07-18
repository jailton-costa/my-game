import React, { useEffect, useState } from "react";

export default function BarraStatus({ hp }) {
  const [itens, setItens] = useState(1);
  const [nivel, setNivel] = useState(1);

  return (
    <div className="h-screen w-40 flex flex-col bg-black/30 border text-white gap-2">
      <div className="flex flex-row items-center justify-center border-b pt-2 pb-1">
        <span className="text-2xl animate-bounce">Edgewake</span>
      </div>

      <div className="flex flex-col border-b pb-2 text-xs justify-center items-center">
        <div className="flex flex-col gap-2 w-full">

          {/* Nível */}
          <div className="flex flex-row items-center justify-center gap-1 border-b border-green-400 text-green-400 w-full">
            <div className="w-20 flex flex-row items-center">
              <p className="pr-1">Nv:</p>
              <div className="bg-green-400 h-2 transition-all duration-300"
                style={{ width: `${(nivel / 20) * 100}%` }} />
            </div>
            <p className="text-xs">{nivel}/20</p>
          </div>

          {/* Vida */}
          <div className="flex flex-row items-center justify-center gap-1 border-b border-yellow-400 text-yellow-400 w-full">
            <div className="w-20 flex flex-row items-center">
              <p className="pr-1">HP:</p>
              <div className="bg-yellow-400 h-2 transition-all duration-300"
                style={{ width: `${(hp / 20) * 100}%` }} />
            </div>
            <p className="text-xs">{hp}/20</p>
          </div>

          {/* Itens */}
          <div className="flex flex-row items-center justify-center gap-1 text-purple-300 border-b border-purple-300 w-full">
            <div className="w-20 flex flex-row items-center">
              <p className="pr-1">Itens:</p>
              <div className="bg-purple-300 h-2 transition-all duration-300"
                style={{ width: `${(itens / 20) * 100}%` }} />
            </div>
            <p className="text-xs">{itens}/20</p>
          </div>
        </div>
      </div>

      {/* Botões */}
      <div className="flex flex-col gap-2 justify-center items-center text-xs mt-2 w-full">
        {[
          { label: "habilidades", color: "border-green-400 text-green-400" },
          { label: "mochila", color: "border-purple-300 text-purple-300" },
          { label: "Fugir", color: "border-orange-400 text-orange-400" },
          { label: "Dialogar", color: "border-yellow-400 text-yellow-300" },
          { label: "Atacar", color: "border-red-500 text-red-400" },
        ].map((btn, i) => (
          <button
            key={i}
            className={`border w-28 py-1 px-2 uppercase font-bold ${btn.color} hover:bg-white/10 transition`}
            onClick={() => alert(`Você escolheu: ${btn.label}`)}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
