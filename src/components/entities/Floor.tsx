import { useLayoutEffect, useState } from "react";

const Color = {
  queued: "#a2e997",
  unVisited: "#ebebeb",
  visited: "#d0d0d0",
} as const;

export type FloorProps = {
  dist: number;
  state: "visited" | "unVisited" | "queued";
};

export default function Floor({ dist, state }: FloorProps) {
  const [color, setColor] = useState<string>(Color["unVisited"]);
  const [text, setText] = useState<string>(`${Infinity}`);

  useLayoutEffect(() => {
    setColor(Color[state]);
    setText(dist === Infinity ? "" : `${dist}`);
  }, [dist, state]);

  return (
    <>
      <path fill={color} d="M0 0h32v32H0z" />
      <text
        transform="translate(16,16)"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {text}
      </text>
    </>
  );
}
