import { css } from "@emotion/react";
import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import bfs from "../utils/bfs";
import Vector2 from "../classes/Vector2";
import { Range } from "../utils/types";

// TYPES =====================================================================================

// VARS =====================================================================================

const mapStr = [
  ". . . . . x . . . . . .",
  "x . x x . . x . x x x .",
  ". . . . x . . . . . . .",
  ". x x . . x x x . . x .",
  ". . . . . . . . . x x .",
  ". x x x x . x . . . x .",
  ". . x . x . . x . . x .",
  ". . x . x . . x . . . .",
  ". x x . x x . x . x x .",
  ". x . . . . . . . x . .",
  ". . x . . . x . . . . .",
  ". . . . x x x x x x x .",
];

const animSpeed = 100;

// ===============================================================================================
// =======================================    COMPONENT    =======================================
// ===============================================================================================

export default function Game() {
  const [map, setMap] = useState<Map>([]);
  const [pacmanCoord, setPacmanCoord] = useState<Vector2>();
  const [ghostCoord, setGhostCoord] = useState<Vector2>();
  const [path, setPath] = useState<VertexData[]>([]);
  const [steps, setSteps] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timeoutId = useRef(-1);

  useInit(setMap, setPacmanCoord, setGhostCoord);
  useAnimation(isPlaying, timeoutId, incrementSteps);

  // Sempre que o array de dependência mudar, vai rodar o bsf e gerar um mapa atualizado
  useEffect(() => {
    if (!ghostCoord || !pacmanCoord || !map) return;
    const data = generateGameData(mapStr);
    setPath(bfs(ghostCoord, pacmanCoord, data.map, steps));
    setMap(data.map);
    console.log(path);
  }, [ghostCoord, map, pacmanCoord, path, steps]);

  renderPath(path);

// HOOKS =====================================================================================

// Usado quando se quer roda o jogo de maneira automática
function useAnimation(
  isPlaying: boolean,
  timeoutId: React.RefObject<number>,
  handleSteps: (value: number) => void
) {
  useEffect(() => {
    if (!isPlaying) return;

    timeoutId.current = setInterval(() => {
      handleSteps(+1);
    }, animSpeed);

    return () => clearTimeout(timeoutId.current);
  }, [isPlaying]);
}

// Roda apenas na primeira vez que o componente é renderizado
function useInit(
  setMap: (data: Map) => void,
  setPacmanCoord: (v: Vector2) => void,
  setGhostCoord: (v: Vector2) => void
) {
  useLayoutEffect(() => {
    const data = generateGameData(mapStr);
    setMap(data.map);
    setPacmanCoord(data.pacmanCoord);
    setGhostCoord(data.ghostCoord);
  }, []);
}

// FUNCTIONS =====================================================================================

function incrementSteps(
  increment: number,
  steps: number,
  range: Range,
  setSteps: (v: number) => void
) {
  setSteps(Math.clamp(steps + increment, range.min, range.max));
}

// RENDERS =====================================================================================


function renderPath(path: ReactNode[]) {
 return []
}

// STYLES =====================================================================================

const wrapper = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`
