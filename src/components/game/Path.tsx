import { Direction, Vector2 } from "../../common/types";
import UpDownTexture from "../../assets/svgs/path/path_up_down.svg?react";
import LeftRightTexture from "../../assets/svgs/path/path_left_right.svg?react";
import LeftDownTexture from "../../assets/svgs/path/path_left_down.svg?react";
import LeftUpTexture from "../../assets/svgs/path/path_left_up.svg?react";
import RightDownTexture from "../../assets/svgs/path/path_right_down.svg?react";
import RightUpTexture from "../../assets/svgs/path/path_right_up.svg?react";
import Node from "./Node";
import { css } from "@emotion/react";

type Props = {
  coord: Vector2;
  directions: [Direction, Direction];
};

export default function Path({ coord, directions }: Props) {
  return (
    <Node css={style} coord={coord}>
      {getTexture(directions)}
    </Node>
  );
}

function getTexture(directions: [Direction, Direction]) {
  if (
    (directions[0] === "up" && directions[1] === "down") ||
    (directions[0] === "down" && directions[1] === "up")
  )
    return <UpDownTexture />;

  if (
    (directions[0] === "left" && directions[1] === "right") ||
    (directions[0] === "right" && directions[1] === "left")
  )
    return <LeftRightTexture />;

  if (
    (directions[0] === "left" && directions[1] === "up") ||
    (directions[0] === "up" && directions[1] === "left")
  )
    return <LeftUpTexture />;

  if (
    (directions[0] === "left" && directions[1] === "down") ||
    (directions[0] === "down" && directions[1] === "left")
  )
    return <LeftDownTexture />;

  if (
    (directions[0] === "right" && directions[1] === "down") ||
    (directions[0] === "down" && directions[1] === "right")
  )
    return <RightDownTexture />;

  if (
    (directions[0] === "right" && directions[1] === "up") ||
    (directions[0] === "up" && directions[1] === "right")
  )
    return <RightUpTexture />;
}

const style = css`
  pointer-events: none;
`;
