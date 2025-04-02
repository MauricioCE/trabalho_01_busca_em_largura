import { css } from "@emotion/react";
import { Vector2 } from "../../common/types";
import { coordinateToPosition } from "../../common/utils";

type Props = {
  coord: Vector2;
  dist: number;
};

export default function Text({ coord, dist }: Props) {
  const text = dist === Infinity ? "" : dist;
  const position = coordinateToPosition(coord);
  return (
    <g transform={`translate(${position.x}, ${position.y})`}>
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
    </g>
  );
}

const textStyle = css`
  font-size: 24px;
  color: "#027051";
  pointer-events: none;
`;
