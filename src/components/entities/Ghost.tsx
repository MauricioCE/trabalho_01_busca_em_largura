import Node, { NodeProps } from "./Node";
import GhostTexture from "../../assets/svgs/ghost.svg?react";
import { useEffect } from "react";
import { useGameStore } from "../../stores/mainStore";
import { clamp, positionToCoordinate } from "../../common/utils";

export default function Ghost({ coord }: NodeProps) {
  const setPos = useGameStore((state) => state.setGhostPos);
  const mapSize = useGameStore((state) => state.mapSize);
  const maxSize = positionToCoordinate({
    x: mapSize.width,
    y: mapSize.height,
  });

  useEffect(() => {
    function handleKeyUp(e: KeyboardEvent) {
      let xIncrement = 0;
      let yIncrement = 0;
      console.log(e.key);

      switch (e.key) {
        case "ArrowUp":
          xIncrement = -1;
          break;
        case "ArrowDown":
          xIncrement = 1;
          break;
        case "ArrowLeft":
          yIncrement = -1;
          break;
        case "ArrowRight":
          yIncrement = 1;
          break;
      }

      const newX = clamp(coord.x + xIncrement, 0, maxSize.x);
      const newY = clamp(coord.y + yIncrement, 0, maxSize.y);

      setPos({ x: newX, y: newY });
    }
    document.addEventListener("keyup", handleKeyUp);

    return () => document.removeEventListener("keyup", handleKeyUp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coord, mapSize, setPos]);

  return (
    <Node coord={coord}>
      <GhostTexture />
    </Node>
  );
}
