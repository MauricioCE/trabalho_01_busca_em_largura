import { gameConstants } from "../utils/constants";
import { css } from "@emotion/react";
import { Vector2, Size } from "../utils/types";

export type NodeProps = {
  pos: Vector2;
  bgColor: string;
  className?: string;
  txtColor?: string;
  label: string;
  size: Size;
};

const size = gameConstants.pacman.size;

export default function Node({
  pos: position,
  bgColor: backgroundColor,
  txtColor: textColor = "#000",
  label,
  size,
  ...rest
}: NodeProps) {
  return (
    <g>
      <text>{label}</text>
      <rect
        css={style(backgroundColor, textColor)}
        x={position.x}
        y={position.y}
        width={size.width}
        height={size.height}
        fill="lightblue"
        stroke="black"
        strokeWidth="2"
        {...rest}
      />
    </g>
  );
}

const style = (bgColor: string, txtColor: string) => css`
  color: ${txtColor};
  font-size: 11px;
  font-weight: 100;
`;
