import { memo, ReactNode } from "react";
import { Direction, Vector2 } from "../../../common/types";
import { directionBetween } from "../../../common/utils";
import { useGameStore } from "../../../stores/mainStore";
import Path from "../Path";

function PathLayer() {
  const path = useGameStore((state) => state.path);

  return <g id="path_layer">{renderPath(path)}</g>;
}

function renderPath(path: Vector2[]) {
  const list: ReactNode[] = [];

  for (let index = 1; index < path.length - 1; index++) {
    const current = path[index];
    const previous = path[index - 1];
    const next = path[index + 1];
    const directions: [Direction, Direction] = [
      directionBetween(current, previous),
      directionBetween(current, next),
    ];
    list.push(
      <Path key={index} coord={current} directions={directions}></Path>
    );
  }
  return list;
}

export default memo(PathLayer);
