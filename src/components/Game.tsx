import { css } from "@emotion/react";
import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Range, Vector2 } from "../utils/types";
import Pacman from "./entities/Pacman";
import Ghost from "./entities/Ghost";
import { Math } from "../utils/math";
import mapGenerator from "../utils/mapGenerator";
import { gameConstants } from "../utils/constants";
import Node from "./entities/Node";
import Tile, { MapTileData } from "./entities/Tile";
import Button from "./ui/Button";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import BFS from "../utils/bfs";
import { mapsList } from "../assets/maps/maps";

// TYPES =====================================================================================

// VARS =====================================================================================

// const animSpeed = 100;
const tileSize = gameConstants.tileSize;

// =======================================    COMPONENT    =======================================

export default function Game() {
  const [pacmanPos, setPacmanPos] = useState<Vector2 | null>(null);
  const [ghostPos, setGhostPos] = useState<Vector2 | null>(null);
  const [gameMap, setGameMap] = useState<MapTileData[][]>();
  const [path, setPath] = useState<Vector2[]>();
  const [steps, setSteps] = useState(0);
  const [maxSteps, setMaxSteps] = useState(0);
  const [update, setUpdate] = useState(0);
  const mapSize = useRef<Vector2>({ x: 0, y: 0 });
  // const timeoutId = useRef(-1);
  // const isPlaying = useRef(false);
  const bfs = new BFS();

  // Game initialization
  useLayoutEffect(() => {
    const mapData = mapGenerator(mapsList[0]);
    setGameMap(mapData.map);
    mapSize.current = { x: mapData.width, y: mapData.height };
    setPacmanPos(mapData.pacmanPos);
    setGhostPos(mapData.ghostPos);
  }, []);

  // Sempre que for necessário realizar a atualização de algum componente do mapa
  useLayoutEffect(() => {
    if (!gameMap || !pacmanPos || !ghostPos) return;
    clearStates();
    setMaxSteps(bfs.getMaxSteps(ghostPos, gameMap));
    setPath(bfs.run(ghostPos, pacmanPos, [...gameMap], steps));
  }, [ghostPos, gameMap, pacmanPos, steps, update]);

  // Função helper usada apenas para forçar uma nova renderização do componente
  function handleTileChange() {
    setUpdate((prev) => (prev === 1 ? 0 : 1));
  }

  // Atualiza a quantidade de passos por um valor específico. O ideal é que os passos sejam de 1 em 1
  // para deixar a visualização mais suave.
  function changeStepsBy(amount: number) {
    setSteps((prev) => Math.clamp(prev + amount, 0, maxSteps));
  }

  // Retorna o estado de todos os tiles do mapa para "unVisited" + "notNeighbor".
  // Esta função é usada antes de chamar a BFS. Isso garante que se os steps forem
  // decrementados, os tiles que tiveram seu estado alterados, voltei ao normal caso
  // a quantidade de steps não seja suficiente para chegar neles
  function clearStates() {
    if (!gameMap) return;
    gameMap.map((row) => {
      row.map((tile) => {
        tile.state = ["unVisited", "notNeighbor"];
      });
    });
  }

  // useAnimation(isPlaying, timeoutId, incrementSteps);

  // Render do componente
  return (
    <>
      <div css={wrapper}>
        <div css={mapStyle}>
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${mapSize.current.x} ${mapSize.current.y}`}
            preserveAspectRatio="xMidYMid meet"
          >
            {gameMap && renderMap(gameMap, handleTileChange)}
            {path && renderPath(path)}
            {pacmanPos && <Pacman coord={pacmanPos} />}
            {ghostPos && <Ghost coord={ghostPos} />}
          </svg>
        </div>
        {/* Buttons */}
        <div css={buttonGroupStyle}>
          <Button
            css={buttonStyle}
            icon={<MdKeyboardDoubleArrowLeft />}
            iconLocation="start"
            text="Voltar"
            onClick={() => changeStepsBy(-1)}
          />
          <Button
            css={buttonStyle}
            icon={<MdKeyboardDoubleArrowRight />}
            iconLocation="end"
            text="Avançar"
            onClick={() => changeStepsBy(1)}
          />
        </div>
      </div>
    </>
  );
}

// Renderiza o mapa em forma de componente React. A função onTileChange é passada
// para todos os tiles criados. Ela é utilizada pelos tiles para notificar o componente
// Game quando um tile muda de estado, que por sua vez geara uma nova renderização do componente.
function renderMap(
  map: MapTileData[][],
  onTileChangeCallback: () => void
): ReactNode {
  if (!map) return null;

  return (
    <g>
      {map.map((row, rowIndex) => (
        <g key={`row-${rowIndex}`}>
          {row.map((obj, colIndex) => (
            <Tile
              dist={obj.dist}
              key={`${rowIndex}-${colIndex}`}
              coord={obj.coord}
              type={obj.type}
              state={obj.state}
              map={map}
              onTileChange={onTileChangeCallback}
            />
          ))}
        </g>
      ))}
    </g>
  );
}

// HOOKS =====================================================================================

// function useAnimation(
//   isPlaying: boolean,
//   timeoutId: React.RefObject<number>,
//   handleSteps: (value: number) => void
// ) {
//   useEffect(() => {
//     if (!isPlaying) return;

//     timeoutId.current = setInterval(() => {
//       handleSteps(+1);
//     }, animSpeed);

//     return () => clearTimeout(timeoutId.current);
//   }, [isPlaying]);
// }

// FUNCTIONS =====================================================================================

// RENDERS =====================================================================================

function renderPath(path: Vector2[]) {
  return path.map((coord, index) => {
    return (
      <Node pos={{ x: coord.x * tileSize, y: coord.y * tileSize }}>oi</Node>
    );
  });
}

// STYLES =====================================================================================

const wrapper = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #00041a;
  padding: 20px 20px;
`;

const mapStyle = css`
  width: 100%;
  max-width: 700px;
`;

// UI Styles
const buttonStyle = css`
  min-width: 120px;
  font-size: 1.2rem;
  font-weight: 500;
  color: #1f1f1f;
`;

const buttonGroupStyle = css`
  display: flex;
  gap: 10px;
`;
