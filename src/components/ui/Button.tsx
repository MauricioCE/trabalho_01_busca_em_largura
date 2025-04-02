import { css } from "@emotion/react";

type Props = {
  className?: string;
  icon?: React.ReactNode;
  iconLocation?: "start" | "end";
  iconGap?: string;
  text?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  icon,
  iconLocation = "end",
  iconGap = "0.2em",
  text = "Button",
  ...rest
}: Props) {
  return (
    <button css={[wrapperStyle(iconLocation, iconGap)]} {...rest}>
      {icon} <span>{text}</span>
    </button>
  );
}

const wrapperStyle = (iconLocation: "start" | "end", gap: string) => css`
  display: flex;
  flex-direction: ${iconLocation === "end" ? "row-reverse" : ""};
  justify-content: center;
  align-items: center;
  gap: ${gap};
  background-color: #15e087;
  color: white;
  border-radius: 8px;
  padding: 10px 10px;
  cursor: pointer;
  user-select: none;

  :hover {
    opacity: 0.8;
  }

  :active {
    transform: scale(0.96);
  }
`;
