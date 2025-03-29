import { tileGap, tileSize } from "./constants";
import { Vector2 } from "./types";

export function isSamePosition(posA: Vector2, posB: Vector2) {
  return posA.x === posB.x && posA.y === posB.y;
}

export function positionToCoordinate(pos: Vector2) {
  return {
    x: pos.y / tileSize,
    y: pos.x / tileSize,
  };
}

export function coordinateToPosition(coord: Vector2) {
  return {
    x: tileSize * coord.y + coord.y * tileGap,
    y: tileSize * coord.x + coord.x * tileGap,
  };
}
