import { css } from "@emotion/react";
import { Vector2 } from "../common/types";
import Node from "./Node";

type Props = {
  coord: Vector2;
  dist: number;
};

export default function Text({ coord, dist }: Props) {
  const text = dist === Infinity ? "" : dist;
  return (
    <Node coord={coord}>
      <rect width="64" height="64" fill="none" />
      <text
        css={textStyle}
        x="32"
        y="32"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#027051"
      >
        {text}
      </text>
    </Node>
  );
}

const textStyle = css`
  font-size: 24px;
  color: "#027051";
  pointer-events: none;
`;
