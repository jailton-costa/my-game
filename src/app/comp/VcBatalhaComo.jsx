"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

export default function TelaBatalha({ hp, setHp, onWin, onLose }) {
    const [heartPosition, setHeartPosition] = useState({ x: 50, y: 50 });
    const [projeteis, setProjeteis] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [vitoria, setVitoria] = useState(false);
    const [tempoRestante, setTempoRestante] = useState(30);
    const [danoRecebido, setDanoRecebido] = useState(0);
    const [combo, setCombo] = useState(0);
    const [ultimoHit, setUltimoHit] = useState(0);

    const areaBatalhaRef = useRef(null);
    const animacaoRef = useRef();
    const tempoInicioRef = useRef(0);
    const tempoHitRef = useRef(0);
    const contadorTempoRef = useRef();

    const DURACAO_BATALHA = 30; 
    const DANO_BASE = 1;
    const TAMANHO_CORACAO = 16;

    const moverCoracao = useCallback((e) => {
        if (!areaBatalhaRef.current || gameOver || vitoria) return;
        const rect = areaBatalhaRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
        const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
        setHeartPosition({ x, y });
    }, [gameOver, vitoria]);

    const criarPadraoAtaque = useCallback(() => {
        const padroes = [
            () => Array.from({ length: 8 }, (_, i) => ({
                id: Date.now() + i,
                x: (i * 12.5) + 6.25,
                y: 0,
                velocidadeX: 0,
                velocidadeY: 2 + Math.random(),
                tamanho: 8 + Math.random() * 8,
                cor: 'bg-purple-300',
                tipo: 'normal'
            })),
            () => {
                const qtd = 6;
                return Array.from({ length: qtd }, (_, i) => ({
                    id: Date.now() + i,
                    x: 50 + Math.sin(i) * 30,
                    y: 50 + Math.cos(i) * 30,
                    velocidadeX: Math.sin(i) * 1.5,
                    velocidadeY: Math.cos(i) * 1.5,
                    tamanho: 12,
                    cor: 'bg-purple-900 ',
                    tipo: 'normal'
                }));
            },
            () => [{
                id: Date.now(),
                x: Math.random() * 100,
                y: Math.random() * 100,
                velocidadeX: 0,
                velocidadeY: 0,
                tamanho: 16,
                cor: 'bg-roxo-100',
                tipo: 'perseguidor'
            }]
        ];

        return padroes[Math.floor(Math.random() * padroes.length)]();
    }, []);

    const loopBatalha = useCallback((timestamp) => {
        if (!tempoInicioRef.current) {
            tempoInicioRef.current = timestamp;
        }

        const tempoDecorrido = timestamp - tempoInicioRef.current;
        const tempoDecorridoSegundos = Math.floor(tempoDecorrido / 2000);
        setTempoRestante(Math.max(0, DURACAO_BATALHA - tempoDecorridoSegundos));

        if (tempoDecorrido % 2000 < 50) {
            setProjeteis(prev => [...prev, ...criarPadraoAtaque()]);
        }

        setProjeteis(prev =>
            prev.map(projetil => {
                if (projetil.tipo === 'perseguidor') {
                    const angulo = Math.atan2(
                        heartPosition.y - projetil.y,
                        heartPosition.x - projetil.x
                    );
                    return {
                        ...projetil,
                        x: projetil.x + Math.cos(angulo) * 1.5,
                        y: projetil.y + Math.sin(angulo) * 1.5
                    };
                }
                return {
                    ...projetil,
                    x: projetil.x + projetil.velocidadeX,
                    y: projetil.y + projetil.velocidadeY
                };
            }).filter(projetil =>
                projetil.y > -10 && projetil.y < 110 &&
                projetil.x > -10 && projetil.x < 110
            )
        );

        setProjeteis(prev => {
            const projeteisAcertados = new Set();
            const agora = Date.now();

            const novosProjeteis = prev.filter(projetil => {
                const distancia = Math.sqrt(
                    Math.pow(projetil.x - heartPosition.x, 2) +
                    Math.pow(projetil.y - heartPosition.y, 2)
                );

                if (distancia < TAMANHO_CORACAO / 2 + projetil.tamanho / 2 &&
                    !projeteisAcertados.has(projetil.id) &&
                    agora - tempoHitRef.current > 300) {

                    const dano = DANO_BASE + Math.floor(combo / 5);
                    setHp(h => Math.max(0, h - dano));
                    setDanoRecebido(dano);
                    setTimeout(() => setDanoRecebido(0), 500);

                    projeteisAcertados.add(projetil.id);
                    tempoHitRef.current = agora;

                    if (agora - ultimoHit < 2000) {
                        setCombo(c => c + 1);
                    } else {
                        setCombo(1);
                    }
                    setUltimoHit(agora);

                    return false;
                }
                return true;
            });

            return novosProjeteis;
        });

        if (hp <= 0) {
            setGameOver(true);
            return;
        }

        if (tempoDecorridoSegundos >= DURACAO_BATALHA) {
            setVitoria(true);
            return;
        }

        animacaoRef.current = requestAnimationFrame(loopBatalha);
    }, [hp, heartPosition, criarPadraoAtaque, setHp, combo, ultimoHit]);

    useEffect(() => {
        if (danoRecebido > 0) {
            const timer = setTimeout(() => setDanoRecebido(0), 500);
            return () => clearTimeout(timer);
        }
    }, [danoRecebido]);

    useEffect(() => {
        contadorTempoRef.current = setInterval(() => {
            setTempoRestante(prev => Math.max(0, prev - 1));
        }, 1000);

        return () => clearInterval(contadorTempoRef.current);
    }, []);

    useEffect(() => {
        animacaoRef.current = requestAnimationFrame(loopBatalha);
        return () => {
            cancelAnimationFrame(animacaoRef.current);
            clearInterval(contadorTempoRef.current);
        };
    }, [loopBatalha]);

    return (
        <div className="max-w-md mx-auto pr-3 relative">

            <div className="relative gap-2 flex flex-col justify-center items-center bg-gray-900/90 border-2 border-red-600 rounded-xl p-4 mb-4 shadow-lg shadow-red-900/50">

                <img src="/imgs/feio.jpg" alt="" />
                <div
                    ref={areaBatalhaRef}
                    onMouseMove={moverCoracao}
                    className="relative w-110 h-110 bg-black/90 rounded-lg border border-red-600 overflow-hidden cursor-none"
                >
                    <div
                        className={`absolute rounded-full ${danoRecebido > 0 ? 'bg-red-500 scale-110' : 'bg-green-500'
                            }`}
                        style={{
                            left: `${heartPosition.x}%`,
                            top: `${heartPosition.y}%`,
                            width: `${TAMANHO_CORACAO}px`,
                            height: `${TAMANHO_CORACAO}px`,
                            boxShadow: `0 0 15px 5px ${danoRecebido > 0 ? '#ef4444' : '#22c55e'}`
                        }}
                    >
                        {danoRecebido > 0 && (
                            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-red-500 font-bold animate-bounce">
                                -{danoRecebido}
                            </div>
                        )}
                    </div>

                    {projeteis.map(projetil => (
                        <div
                            key={projetil.id}
                            className={`absolute rounded-full ${projetil.cor} `}
                            style={{
                                left: `${projetil.x}%`,
                                top: `${projetil.y}%`,
                                width: `${projetil.tamanho}px`,
                                height: `${projetil.tamanho}px`,
                                boxShadow: `0 0 ${projetil.tamanho}px 2px`
                            }}
                        />
                    ))}
                </div>

                {combo > 0 && (
                    <div className="flex flex-col items-center justify-center border font-mono">
                        <p className="text-sm text-amber-50 border-b-1 border-amber-50">informasoes da batalha</p>
                        <div className="flex gap-2 items-center justify-center">
                            <p className="text-sm">tempo {tempoRestante}s</p>
                            <p className="text-right text-red-600 text-sm">Combo: x{combo} (+{Math.floor(combo / 5)} dano)</p>
                        </div>
                    </div>
                )}
            </div>

            {(gameOver || vitoria) && (
                <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="bg-gray-800/90 border-2 shadow-lg shadow-amber-50/50 transition-all duration-300 border-amber-50 p-6 rounded-xl text-center max-w-sm w-full animate-pop-in">
                        <h2 className="text-4xl font-bold mb-4">
                            {gameOver ? (
                                <span className="text-red-500">DERROTA</span>
                            ) : (
                                <span className="text-green-500">VITÓRIA!</span>
                            )}
                        </h2>
                        <p className="mb-6 text-lg">
                            {gameOver ? 'Você foi derrotado...' : 'Inimigo derrotado com sucesso!'}
                        </p>
                        <button
                            onClick={gameOver ? onLose : onWin}
                            className={`w-full py-3 px-6 rounded-lg font-bold text-lg transition ${gameOver ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                                }`}
                        >
                            {gameOver ? 'Tentar Novamente' : 'Continuar'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}