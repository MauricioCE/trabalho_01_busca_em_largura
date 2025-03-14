import { gameConstants } from "../utils/constants";
import { Vector2 } from "../utils/types";
import { css } from "@emotion/react";
import Node, { NodeProps } from "./BaseNode";

type Props = NodeProps & { coord: Vector2 };

const size = gameConstants.pacman.size;
const gap = gameConstants.grid.colGap;

export default function Entity({
  bgColor: color,
  txtColor = "#000",
  coord,
  label,
}: Props) {
  const offset = gap + size;
  const pos = { row: coord.row * offset, col: coord.col * offset };
  const bgColor = color;
  return (
    <Node
      bgColor={bgColor}
      label={label}
      additionalStyle={style(pos)}
      txtColor={txtColor}
      type="absolute"
    />
  );
}

const style = (pos: Vector2) => css`
  transform: translate(${pos.col}px, ${pos.row}px);
`;
