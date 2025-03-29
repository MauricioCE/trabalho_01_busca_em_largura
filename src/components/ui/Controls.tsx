import { css } from "@emotion/react";
import { useGameStore } from "../../stores/mainStore";
import Button from "./Button";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { Math } from "../../common/math";

export default function Controls() {
  function handleSteps(increment: number) {
    const maxSteps = useGameStore.getState().maxSteps;
    const steps = useGameStore.getState().steps;
    const newStep = Math.clamp(0, steps + increment, maxSteps);
    useGameStore.getState().setSteps(newStep);
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
