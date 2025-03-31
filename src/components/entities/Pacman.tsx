import Node, { NodeProps } from "./Node";
import PacmanTexture from "../../assets/svgs/pacman.svg?react";
import { useEffect } from "react";
import { useGameStore } from "../../stores/mainStore";
import { clamp } from "../../common/utils";

export default function Pacman({ coord }: NodeProps) {
  const setPacmanCoord = useGameStore((state) => state.setPacmanPos);
  const mapSize = useGameStore((state) => state.mapSize);

  useEffect(() => {
    function handleKeyUp(e: KeyboardEvent) {
      let xIncrement = 0;
      let yIncrement = 0;

      switch (e.key) {
        case "w":
          xIncrement = -1;
          break;
        case "s":
          xIncrement = 1;
          break;
        case "a":
          yIncrement = -1;
          break;
        case "d":
          yIncrement = 1;
          break;
      }

      const newX = clamp(coord.x + xIncrement, 0, mapSize.width);
      const newY = clamp(coord.y + yIncrement, 0, mapSize.height);

      setPacmanCoord({ x: newX, y: newY });
      console.log({ x: newX, y: newY });
    }
    document.addEventListener("keyup", handleKeyUp);

    return () => document.removeEventListener("keyup", handleKeyUp);
  }, [coord, mapSize, setPacmanCoord]);

  return (
    <Node coord={coord}>
      <PacmanTexture />
    </Node>
  );
}
