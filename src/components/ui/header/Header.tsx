import { css } from "@emotion/react";
import { maxMapWidth } from "../../../common/constants";

type Props = {
  title: string;
};

export default function Header({ title }: Props) {
  return <div css={headerStyle(maxMapWidth)}>{title}</div>;
}

const headerStyle = (maxWidth: number) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: ${maxWidth}px;
  padding: 10px;
  margin-top: 20px;
  font-size: 1.7rem;
  background-color: #0c134f;
  color: white;
  border-radius: 10px;
`;
