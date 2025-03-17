import Node, { NodeProps } from "../Node";

export default function Ghost({ pos }: NodeProps) {
  return (
    <Node pos={pos}>
      <path
        fill="#E14949"
        d="M10.969 0c6.058 0 10.969 4.59 10.969 10.251v19.086l-.615-1.453L19.58 32l-1.743-4.116L16.095 32l-1.743-4.116L12.609 32l-1.742-4.116L9.123 32 7.38 27.884 5.638 32l-1.742-4.116L2.153 32 .41 27.884l-.41.968v-18.6C0 4.59 4.911 0 10.969 0Z"
      />
      <ellipse cx={6} cy={11} fill="#fff" rx={2} ry={3} />
      <ellipse cx={16} cy={11} fill="#fff" rx={2} ry={3} />
      <circle cx={16} cy={11} r={1} fill="#444" />
      <circle cx={6} cy={11} r={1} fill="#444" />
    </Node>
  );
}

{
  /* <svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
<path
  fill="#E14949"
  d="M10.969 0c6.058 0 10.969 4.59 10.969 10.251v19.086l-.615-1.453L19.58 32l-1.743-4.116L16.095 32l-1.743-4.116L12.609 32l-1.742-4.116L9.123 32 7.38 27.884 5.638 32l-1.742-4.116L2.153 32 .41 27.884l-.41.968v-18.6C0 4.59 4.911 0 10.969 0Z"
/>
<ellipse cx={6} cy={11} fill="#fff" rx={2} ry={3} />
<ellipse cx={16} cy={11} fill="#fff" rx={2} ry={3} />
<circle cx={16} cy={11} r={1} fill="#444" />
<circle cx={6} cy={11} r={1} fill="#444" />
</svg>; */
}
