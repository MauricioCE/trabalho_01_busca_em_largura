import Node from "./Node";
import PacmanTexture from "../assets/svgs/pacman.svg?react";
import { memo, useEffect } from "react";
import { useGameStore } from "../stores/mainStore";
import { KeyMap } from "../common/types";
import { handleInput } from "../common/utils";

const moveKeys: KeyMap = { up: "w", down: "s", left: "a", right: "d" };

function Pacman() {
  console.log("Pacman");
  const coord = useGameStore((state) => state.pacmanCoord);
  const setCoord = useGameStore((state) => state.setPacmanCoord);

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
      <PacmanTexture />
    </Node>
  );
}

export default memo(Pacman);
