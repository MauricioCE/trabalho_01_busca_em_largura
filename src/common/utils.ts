import { tileGap, tileSize } from "./constants";
import { Direction, Vector2 } from "./types";

export function clamp(value: number, min: number, max: number): number {
  return value < min ? min : value > max ? max : value;
}

export function isSamePosition(posA: Vector2, posB: Vector2) {
  return posA.x === posB.x && posA.y === posB.y;
}

export function positionToCoordinate(pos: Vector2) {
  return {
    x: Math.floor(pos.y / (tileSize + tileGap)),
    y: Math.floor(pos.x / (tileSize + tileGap)),
  };
}

export function coordinateToPosition(coord: Vector2) {
  return {
    x: tileSize * coord.y + coord.y * tileGap,
    y: tileSize * coord.x + coord.x * tileGap,
  };
}

export function directionBetween(
  coord: Vector2,
  targetCoord: Vector2
): Direction {
  if (coord.x - targetCoord.x > 0) return "up";
  if (coord.x - targetCoord.x < 0) return "down";
  if (coord.y - targetCoord.y > 0) return "left";
  return "right";
}
