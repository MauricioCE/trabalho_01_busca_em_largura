import { ReactNode, useEffect, useLayoutEffect, useState } from "react";
import { Direction, Vector2 } from "../../common/types";
import { useGameStore } from "../../stores/mainStore";
import generateMapData from "../../common/mapHandler";
import { css } from "@emotion/react";
import Pacman from "./Pacman";
import Ghost from "./Ghost";
import Tile, { TileData } from "./Tile";
import { bfs, getMaxSteps } from "../../common/bfs";
import Text from "./Text";
import Path from "./Path";
import { directionBetween, isSamePosition } from "../../common/utils";
import { maxMapWidth } from "../../common/constants";

type Props = {
  stage: string[];
};

export type GameMap = TileData[][];

export default function Map({ stage }: Props) {
  useEffect(() => {
    const mapData = generateMapData(stage);
    useGameStore.getState().setMap(mapData.map);
    useGameStore.getState().setMapSize(mapData.size);
    useGameStore.getState().setPacmanPos(mapData.pacmanPos);
    useGameStore.getState().setGhostPos(mapData.ghostPos);
  }, [stage]);

  const map = useGameStore((state) => state.map);
  const mapSize = useGameStore((state) => state.mapSize);
  const pacmanPos = useGameStore((state) => state.pacmanPos);
  const ghostPos = useGameStore((state) => state.ghostPos);

  const [path, setPath] = useState<Vector2[]>();
  const steps = useGameStore((state) => state.steps);
  const update = useGameStore((state) => state.updateMap);
  const setMaxSteps = useGameStore((state) => state.setMaxSteps);

  // Sempre que for necessário realizar a atualização de algum componente do mapa
  useLayoutEffect(() => {
    function resetStatesAndDist() {
      if (!map) return;
      map.map((row) => {
        row.map((tile) => {
          tile.state = ["unVisited", "notNeighbor"];
          tile.dist = Infinity;
        });
      });
    }

    if (map.length === 0) return;
    resetStatesAndDist();
    setMaxSteps(getMaxSteps(ghostPos, map));
    setPath(bfs(ghostPos, pacmanPos, map, steps));
  }, [ghostPos, map, pacmanPos, setMaxSteps, steps, update]);

  // useAnimation(isPlaying, timeoutId, incrementSteps);

  return (
    <div css={wrapperStyle(maxMapWidth)}>
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${mapSize.width} ${mapSize.height}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {renderTilesLayer(map)}
        {path && renderPathLayer(path)}
        {renderTextLayer(map, pacmanPos, ghostPos)}
        {pacmanPos && <Pacman coord={pacmanPos} />}
        {ghostPos && <Ghost coord={ghostPos} />}
      </svg>
    </div>
  );
}

// RENDERS =====================================================================================

function renderTilesLayer(gameMap: GameMap) {
  return (
    <g id="tiles_layer">
      {gameMap.map((row, rowIndex) => (
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

function renderPathLayer(path: Vector2[]) {
  const list: ReactNode[] = [];

  for (let index = 1; index < path.length - 1; index++) {
    const current = path[index];
    const previous = path[index - 1];
    const next = path[index + 1];
    const directions: [Direction, Direction] = [
      directionBetween(current, previous),
      directionBetween(current, next),
    ];
    list.push(
      <Path key={index} coord={current} directions={directions}></Path>
    );
  }

  return <g id="path_layer">{list}</g>;
}

function renderTextLayer(
  map: GameMap,
  pacmanCoord: Vector2,
  ghostCoord: Vector2
) {
  return (
    <g id="text_layer">
      {map.map((row, rowIndex) => {
        return row.map((tileData, colIndex) => {
          const coord = { x: rowIndex, y: colIndex };
          let dist = Infinity;
          if (
            !isSamePosition(coord, pacmanCoord) &&
            !isSamePosition(coord, ghostCoord)
          ) {
            dist = tileData.dist;
          }
          return (
            <Text
              key={`${rowIndex}-${colIndex}`}
              coord={tileData.coord}
              dist={dist}
            />
          );
        });
      })}
    </g>
  );
}

// STYLES =====================================================================================

const wrapperStyle = (maxWidth: number) => css`
  width: 100%;
  max-width: ${maxWidth}px;
  background-color: #395fdd;
`;

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
