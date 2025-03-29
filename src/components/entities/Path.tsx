type Direction = "left" | "up" | "right" | "down";
type Type = "straight" | "curved";

export default function Path(type: Type, direction: [Direction, Direction]) {
  const texture = type === "straight" ? straightTexture : curvedTexture;
  const ang = 
  return (
    <>
      <rect id="background" width="64" height="64" fill="#0C134F" />
    </>
  );
}

const straightTexture = (
  <rect
    id="straight"
    x="56"
    y="64"
    width="48"
    height="64"
    transform="rotate(-180 56 64)"
    fill="#15E087"
  />
);

const curvedTexture = (
  <g id="curve">
    <path
      d="M36 8C47.0457 8 56 16.9543 56 28V56L0 56L2.09815e-06 8L36 8Z"
      fill="#15E087"
    />
    <path d="M56 64L8 64L8 56L56 56L56 64Z" fill="#15E087" />
  </g>
);
