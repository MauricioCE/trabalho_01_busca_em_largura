import Node from "./Node";
import GhostTexture from "../assets/svgs/ghost.svg?react";
import { memo, useEffect } from "react";
import { useGameStore } from "../stores/mainStore";
import { handleInput } from "../common/utils";
import { KeyMap } from "../common/types";

const moveKeys: KeyMap = {
  up: "ArrowUp",
  down: "ArrowDown",
  left: "ArrowLeft",
  right: "ArrowRight",
};

function Ghost() {
  console.log("Ghost");
  const coord = useGameStore((state) => state.ghostCoord);
  const setCoord = useGameStore((state) => state.setGhostCoord);

  useEffect(() => {
    function handleEvent(e: KeyboardEvent) {
      const nextCoord = handleInput(e, moveKeys, coord);
      if (nextCoord !== coord) {
        setCoord(nextCoord);
      }
    }

    document.addEventListener("keydown", handleEvent);

    return () => {
      document.removeEventListener("keydown", handleEvent);
    };
  }, [coord, setCoord]);

  return (
    <Node coord={coord}>
      <GhostTexture />
    </Node>
  );
}

export default memo(Ghost);
