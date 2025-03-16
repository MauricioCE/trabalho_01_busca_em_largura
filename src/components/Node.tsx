import { SVGProps, useEffect, useState } from "react";
import Vector2 from "../classes/Vector2";

export type NodeProps = {
  children?: React.ReactNode;
  className?: string;
  pos: Vector2;
  onClick?: () => void;
} & SVGProps<SVGSVGElement>;

export default function Node({ children, pos, onClick, ...rest }: NodeProps) {
  const [position, setPosition] = useState<Vector2>(Vector2.zero());

  useEffect(() => {
    setPosition(pos);
  }, [pos]);

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
