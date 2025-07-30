"use client";

import { useEffect, useState } from "react";

export default function Mapas({itens, worldMap, playerPosition, visitedCells }) {
  const [localMap, setLocalMap] = useState(worldMap);
  const [mensagem, setMensagem] = useState("");

  const gridStyle = {
    display: "grid",
    gridTemplateRows: `repeat(${localMap.length}, minmax(0, 1fr))`,
    gridTemplateColumns: `repeat(${localMap[0].length}, minmax(0, 1fr))`,
    gap: "0.5rem",
    marginBottom: "1.5rem",
  };

  const cellStyles = {
    0: { bg: "bg-gray-800", icon: null }, // Empty
    1: { bg: "bg-green-800", visitedBg: "bg-green-700", icon: null }, // Path
    2: { bg: "bg-yellow-600", icon: "★" }, // Obstacle
    3: { bg: "bg-purple-800", visitedBg: "bg-purple-700", icon: "✦" }, // Item
    4: { bg: "bg-red-800", visitedBg: "bg-red-700", icon: "◬" }, // Enemy
    5: { bg: "bg-green-800", visitedBg: "bg-green-700", icon: "↺" }, // Exit
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === "e") {
        const { x, y } = playerPosition;
        if (localMap[y]?.[x] === 3) {
          const newMap = [...localMap];
          newMap[y][x] = 1; 
          setLocalMap(newMap);
          setMensagem("Item coletado! ✦");

          setTimeout(() => setMensagem(""), 3000);
          itens = 1
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [playerPosition, localMap]);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Exploração</h1>

      <div style={gridStyle} className="w-full">
        {localMap.map((row, y) =>
          row.map((cell, x) => {
            const isPlayer = playerPosition.x === x && playerPosition.y === y;
            const isVisited = visitedCells.includes(`${x},${y}`);
            const cellType = cellStyles[cell];

            const cellClass = `h-20 w-20 rounded-lg flex items-center justify-center transition-colors ${
              isPlayer
                ? "bg-red-500 animate-pulse"
                : isVisited && cellType.visitedBg
                ? cellType.visitedBg
                : cellType.bg
            }`;

            return (
              <div key={`${x}-${y}`} className={cellClass}>
                {isPlayer ? (
                  <span className="text-2xl">♡</span>
                ) : (
                  cellType.icon && <span className="text-xl">{cellType.icon}</span>
                )}
              </div>
            );
          })
        )}
      </div>

      <div className="mt-4 text-center text-gray-400">
        <p>
          Use <strong>WASD</strong> ou <strong>setas</strong> para mover no mapa
        </p>
        <p>Pressione <strong>E</strong> para interagir com itens</p>
        <p>Use o <strong>mouse</strong> para desviar na batalha</p>
        {mensagem && (
          <p className="mt-2 text-purple-400 font-semibold animate-pulse">
            {mensagem}
          </p>
        )}
      </div>
    </div>
  );
}
