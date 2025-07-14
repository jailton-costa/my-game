"use client";

import { useState } from "react";
import Link from "next/link";
import Animacao from "@/app/comp/Animacao";

export default function page() {
    const [musica, setMusica] = useState(50);
    const [efeitos, setEfeitos] = useState(50);
    const [controle, setControle] = useState("teclado");
    const [idioma, setIdioma] = useState("pt");

    return (
        <div className="w-full h-screen font-sans relative">
            <Animacao />
            <div className="absolute inset-0 bg-opacity-60 justify-center" />

            <div className="relative z-10 flex flex-col h-full px-10 py-16 max-w-3xl mx-auto">
                <div className="bg-white/15 rounded-2xl text-cinza-50 flex flex-col gap-4">
                    <h1 className="text-5xl mb-10 border-b border-cinza-50 pb-4 pt-4"><p className="letraPula">Configurações</p></h1>

                    {/* Volume Música */}
                    <div className="mb-6">
                        <label className="block text-xl font-bold mb-2 pt-4 pb-4">Volume da Música {musica}%</label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={musica}
                            onChange={(e) => setMusica(Number(e.target.value))}
                            className="w-full"
                        />
                    </div>

                    {/* Volume Efeitos */}
                    <div className="mb-6">
                        <label className="block text-xl font-bold mb-2">Volume dos Efeitos {efeitos}%</label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={efeitos}
                            onChange={(e) => setEfeitos(Number(e.target.value))}
                            className="w-full"
                        />
                    </div>

                    <div className="flex gap-40">
                        <div className="mb-6">
                            <label className="block text-xl font-bold mb-2">Controle</label>
                            <select
                                value={controle}
                                onChange={(e) => setControle(e.target.value)}
                                className="bg-verde-selecao px-4 py-2 rounded"
                            >
                                <option value="teclado">Teclado</option>
                                <option value="controle">Controle</option>
                            </select>
                        </div>

                        <div className="mb-10">
                            <label className="block text-xl font-bold mb-2">Idioma</label>
                            <select
                                value={idioma}
                                onChange={(e) => setIdioma(e.target.value)}
                                className="bg-verde-selecao px-4 py-2 rounded"
                            >
                                <option value="pt">Português</option>
                                <option value="en">Inglês</option>
                                <option value="es">Espanhol</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end pl-100 pb-4 w-170">
                        <Link
                            href="/telas"
                            className="botaoPadrao"
                        >
                            Voltar ao menu
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
