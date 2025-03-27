import { Vector2 } from "./types";
import { MapTileData } from "../components/entities/Tile";
import { useRef } from "react";

type Props = {
  agentCoord: Vector2;
  targetCoord: Vector2;
  map: MapTileData[][];
  steps: number;
};

export default function BFS({ steps }: Props) {
  const currentNodeCoord = useRef<Vector2>({ x: -1, y: -1 });
  return <div>BFS</div>;
}

const directions = [
  { row: -1, col: 0 }, // cima
  { row: 0, col: -1 }, // esquerda
  { row: 1, col: 0 }, // baixo
  { row: 0, col: 1 }, // direita
];

function run(
  agentCoord: Vector2,
  targetCoord: Vector2,
  map: MapTileData[][],
  steps: number
): Vector2[] {
  const pathToTarget: Vector2[] = [];
  const queue: { node: MapTileData; path: Vector2[] }[] = [];
  let currentNode = map[agentCoord.x][agentCoord.y];
  let lastNeighbors: MapTileData[] = [];

  // Passo 0 - Setar o no do target como queued
  currentNode.state = ["queued", "notNeighbor"];
  currentNode.dist = 0;
  queue.push({ node: currentNode, path: [currentNode.coord] });

  // Próximos passos
  for (let step = 1; step <= steps; step++) {
    if (queue.length === 0) continue;

    // 1 =====================================================================================

    lastNeighbors.forEach((node) => {
      node.state = ["queued", "notNeighbor"];
    });

    currentNode.state[0] = "current";
    const newNeighbors = getNeighbors(currentNode.coord, map);
    const data = queue.shift()!;
    currentNode = data.node;
    currentNode.state = ["queued", "notNeighbor"];

    // 2 =====================================================================================

    lastNeighbors = newNeighbors;

    // neighborsNodes.forEach((node) => {
    //   const newPath = [...data.path, node.coord];
    //   node.state[1] = "neighbor";
    //   queue.push({ node: node, path: newPath });
    // });
  }
  return pathToTarget;
}

function getNeighbors(coord: Vector2, map: MapTileData[][]) {
  const neighbors: MapTileData[] = [];
  for (const dir of directions) {
    try {
      const adjacentNode = map[coord.x + dir.row][coord.y + dir.col];
      if (adjacentNode.type === "floor") {
        adjacentNode.state[1] = "neighbor";
        neighbors.push(adjacentNode);
      }
    } catch {
      continue;
    }
  }

  return neighbors;
}
