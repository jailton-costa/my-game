"use client";

import { useState } from "react";

export default function BarraStatus() {
  const [hp, setHp] = useState(1);
  const [itens, setItens] = useState(1);
  const [nivel, setNivel] = useState(1);

  return (
    <div className="h-scheen w-80 flex flex-col bg-black/30 border-2 border-cinza-300 gap-4 text-cinza-50" >
      <h1 className='text-5xl border-b-1 text-center pt-4 pb-3'><p className='letraPula'>Edgewake</p></h1>
      <div className="flex flex-col border-b-1 pb-5 text-sm justify-center items-center">
        <div className="flex flex-col gap-5">

          <div className="flex items-center justify-center gap-2 border-b-1 border-verde-selecao text-verde-selecao">
            <div className="w-40 flex items-center">
              <p className="pr-1">Nível:</p>
              <div className="bg-verde-selecao h-4 transition-all duration-300"
                style={{ width: `${(nivel / 20) * 100}%` }} />
            </div>
            <p>{nivel} / 20</p>
          </div>

          <div className="flex items-center justify-center gap-2 border-b-1 border-yellow-400 text-yellow-400">
            <div className="w-40 flex items-center">
              <p className="pr-1">Vida:</p>
              <div className="bg-yellow-400 h-4 transition-all duration-300"
                style={{ width: `${(hp / 20) * 100}%` }} />
            </div>
            <p>{hp} / 20</p>
          </div>

          <div className="flex items-center justify-center gap-2 text-roxo-100 border-b-1 border-roxo-100">
            <div className="w-40 flex items-center">
              <p className="pr-1">Itens:</p>
              <div className="bg-roxo-300 h-4 transition-all duration-300"
                style={{ width: `${(itens / 20) * 100}%` }} />
            </div>
            <p>{itens} / 20</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1/4 gap-4 justify-center items-center text-sm">
        {[
          { label: "habilidades", color: "border-verde-selecao text-verde-selecao w-60" },
          { label: "ver mochila", color: "border-roxo-100 text-roxo-100 w-60" },
          { label: "Fugir", color: "border-laranja-400 text-laranja-400 w-60" },
          { label: "Dialogar", color: "border-yellow-400 text-yellow-300 w-60" },
          { label: "Atacar", color: "border-red-500 text-red-400 w-60" },
        ].map((btn, i) => (
          <button
            key={i}
            className={`border-2 py-2 px-4 uppercase font-bold ${btn.color} hover:bg-white/10 transition`}
            onClick={() => alert(`Você escolheu: ${btn.label}`)}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
