"use client";
import { useState, useEffect } from "react";
import VcBatalhaComo from "@/app/comp/VcBatalhaComo";
import Mapas from "@/app/comp/Mapas";
import Animacao from "@/app/comp/Animacao";
import BarraStatus from "@/app/comp/BarraStatus";
import { useRouter } from "next/navigation";

export default function Explorar() {
  const router = useRouter(); 
  const [worldMap, setWorldMap] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 2, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 3, 0, 1, 0, 4, 0],
    [0, 0, 0, 0, 0, 0, 0, 5, 0],
  ]);

  const [playerPosition, setPlayerPosition] = useState({ x: 1, y: 1 });
  const [visitedCells, setVisitedCells] = useState(["1,1"]);
  const [currentScreen, setCurrentScreen] = useState("map");
  const [hp, setHp] = useState(100);
  const [itens, setItens] = useState(0);
  const [battlePosition, setBattlePosition] = useState(null);

  const isWithinBounds = (x, y) => {
    return y >= 0 && y < worldMap.length && x >= 0 && x < worldMap[0].length;
  };

  const movePlayer = (dx, dy) => {
    const newPos = { x: playerPosition.x + dx, y: playerPosition.y + dy };

    if (
      isWithinBounds(newPos.x, newPos.y) &&
      worldMap[newPos.y][newPos.x] !== 0
    ) {
      setPlayerPosition(newPos);
      const cellKey = `${newPos.x},${newPos.y}`;
      if (!visitedCells.includes(cellKey)) {
        setVisitedCells((prev) => [...prev, cellKey]);
      }

      const tile = worldMap[newPos.y][newPos.x];
      if (tile === 4) {
        setBattlePosition({ x: newPos.x, y: newPos.y });
        setCurrentScreen("battle");
      } else if (tile === 5) {
        router.push("/telas/mapa");
      }
    }
  };

  const handleBattleWin = () => {
    if (battlePosition) {
      const updatedMap = [...worldMap];
      updatedMap[battlePosition.y][battlePosition.x] = 1;
      setWorldMap(updatedMap);
      setCurrentScreen("map");
    }
  };

  const handleBattleLose = () => {
    setPlayerPosition({ x: 1, y: 1 });
    setHp(100);
    setVisitedCells(["1,1"]);
    setCurrentScreen("map");
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (currentScreen !== "map") return;

      switch (e.key.toLowerCase()) {
        case "w":
        case "arrowup":
          movePlayer(0, -1);
          break;
        case "s":
        case "arrowdown":
          movePlayer(0, 1);
          break;
        case "a":
        case "arrowleft":
          movePlayer(-1, 0);
          break;
        case "d":
        case "arrowright":
          movePlayer(1, 0);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [playerPosition, currentScreen]);

  return (
    <div className="flex w-full h-screen">
      <Animacao />
      <BarraStatus hp={hp} setHp={setHp} itens={itens} />
      <div className="flex flex-col justify-center items-center pl-50 bg-gray-900 text-white p-4">
        {currentScreen === "map" ? (
          <Mapas
            itens={itens}
            worldMap={worldMap}
            playerPosition={playerPosition}
            visitedCells={visitedCells}
          />
        ) : (
          <div className="pl-40">
            <VcBatalhaComo
              hp={hp}
              setHp={setHp}
              onWin={handleBattleWin}
              onLose={handleBattleLose}
            />
          </div>
        )}

      </div>
    </div>
  );
}
