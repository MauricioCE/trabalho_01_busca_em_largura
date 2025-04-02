import { Vector2 } from "../common/types";
import { coordinateToPosition } from "../common/utils";

export type MetaData = {
  [key: string]: string;
};

export type NodeProps = {
  children?: React.ReactNode;
  className?: string;
  coord: Vector2;
  onClick?: (e: React.MouseEvent) => void;
};

export default function Node({ children, coord, onClick, ...rest }: NodeProps) {
  const position = coordinateToPosition(coord);

  return (
    <g
      transform={`translate(${position.x}, ${position.y})`}
      {...rest}
      onClick={onClick}
    >
      {children}
    </g>
  );
}
