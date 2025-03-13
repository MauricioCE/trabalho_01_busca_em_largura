import { css } from "@emotion/react";
import { gameConstants } from "../utils/constants";
import Node from "./Node";

export type VertexProps = {
  dist: number;
  state: "visited" | "unVisited" | "queued" | "disabled" | "path";
};

const colors = gameConstants.vertex.colors;

export default function Vertex({
  dist = Infinity,
  state = "unVisited",
}: VertexProps) {
  const bgColor = colors[state];
  const text = state === "disabled" ? "" : dist === Infinity ? "∞" : `${dist}`;

  return (
    <Node
      bgColor={bgColor}
      txtColor={"#626466"}
      label={text}
      additionalStyle={style}
      type="static"
    ></Node>
  );
}

const style = css`
  position: static;
  transform: translate(0px, 0px);
  font-size: 16px;
`;
