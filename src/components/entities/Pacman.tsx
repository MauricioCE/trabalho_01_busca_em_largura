import Node, { NodeProps } from "./Node";
import PacmanTexture from "../../assets/svgs/pacman.svg?react";

export default function Pacman({ coord }: NodeProps) {
  return (
    <Node coord={coord}>
      <PacmanTexture />
    </Node>
  );
}
