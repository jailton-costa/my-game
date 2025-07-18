"use client";

import { useState } from "react";
import Link from "next/link";
import Animacao from "../comp/Animacao";

const opcoes = [
  {
    nome: "Continuar",
    descricao: "Continue da onde parou.",
    links: "/telas/"
  },
  {
    nome: "Começar jogo",
    descricao: "Inicie sua jornada no mundo de Edgewake!",
    links: "/telas/mapa"
  },
  {
    nome: "Como joga (recomendado)",
    descricao: "Aprenda os controles e mecânicas essenciais antes de jogar.",
    links: "/telas/"
  },
  {
    nome: "Sobre o jogo",
    descricao: "Conheça a história e o universo por trás de Edgewake.",
    links: "/telas/sobreJogo"
  },
  {
    nome: "Configuarasoes",
    descricao: "Altere: volume, controles, visual.",
    links: "/telas/configu"
  },
  {
    nome: "Voltar",
    descricao: "Voltar para tela inicial.",
    links: "/"
  },
];

export default function page() {
  const [selecionado, setSelecionado] = useState(0);

  return (
    <div className="w-full h-screen font-sans">
      <Animacao />

      <div className="relative z-10 flex h-full text-cinza-50">
        {/* Menu lateral */}
        <div className="flex flex-col justify-start pl-16 gap-4 py-10 ">
          <h1 className="text-5xl pb-4 border-b border-cinza-50 "> <p className="letraPula">Menu principal</p></h1>

          {opcoes.map((opcao, i) => (
            <button
              key={i}
              onMouseEnter={() => setSelecionado(i)}
              className={` transition-transform ${i === 0 ? "translate-x-6" :
                i === 1 ? "translate-x-8" :
                  i === 2 ? "translate-x-6" :
                    i === 3 ? "translate-x-4" :
                      i === 4 ? "translate-x-2  " :
                        "translate-x-0"
                }`}
            >
              {opcao.links ? (
                <Link className="botaoPadrao moverBotao" href={opcao.links}> <p className="crescerTexto">{opcao.nome}</p></Link>
              ) : (
                <p>{opcao.button}</p>
              )}
            </button>
          ))}
        </div>

        {/* Descrição lateral */}
        <div className="hidden md:flex flex-1 items-center justify-center pr-10">
          <div className="bg-black/30 p-6 rounded-lg border text-verde-selecao border-verde-selecao text-center text-lg max-w-md">
            <h1 className="font-mono animate-type transition border-b-1 letraPula ">
              <p className="crescerTexto">
                {opcoes[selecionado].descricao}
              </p>
            </h1>
          </div>
        </div>
      </div>

      {/* Rodapé */}
      <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-gray-200">
        Use o mouse ou teclas de seta para navegar. ENTER para confirmar.
      </div>
    </div>
  );
}
