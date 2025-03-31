import { GameMap } from "../components/entities/Map.tsx";
import { TileData } from "../components/entities/Tile.tsx";
import { directions, tileGap, tileSize } from "./constants.ts";
import { Size, Vector2 } from "./types.ts";

export type GameMapData = {
  map: GameMap;
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

export default function generateMapData(stage: string[]): GameMapData {
  const map: TileData[][] = [];
  const mapHeight = stage.length;
  let pacmanCoord: Vector2 = { x: -1, y: -1 };
  let ghostCoord: Vector2 = { x: -1, y: -1 };
  let mapWidth = 0;

  stage.forEach((rowStr, rowIndex) => {
    const row = rowStr.split(" ");

    if (row.length > mapWidth) mapWidth = row.length;
    if (map[rowIndex] === undefined) map[rowIndex] = [];

    row.forEach((char, colIndex) => {
      const coord = { x: rowIndex, y: colIndex };
      char = char.toLowerCase();

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
    });
  });

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

export function getNeighbors(coord: Vector2, map: GameMap) {
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
