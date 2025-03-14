interface MovableSquareProps {
  x: number;
  y: number;
}

const MovableSquare = ({ x, y }: MovableSquareProps) => {
  return (
    <svg width="600" height="600" style={{ border: "1px solid black" }}>
      <rect
        x={150}
        y={y}
        width="100"
        height="100"
        fill="lightblue"
        stroke="black"
        strokeWidth="2"
      />
    </svg>
  );
};

export default MovableSquare;
