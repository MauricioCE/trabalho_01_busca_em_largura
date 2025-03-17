import { css } from "@emotion/react";
import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import bfs from "../utils/bfs";
import Vector2 from "../classes/Vector2";
import { Range } from "../utils/types";
import Map, { MapType } from "./Map";
import Pacman from "./entities/Pacman";
import Ghost from "./entities/Ghost";
import { Math } from "../utils/math";

// TYPES =====================================================================================

// VARS =====================================================================================

const stage = [
  ". . . . . x . . . . . . . . . .",
  "x . x x . . x . x x x . . . . .",
  ". . . . x . . . . . . . . . . .",
  ". x x . . x x x . . x . . . . .",
  ". . . . . . . . . x x . . . . .",
  ". x x x x . x . . . x . . . . .",
  ". . x . x . . x . . x . . . . .",
  ". . x . x . . x . . . . . . . .",
  ". x x . x x . x . x x . . . . .",
  ". x . . . . . . . x . . . . . .",
  ". . x . . . x . . . . . . . . .",
  ". . . . x x x x x x x . . . . .",
];

const animSpeed = 100;
const pacmanPos: Vector2 = { x: 9, y: 9 };
const ghostPos: Vector2 = { x: 9, y: 9 };

// ===============================================================================================
// =======================================    COMPONENT    =======================================
// ===============================================================================================

export default function Game() {
  const [map, setMap] = useState<ReactNode>([]);
  const [mapData, setMapData] = useState<ReactNode[][]>([]);
  const [pacman, setPacman] = useState<ReactNode>();
  const [ghost, setGhost] = useState<ReactNode>();
  const [path, setPath] = useState<Vector2[]>([]);
  const [steps, setSteps] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timeoutId = useRef(-1);

  useEffect(() => {
    setMap(<Map stage={stage} onMapGenerated={setMapData} />);
    setPacman(<Pacman pos={pacmanPos} />);
    setGhost(<Ghost pos={pacmanPos} />);
  }, []);

  // useAnimation(isPlaying, timeoutId, incrementSteps);

  useEffect(() => {
    if (!map) return;
    // setPath(bfs(ghostPos, pacmanPos, map, steps));
  }, [map, path, steps]);

  return <></>;
}

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
  return [];
}

// STYLES =====================================================================================

const wrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;
