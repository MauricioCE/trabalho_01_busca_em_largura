import { Map, VertexData } from "../components/Game";
import { Vector2 } from "./types";

const directions = [
  { row: -1, col: 0 }, // cima
  { row: 0, col: 1 }, // direita
  { row: 1, col: 0 }, // baixo
  { row: 0, col: -1 }, // esquerda
];

export default function bfs(
  coord: Vector2,
  targetCoord: Vector2,
  map: Map,
  steps: number
): VertexData[] {
  const queue: { vertex: VertexData; path: VertexData[] }[] = [];
  let vertex = map[coord.row][coord.col];
  let pathToTarget: VertexData[] = [];

  queue.push({ vertex: vertex, path: [vertex] });
  vertex.state = "queued";
  vertex.dist = 0;

  for (let step = 0; step < steps; step++) {
    if (queue.length === 0) continue;

    let adj: VertexData;
    const data = queue.shift()!;
    vertex = data.vertex;

    for (const dir of directions) {
      try {
        adj = map[vertex.coord!.row + dir.row][vertex.coord!.col + dir.col];
        if (adj.state === "unVisited") {
          const newPath = [...data.path, adj];
          adj.state = "queued";
          adj.dist = vertex.dist! + 1;
          adj.parent = vertex;
          queue.push({ vertex: adj, path: newPath });

          if (isSamePosition(adj.coord!, targetCoord)) {
            pathToTarget = newPath;
          }
        }
      } catch {
        continue;
      }
    }
    vertex.state = "visited";
  }
  return pathToTarget;
}

function isSamePosition(posOne: Vector2, posTwo: Vector2) {
  return posOne.row === posTwo.row && posOne.col === posTwo.col;
}
