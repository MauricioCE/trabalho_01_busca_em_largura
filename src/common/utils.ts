import { useGameStore } from "../stores/mainStore";
import { tileGap, tileSize } from "./constants";
import { Direction, KeyMap, Vector2 } from "./types";

export function clamp(value: number, min: number, max: number): number {
  return value < min ? min : value > max ? max : value;
}

export function isSamePosition(posA: Vector2, posB: Vector2) {
  return posA.x === posB.x && posA.y === posB.y;
}

export function positionToCoordinate(pos: Vector2) {
  return {
    x: Math.floor(pos.x / (tileSize + tileGap)),
    y: Math.floor(pos.y / (tileSize + tileGap)),
  };
}

export function coordinateToPosition(coord: Vector2) {
  return {
    x: tileSize * coord.x + coord.x * tileGap,
    y: tileSize * coord.y + coord.y * tileGap,
  };
}

export function directionBetween(
  coord: Vector2,
  targetCoord: Vector2
): Direction {
  if (coord.x - targetCoord.x > 0) return "left";
  if (coord.x - targetCoord.x < 0) return "right";
  if (coord.y - targetCoord.y > 0) return "up";
  return "down";
}

export function handleInput(e: KeyboardEvent, keys: KeyMap, coord: Vector2) {
  const map = useGameStore.getState().map;
  let xIncrement = 0;
  let yIncrement = 0;

  switch (e.key) {
    case keys.up:
      yIncrement = -1;
      break;
    case keys.down:
      yIncrement = 1;
      break;
    case keys.left:
      xIncrement = -1;
      break;
    case keys.right:
      xIncrement = 1;
      break;
  }

  if (xIncrement === 0 && yIncrement === 0) return coord;

  const newX = coord.x + xIncrement;
  const newY = coord.y + yIncrement;

  if (newX >= 0 && newY >= 0 && newX < map.length && newY < map[0].length) {
    if (map[newX][newY].type === "floor") {
      return { x: newX, y: newY };
    }
  }
  return coord;
}
