import { Vector2 } from "./types";
import { MapTileData } from "../components/entities/Tile";
import { Math } from "./math";

const directions = [
  { x: -1, y: 0 }, // cima
  { x: 0, y: -1 }, // esquerda
  { x: 1, y: 0 }, // baixo
  { x: 0, y: 1 }, // direita
];

export default class BFS {
  // Roda o BFS de maneira direta (sem os passos de setar estados)e completa
  // (até que todos os tiles sejam visitados), retornando no final a quantidade
  // de passos necessários
  getMaxSteps(agentCoord: Vector2, map: MapTileData[][]): number {
    const queue: Vector2[] = [];
    const visited: Vector2[] = [];
    let currentCoord = agentCoord;
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
    return Math.clamp(count, 0, count);
  }

  // BFS completa
  run(
    agentCoord: Vector2,
    targetCoord: Vector2,
    map: MapTileData[][],
    steps: number
  ): Vector2[] {
    const pathToTarget: Vector2[] = [];
    const queue: { tile: MapTileData; path: Vector2[] }[] = [];
    let currentTile = map[agentCoord.x][agentCoord.y];
    let neighbors: MapTileData[] = [];
    let dist = 0;

    // Passo 0 - Setar o tile do target como queued
    currentTile.state = ["queued", "notNeighbor"];
    currentTile.dist = dist++;
    queue.push({ tile: currentTile, path: [currentTile.coord] });

    // Próximos passos
    for (let step = 1; step <= steps; step++) {
      // A primeira coisa a ser feita é mudar o estado dos vizinhos do passo anterior
      neighbors.forEach((tile) => {
        // Setar o estado[0] para "queued" apenas dos tiles que nunca foram visitados
        if (tile.state[0] === "unVisited") {
          tile.state[0] = "queued";
        }
        tile.state[1] = "notNeighbor";
      });

      // Antes de mudar o tile atual, mudar o estado do último atual, pois ele já foi visitado
      currentTile.state = ["visited", "notNeighbor"];

      // Continuar apenas se existirem elementos na fila
      if (queue.length === 0) continue;
      const data = queue.shift()!;
      currentTile = data.tile;
      currentTile.state = ["current", "notNeighbor"];
      neighbors = this.getNeighbors(currentTile.coord, map);
      neighbors.forEach((tile) => {
        const newPath = [...data.path, tile.coord];
        tile.state[1] = "neighbor";
        if (tile.state[0] === "unVisited") {
          queue.push({ tile: tile, path: newPath });
          tile.dist = dist++;
        }
      });

      if (currentTile.coord === targetCoord) {
        pathToTarget.push(...data.path);
      }
    }
    return pathToTarget;
  }

  // Retorna todos os tiles vizinho da coord
  getNeighbors(coord: Vector2, map: MapTileData[][]) {
    const neighbors: MapTileData[] = [];
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
}
