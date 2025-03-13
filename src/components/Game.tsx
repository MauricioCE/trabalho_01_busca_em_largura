import { css } from "@emotion/react";
import { Vector2 } from "../utils/types";
import Vertex, { VertexProps } from "./Vertex";
import { gameConstants } from "../utils/constants";
import Entity from "./Entity";
import bfs from "../utils/BFS";
import { useEffect, useLayoutEffect, useState } from "react";

export type VertexData = VertexProps & { coord: Vector2; parent?: VertexData };
export type Map = VertexData[][];

enum EntityID {
  PACMAN = "p",
  GHOST = "g",
  WALL = "x",
  FLOOR = ".",
  PATH = "*",
}

const mapStr = [
  ". . . . . . x . x x",
  ". x x . x x . . . .",
  ". x . . x . . x x .",
  ". x . x . . x . . .",
  ". x . . . . x . x x",
  ". x . . . x x . . .",
  ". x x x . x . x x .",
  ". . . . . x . . . .",
  ". x . x x x . x x .",
  ". x . . p x g . . .",
];

export default function Game() {
  const [map, setMap] = useState<Map>([]);
  const [pacmanCoord, setPacmanCoord] = useState<Vector2>();
  const [ghostCoord, setGhostCoord] = useState<Vector2>();
  const [path, setPath] = useState<VertexData[]>([]);
  const [steps, setSteps] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    const i = setInterval(() => {
      handleSteps(+1);
    }, 25);
    return () => clearTimeout(i);
  }, [steps, isPlaying]);

  function handleSteps(value: number) {
    let nextValue = steps + value;
    if (nextValue < 0) nextValue = 0;
    if (nextValue > 100) nextValue = 100;
    setSteps(nextValue);
  }

  // Roda apenas na primeira vez que o componente é renderizado
  useLayoutEffect(() => {
    const data = generateMap(mapStr);
    setMap(data.map);
    setPacmanCoord(data.pacmanCoord);
    setGhostCoord(data.ghostCoord);
  }, []);

  // Sempre que o array de dependência mudar, vai rodar o bsf e gerar um mapa atualizado
  useEffect(() => {
    // Só continua se esses valores forem não nulos
    if (!ghostCoord || !pacmanCoord || !map) return;
    const data = generateMap(mapStr);
    setPath(bfs(ghostCoord, pacmanCoord, data.map, steps));
    setMap(data.map);
    console.log(path);
  }, [ghostCoord, pacmanCoord, steps]);

  renderPath(path);

  function handleNewPos(
    actor: "pacman" | "ghost",
    rowIncrement: number,
    colIncrement: number
  ) {
    const coord = actor === "pacman" ? pacmanCoord : ghostCoord;
    const newRow = coord!.row + rowIncrement;
    const colRow = coord!.col + colIncrement;
    const newPos: Vector2 = { row: coord!.row, col: coord!.col };

    if (newRow >= 0 && newRow < map.length) {
      newPos!.row = newRow;
    }

    if (colRow >= 0 && colRow < map.length) {
      newPos!.col = colRow;
    }

    if (actor === "pacman") {
      setPacmanCoord(newPos);
    } else {
      setGhostCoord(newPos);
    }
  }

  return (
    <div css={wrapper}>
      {renderPathText(path)}

      <div css={mapStyle(map.length)}>
        {map && renderMap(map)}
        {pacmanCoord && renderPacman(pacmanCoord)}
        {ghostCoord && renderGhost(ghostCoord)}
      </div>
      <div css={buttonWrapper}>
        <button
          css={button}
          onClick={() => {
            handleSteps(-1);
            setIsPlaying(false);
          }}
        >
          Voltar
        </button>
        <button
          css={button}
          onClick={() => {
            handleSteps(1);
            setIsPlaying(false);
          }}
        >
          Avançar
        </button>
        <button css={button} onClick={() => setIsPlaying(true)}>
          Play
        </button>
        <button css={button} onClick={() => window.location.reload()}>
          Reset
        </button>
      </div>

      <div css={buttonWrapper}>
        <button
          css={buttonPacman}
          onClick={() => handleNewPos("pacman", -1, 0)}
        >
          ↑
        </button>
        <button
          css={buttonPacman}
          onClick={() => handleNewPos("pacman", +1, 0)}
        >
          ↓
        </button>
        <button
          css={buttonPacman}
          onClick={() => handleNewPos("pacman", 0, -1)}
        >
          ←
        </button>
        <button
          css={buttonPacman}
          onClick={() => handleNewPos("pacman", 0, +1)}
        >
          →
        </button>
      </div>
      <div css={buttonWrapper}>
        <button css={buttonGhost} onClick={() => handleNewPos("ghost", -1, 0)}>
          ↑
        </button>
        <button css={buttonGhost} onClick={() => handleNewPos("ghost", +1, 0)}>
          ↓
        </button>
        <button css={buttonGhost} onClick={() => handleNewPos("ghost", 0, -1)}>
          ←
        </button>
        <button css={buttonGhost} onClick={() => handleNewPos("ghost", 0, +1)}>
          →
        </button>
      </div>
    </div>
  );
}

function generateMap(mapStr: string[]): {
  map: Map;
  pacmanCoord: Vector2;
  ghostCoord: Vector2;
} {
  const map: Map = [];
  let pacmanCoord: Vector2 = { row: -1, col: -1 };
  let ghostCoord: Vector2 = { row: -1, col: -1 };

  for (let rowIndex = 0; rowIndex < mapStr.length; rowIndex++) {
    const row = mapStr[rowIndex].split(" ");
    if (map[rowIndex] === undefined) map[rowIndex] = [];

    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      const char = row[colIndex];
      const vertex: VertexData = {
        coord: { col: colIndex, row: rowIndex },
        state: "unVisited",
        dist: Infinity,
      };

      if (char === " ") continue;
      if (char === EntityID.PACMAN)
        pacmanCoord = { col: colIndex, row: rowIndex };
      if (char === EntityID.GHOST)
        ghostCoord = { col: colIndex, row: rowIndex };
      if (char === EntityID.WALL) vertex.state = "disabled";

      map[rowIndex].push(vertex);
    }
  }

  return { map, pacmanCoord, ghostCoord };
}

// RENDERS =====================================================================================

function renderPathText(path: VertexData[]) {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 18px;
        gap: 2px;
      `}
    >
      {path.length > 0 &&
        path.map((e, index) => {
          return (
            <span key={index}>{`(${e.coord.col}, ${e.coord.row}) ${
              index < path.length - 1 ? "->" : ""
            }`}</span>
          );
        })}
    </div>
  );
}

function renderPath(path: VertexData[]) {
  path.forEach((v) => {
    v.state = "path";
  });
}

function renderPacman(coord: Vector2) {
  const color = gameConstants.pacman.color;
  const txtColor = gameConstants.text.darkColor;
  return (
    <Entity
      bgColor={color}
      txtColor={txtColor}
      coord={coord}
      label="Pacman"
      type="absolute"
    />
  );
}

function renderGhost(coord: Vector2) {
  const bgColor = gameConstants.ghost.color;
  const txtColor = gameConstants.text.lightColor;
  return (
    <Entity
      bgColor={bgColor}
      txtColor={txtColor}
      coord={coord}
      label="Ghost"
      type="absolute"
    />
  );
}

function renderMap(map: Map) {
  if (map.length === 0) return;
  return map.map((row, rIndex) => {
    return row.map((v, vIndex) => {
      return (
        <Vertex state={v.state} dist={v.dist} key={`${rIndex}${vIndex}`} />
      );
    });
  });
}

// STYLES =====================================================================================

const wrapper = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const mapStyle = (cols: number) => css`
  position: relative;
  display: grid;
  row-gap: ${gameConstants.grid.rowGap}px;
  column-gap: ${gameConstants.grid.colGap}px;
  grid-template-columns: repeat(${cols}, 1fr);
`;

const buttonWrapper = css`
  display: flex;
  gap: 10px;
`;

const button = css`
  min-width: 100px;
  padding: 7px 20px;
  border: none;
  border-radius: 5px;
  color: white;
  background-color: #326ddb;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const buttonPacman = css`
  ${button}
  background-color: #d5e667;
  color: black;
`;

const buttonGhost = css`
  ${button}
  background-color: #e67267;
  color: black;
`;
