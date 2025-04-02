import { css } from "@emotion/react";
import { useGameStore } from "../../stores/mainStore";
import Button from "./Button";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

export default function Controls() {
  const setSteps = useGameStore((state) => state.setStepsBy);

  function handleSteps(increment: number) {
    setSteps(increment);
  }

  return (
    <div css={buttonGroupStyle}>
      <Button
        css={buttonStyle}
        icon={<MdKeyboardDoubleArrowLeft />}
        iconLocation="start"
        text="Voltar"
        onClick={() => handleSteps(-1)}
      />
      <Button
        css={buttonStyle}
        icon={<MdKeyboardDoubleArrowRight />}
        iconLocation="end"
        text="Avançar"
        onClick={() => handleSteps(1)}
      />
    </div>
  );
}

const buttonStyle = css`
  min-width: 120px;
  font-size: 1.2rem;
  font-weight: 500;
  color: #1f1f1f;
`;

const buttonGroupStyle = css`
  display: flex;
  gap: 10px;
`;
