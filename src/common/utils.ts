import { useGameStore } from "../stores/mainStore";
import { tileGap, tileSize } from "./constants";
import { Direction, MovementKeys, Vector2 } from "./types";

// Limita um valor entre um valor mínimo e um máximo
export function clamp(value: number, min: number, max: number): number {
  return value < min ? min : value > max ? max : value;
}
// Diz se dois Vector2 são iguais
export function isSamePosition(posA: Vector2, posB: Vector2) {
  return posA.x === posB.x && posA.y === posB.y;
}
// Converte uma posição no mapa para coordenadas que podem ser usadas na matriz
// que TileData[][] que representa o mapa do jogo
export function positionToCoordinate(pos: Vector2) {
  return {
    x: Math.floor(pos.x / (tileSize + tileGap)),
    y: Math.floor(pos.y / (tileSize + tileGap)),
  };
}
// Converte uma coordenada usada na matriz de dados do mapa para uma posição
// de renderização no Map
export function coordinateToPosition(coord: Vector2) {
  return {
    x: tileSize * coord.x + coord.x * tileGap,
    y: tileSize * coord.y + coord.y * tileGap,
  };
}
// Retorna uma string que representa a direção que o target está da coordenada informada
export function directionBetween(
  coord: Vector2,
  targetCoord: Vector2
): Direction {
  if (coord.x - targetCoord.x > 0) return "left";
  if (coord.x - targetCoord.x < 0) return "right";
  if (coord.y - targetCoord.y > 0) return "up";
  return "down";
}
// Dada uma teclada pressionada, as chaves que representam um movimento e sua coordenada atual,
// retorna a próxima coordenada válida, ou seja, que não seja a mesma que um muro no mapa do jogo
export function handleMovement(
  pressedKey: string,
  keys: MovementKeys,
  currentCoord: Vector2
) {
  const map = useGameStore.getState().map;
  let xIncrement = 0;
  let yIncrement = 0;

  switch (pressedKey) {
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

  if (xIncrement === 0 && yIncrement === 0) return currentCoord;

  const newX = currentCoord.x + xIncrement;
  const newY = currentCoord.y + yIncrement;

  if (newX >= 0 && newY >= 0 && newX < map.length && newY < map[0].length) {
    if (map[newX][newY].type === "floor") {
      return { x: newX, y: newY };
    }
  }
  return currentCoord;
}
