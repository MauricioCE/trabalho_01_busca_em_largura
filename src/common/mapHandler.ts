import { TileData } from "../components/entities/Tile.tsx";
import { directions, tileGap, tileSize } from "./constants.ts";
import { MapTiles, Size, Vector2 } from "./types.ts";

export type MapData = {
  map: TileData[][];
  size: Size;
  pacmanPos: Vector2;
  ghostPos: Vector2;
};

enum EntityID {
  FLOOR = ".",
  GHOST = "g",
  PACMAN = "p",
  WALL = "x",
}

export default function generateMapData(stage: string[]): MapData {
  const map: TileData[][] = [];
  const mapHeight = stage.length;
  let pacmanCoord: Vector2 = { x: -1, y: -1 };
  let ghostCoord: Vector2 = { x: -1, y: -1 };
  let mapWidth = 0;

  for (let rowIndex = 0; rowIndex < stage.length; rowIndex++) {
    const row = stage[rowIndex].split(" ");
    if (row.length > mapWidth) mapWidth = row.length;
    if (map[rowIndex] === undefined) map[rowIndex] = [];

    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      const coord = { x: rowIndex, y: colIndex };
      const char = row[colIndex].toLowerCase();

      if (char === EntityID.PACMAN) {
        pacmanCoord = coord;
      } else if (char === EntityID.GHOST) {
        ghostCoord = coord;
      }

      map[rowIndex].push({
        state: ["unVisited", "notNeighbor"],
        type: char === EntityID.WALL ? "wall" : "floor",
        coord: { x: rowIndex, y: colIndex },
        dist: Infinity,
      });
    }
  }
  return {
    map: map,
    size: {
      width: mapWidth * tileSize + mapWidth * tileGap,
      height: mapHeight * tileSize + mapHeight * tileGap,
    },
    pacmanPos: pacmanCoord,
    ghostPos: ghostCoord,
  };
}

export function getNeighbors(coord: Vector2, map: MapTiles) {
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

/*
import { TileData } from "../components/entities/Tile.tsx";
import { useGameStore } from "../stores/mainStore.ts";
import { directions, tileGap, tileSize } from "./constants.ts";
import { MapTiles, Vector2 } from "./types.ts";

export type MapData = {
  map: TileData[][];
  width: number;
  height: number;
};

enum EntityID {
  FLOOR = ".",
  GHOST = "g",
  PACMAN = "p",
  WALL = "x",
}

// Recupera informações referente ao mapa e posições de componentes contidos dentro da codificação
// do array de string que representa um mapa
export default function generateMapData(stage: string[]) {
  const gameState = useGameStore.getState();
  const map: TileData[][] = [];
  const mapHeight = stage.length;
  let mapWidth = 0;

  for (let rowIndex = 0; rowIndex < stage.length; rowIndex++) {
    const row = stage[rowIndex].split(" ");
    if (row.length > mapWidth) mapWidth = row.length;
    if (map[rowIndex] === undefined) map[rowIndex] = [];

    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      const coord = { x: rowIndex, y: colIndex };
      const char = row[colIndex].toLowerCase();

      if (char === EntityID.PACMAN) {
        gameState.setPacmanPos(coord);
      } else if (char === EntityID.GHOST) {
        gameState.setGhostPos(coord);
      }

      map[rowIndex].push({
        state: ["unVisited", "notNeighbor"],
        type: char === EntityID.WALL ? "wall" : "floor",
        coord: { x: rowIndex, y: colIndex },
        dist: Infinity,
      });
    }
    gameState.setMap(map);
    gameState.setMapSize({
      width: mapWidth * tileSize + mapWidth * tileGap,
      height: mapHeight * tileSize + mapHeight * tileGap,
    });
  }
}

// Retorna uma lista com os vizinhos válidos de um Tile
export function getNeighbors(coord: Vector2, map: MapTiles) {
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
*/
