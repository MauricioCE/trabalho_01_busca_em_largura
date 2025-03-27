import Node, { NodeProps } from "./Node";
import GhostTexture from "../../assets/svgs/ghost.svg?react";

export default function Ghost({ coord }: NodeProps) {
  return (
    <Node coord={coord}>
      <GhostTexture />
    </Node>
  );
}
