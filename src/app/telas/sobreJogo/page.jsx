"use client";

import Animacao from "@/app/comp/Animacao";
import Link from "next/link";

export default function SobreJogo() {
    return (
        <div className="w-full min-h-screen font-sans relative">
            <Animacao />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

            <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
                <h1 className="text-5xl font-extrabold pb-4 border-b-2 text-cinza-50"><p className="letraPula">🌌 Sobre o Jogo - Edgewake</p></h1>

                <p className="text-lg leading-relaxed pt-6 pb-6 text-gray-200">
                    Em um futuro colapsado, onde as fronteiras entre dimensões se partiram, o mundo de <span className="text-verde-selecao font-bold">Edgewake</span> surgiu como o último bastião entre a luz e o vazio. Humanos, máquinas e entidades esquecidas coexistem nesse bunker dimensional, tentando escapar de um ciclo infinito de destruição.
                </p>

                <p className="text-lg leading-relaxed pb-6 text-gray-200">
                    Você assume o papel de um <span className="text-verde-selecao">Desperto</span> — uma alma que atravessou os limites da realidade e carrega fragmentos de poder de eras antigas. Suas decisões moldarão o equilíbrio entre caos e esperança.
                </p>

                <h2 className="text-2xl font-bold text-verde-selecao mt-10 mb-2">✨ Principais Características</h2>
                <ul className="list-disc list-inside text-gray-300 text-lg pb-8">
                    <li>Exploração em mapa por grid com eventos e NPCs</li>
                    <li>Combate tático estilo Undertale com área de esquiva</li>
                    <li>Transformações e habilidades inspiradas em jogos clássicos</li>
                    <li>Roteiro com múltiplas escolhas e finais</li>
                </ul>

                <Link
                    href="/telas"
                    className="botaoPadrao"
                >
                    Voltar ao Menu
                </Link>
            </div>
        </div>
    );
}
