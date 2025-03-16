import { SVGProps } from "react";

export default function Pacman(props: SVGProps<SVGSVGElement>) {
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <path
      fill="#D4FF00"
      d="M32 9.486 15.677 17l15.459 7.116C28.228 28.835 22.86 32 16.722 32 7.487 32 0 24.837 0 16S7.487 0 16.722 0C23.532 0 29.392 3.896 32 9.486Z"
    />
    <circle cx={10.5} cy={7.5} r={2.5} fill="#2F2F2F" />
  </svg>;
}
