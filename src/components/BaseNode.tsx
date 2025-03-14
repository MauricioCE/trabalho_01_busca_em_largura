import { gameConstants } from "../utils/constants";
import { css, SerializedStyles } from "@emotion/react";

type Type = "static" | "absolute";

export type NodeProps = {
  bgColor: string;
  className?: string;
  txtColor?: string;
  label: string;
  additionalStyle?: SerializedStyles;
  type: Type;
};

const size = gameConstants.pacman.size;

export default function Node({
  additionalStyle,
  bgColor: color,
  label,
  txtColor = "#000",
  type,
  ...rest
}: NodeProps) {
  const bgColor = color;
  return (
    <div css={[style(bgColor, txtColor, type), additionalStyle]} {...rest}>
      {label}
    </div>
  );
}

const style = (bgColor: string, txtColor: string, type: Type) => css`
  position: ${type};
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${size}px;
  height: ${size}px;
  background-color: ${bgColor};
  border: 1px solid #8e8080;
  border-collapse: collapse;
  color: ${txtColor};
  font-size: 11px;
  font-weight: 100;
`;
