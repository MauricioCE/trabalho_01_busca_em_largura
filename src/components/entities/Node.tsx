import { useEffect, useState } from "react";
import { Vector2 } from "../../common/types";
import { coordinateToPosition } from "../../common/utils";

export type MetaData = {
  [key: string]: string;
};

export type NodeProps = {
  children?: React.ReactNode;
  className?: string;
  coord: Vector2;
  metaData?: MetaData[];
  onClick?: () => void;
};

export default function Node({ children, coord, onClick, ...rest }: NodeProps) {
  const [position, setPosition] = useState<Vector2>({ x: 0, y: 0 });

  useEffect(() => {
    const position = coordinateToPosition(coord);
    setPosition(position);
  }, [coord]);

  return (
    <g
      onClick={onClick}
      transform={`translate(${position.x}, ${position.y})`}
      {...rest}
    >
      {children}
    </g>
  );
}
