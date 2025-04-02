import { memo, useEffect } from "react";
import { useGameStore } from "../../stores/mainStore";
import { Vector2 } from "../../common/types";
import { directions } from "../../common/constants";
import { clamp, isSamePosition } from "../../common/utils";
import { TileData } from "./Tile";
import { GameMap } from "./Map";

function BFS() {
  const map = useGameStore((state) => state.map);
  const pacmanCoord = useGameStore((state) => state.pacmanCoord);
  const ghostCoord = useGameStore((state) => state.ghostCoord);
  const steps = useGameStore((state) => state.steps);
  const setMaxSteps = useGameStore((state) => state.setMaxSteps);
  const update = useGameStore((state) => state.updateMap);

  useEffect(() => {
    setMaxSteps(getMaxSteps(ghostCoord, map));
    bfs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pacmanCoord, ghostCoord, steps, update]);

  return null;
}

export default memo(BFS);

function bfs() {
  const map = useGameStore.getState().map;
  const setMap = useGameStore.getState().setMap;
  const targetCoord = useGameStore.getState().pacmanCoord;
  const agentCoord = useGameStore.getState().ghostCoord;
  const steps = useGameStore.getState().steps;
  const setPath = useGameStore.getState().setPath;

  if (map.length === 0) return { map: map, path: [] };

  // Resetando o state e dist dos tiles para o default
  map.map((row) => {
    row.map((tile) => {
      tile.state = ["unVisited", "notNeighbor"];
      tile.dist = Infinity;
    });
  });

  const pathToTarget: Vector2[] = [];
  const queue: { tile: TileData; path: Vector2[] }[] = [];
  let currentTile = map[agentCoord.x][agentCoord.y];
  let neighbors: TileData[] = [];
  let dist = 0;

  // Passo 0 - Setar o tile do target como queued
  currentTile.state = ["queued", "notNeighbor"];
  currentTile.dist = dist++;
  queue.push({ tile: currentTile, path: [currentTile.coord] });

  // Próximos passos
  for (let step = 1; step <= steps; step++) {
    currentTile.state = ["visited", "notNeighbor"];

    neighbors.forEach((tile) => {
      if (tile.state[0] === "unVisited") {
        tile.state[0] = "queued";
      }
      tile.state[1] = "notNeighbor";
    });

    if (queue.length === 0) continue;
    const data = queue.shift()!;
    currentTile = data.tile;
    currentTile.state = ["current", "notNeighbor"];
    neighbors = getNeighbors(currentTile.coord, map);
    neighbors.forEach((tile) => {
      const newPath = [...data.path, tile.coord];
      tile.state[1] = "neighbor";
      if (tile.state[0] === "unVisited") {
        queue.push({ tile: tile, path: newPath });
        tile.dist = dist++;
      }
    });

    if (isSamePosition(currentTile.coord, targetCoord)) {
      pathToTarget.push(...data.path);
    }
  }
  setPath(pathToTarget);
  setMap([...map]);
}

function getMaxSteps(coord: Vector2, map: GameMap): number {
  let currentCoord = coord;
  const queue: Vector2[] = [];
  const visited: Vector2[] = [];
  let count = 1;

  queue.push(currentCoord);
  visited.push(currentCoord);

  while (queue.length > 0) {
    count++;
    currentCoord = queue.shift()!;

    for (const dir of directions) {
      const neighborCoord = {
        x: currentCoord.x + dir.x,
        y: currentCoord.y + dir.y,
      };

      try {
        if (
          map[neighborCoord.x][neighborCoord.y].type === "floor" &&
          !visited.some(
            (coord) =>
              coord.x === neighborCoord.x && coord.y === neighborCoord.y
          )
        ) {
          queue.push(neighborCoord);
          visited.push(neighborCoord);
        }
      } catch {
        continue;
      }
    }
  }
  return clamp(count, 0, count);
}

function getNeighbors(coord: Vector2, map: GameMap): TileData[] {
  const neighbors: TileData[] = [];
  for (const dir of directions) {
    try {
      const adjacentTile = map[coord.x + dir.x][coord.y + dir.y];
      if (adjacentTile.type === "floor") {
        adjacentTile.state[1] = "neighbor";
        neighbors.push(adjacentTile);
      }
    } catch {
      continue;
    }
  }

  return neighbors;
}
