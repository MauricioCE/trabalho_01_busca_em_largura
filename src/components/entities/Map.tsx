import { useLayoutEffect, useMemo, useState } from "react";
import { Vector2 } from "../../common/types";
import { useGameStore } from "../../stores/mainStore";
import Node from "./Node";
import generateMapData from "../../common/mapHandler";
import { bfs, getMaxSteps } from "../../common/BFS";
import { css } from "@emotion/react";
import Pacman from "./Pacman";
import Ghost from "./Ghost";
import Tile, { TileData } from "./Tile";

type Props = {
  stage: string[];
};

export default function Map({ stage }: Props) {
  const mapData = useMemo(() => {
    return generateMapData(stage);
  }, [stage]);

  const [path, setPath] = useState<Vector2[]>();
  // const timeoutId = useRef(-1);
  // const isPlaying = useRef(false);

  const pacmanPos = useGameStore((state) => state.pacmanPos);
  const ghostPos = useGameStore((state) => state.ghostPos);
  const steps = useGameStore((state) => state.steps);
  const map = useGameStore((state) => state.mapTilesData);
  const mapSize = useGameStore((state) => state.mapSize);
  const update = useGameStore((state) => state.updateMap);

  const setPacmanPos = useGameStore((state) => state.setPacmanPos);
  const setGhostPos = useGameStore((state) => state.setGhostPos);
  const setMap = useGameStore((state) => state.setMapTilesData);
  const setMapSize = useGameStore((state) => state.setMapSize);

  setPacmanPos(mapData.pacmanPos);
  setGhostPos(mapData.ghostPos);
  setMap(mapData.map);
  setMapSize(mapData.size);

  // Sempre que for necessário realizar a atualização de algum componente do mapa
  useLayoutEffect(() => {
    // Reseta todos os estados dos tiles
    function resetTilesStates() {
      if (!map) return;
      map.map((row) => {
        row.map((tile) => {
          tile.state = ["unVisited", "notNeighbor"];
        });
      });
    }

    if (map.length === 0) return;
    resetTilesStates();
    getMaxSteps(ghostPos, map);
    setPath(bfs(ghostPos, pacmanPos, map, steps));
  }, [ghostPos, map, pacmanPos, steps, update]);

  // useAnimation(isPlaying, timeoutId, incrementSteps);

  return (
    <div css={wrapperStyle}>
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${mapSize.width} ${mapSize.height}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {renderTiles(map)}
        {path && renderPath(path)}
        {pacmanPos && <Pacman coord={pacmanPos} />}
        {ghostPos && <Ghost coord={ghostPos} />}
      </svg>
    </div>
  );
}

// RENDERS =====================================================================================

function renderTiles(map: TileData[][]) {
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
            />
          ))}
        </g>
      ))}
    </g>
  );
}

function renderPath(path: Vector2[]) {
  return path.map((coord) => {
    return (
      <Node coord={coord}>
        <circle
          x={19}
          y={19}
          width="26"
          height="26"
          cx="32"
          cy="32"
          r="20"
          fill="#D9D9D9"
        />
      </Node>
    );
  });
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

// STYLES =====================================================================================

const wrapperStyle = css`
  width: 100%;
  max-width: 700px;
`;
