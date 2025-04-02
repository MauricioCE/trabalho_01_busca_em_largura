import { Vector2 } from "./types";
import { TileData } from "../components/Tile";
import { clamp, isSamePosition } from "./utils";
import { directions } from "./constants";
import { getNeighbors } from "./mapHandler";
import { GameMap } from "../components/Map";
import { useGameStore } from "../stores/mainStore";

// Roda o BFS de maneira direta (sem os passos de setar estados)e completa
// (até que todos os tiles sejam visitados), retornando no final a quantidade
// de passos necessários
export function getMaxSteps(coord: Vector2, map: GameMap) {
  const queue: Vector2[] = [];
  const visited: Vector2[] = [];
  let currentCoord = coord;
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

// BFS completa, com todos os passos e controlada pela quantidade de steps
export function bfs() {
  const map = useGameStore.getState().map;
  const setMap = useGameStore.getState().setMap;
  const targetCoord = useGameStore.getState().pacmanCoord;
  const agentCoord = useGameStore.getState().ghostCoord;
  const steps = useGameStore.getState().steps;
  const setPath = useGameStore.getState().setPath;

  if (map.length === 0) return { map: map, path: [] };

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
      setPath([...data.path]);
    }
  }
  setMap([...map]);
}
