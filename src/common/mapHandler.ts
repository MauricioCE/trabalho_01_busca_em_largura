import { GameMap } from "../components/Map.tsx";
import { TileData } from "../components/Tile.tsx";
import { directions, tileGap, tileSize } from "./constants.ts";
import { Size, Vector2 } from "./types.ts";

export type GameMapData = {
  map: GameMap;
  size: Size;
  pacmanCoord: Vector2;
  ghostCoord: Vector2;
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

    row.forEach((char, colIndex) => {
      if (map[colIndex] === undefined) map[colIndex] = [];
      const coord = { x: colIndex, y: rowIndex };
      char = char.toLowerCase();

      if (char === EntityID.PACMAN) {
        pacmanCoord = coord;
      } else if (char === EntityID.GHOST) {
        ghostCoord = coord;
      }

      map[colIndex].push({
        state: ["unVisited", "notNeighbor"],
        type: char === EntityID.WALL ? "wall" : "floor",
        coord: { x: colIndex, y: rowIndex },
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
    pacmanCoord: pacmanCoord,
    ghostCoord: ghostCoord,
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
