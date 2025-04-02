import Node from "./Node";
import GhostTexture from "../../assets/svgs/ghost.svg?react";
import { memo, useEffect, useState } from "react";
import { useGameStore } from "../../stores/mainStore";
import { MovementKeys, Vector2 } from "../../common/types";
import { handleMovement } from "../../common/utils";

const moveKeys: MovementKeys = {
  up: "ArrowUp",
  down: "ArrowDown",
  left: "ArrowLeft",
  right: "ArrowRight",
};

function Ghost({ coord: coordProp }: { coord: Vector2 }) {
  const [coord, setCoord] = useState<Vector2>(coordProp);
  const setStoreCoord = useGameStore((state) => state.setGhostCoord);

  useEffect(() => {
    function handleEvent(e: KeyboardEvent) {
      const nextCoord = handleMovement(e.key, moveKeys, coord);
      if (nextCoord !== coord) {
        setCoord(nextCoord);
        setStoreCoord(nextCoord);
      }
    }

    document.addEventListener("keydown", handleEvent);

    return () => {
      document.removeEventListener("keydown", handleEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coord]);

  return (
    <Node coord={coord}>
      <GhostTexture />
    </Node>
  );
}

export default memo(Ghost);
