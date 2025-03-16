import { useState } from "react";
import Floor, { FloorProps } from "./Floor";
import Node, { NodeProps } from "../Node";
import Wall from "./Wall";
import { css } from "@emotion/react";

export type MapNodeProps = {
  type?: Type;
} & FloorProps &
  NodeProps;

type Type = "floor" | "wall";

export default function MapNode({
  dist,
  pos,
  state,
  type: typeProp = "floor",
  ...rest
}: MapNodeProps) {
  const [type, setType] = useState<Type>(typeProp);

  function handleClick() {
    setType(type === "floor" ? "wall" : "floor");
  }

  return (
    <Node css={style} pos={pos} onClick={handleClick} {...rest}>
      {type === "floor" ? <Floor dist={dist} state={state} /> : <Wall />}
    </Node>
  );
}

const style = css`
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
