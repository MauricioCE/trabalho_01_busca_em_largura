import { css } from "@emotion/react";
import { stagesList } from "../data/maps";
import Map from "./entities/Map";
import Controls from "./ui/Controls";

// const animSpeed = 100;
const stage = stagesList[0];

export default function Game() {
  return (
    <>
      <div css={wrapperStyle}>
        <Map stage={stage} />
        <Controls />
      </div>
    </>
  );
}

// STYLES =====================================================================================

const wrapperStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #00041a;
  padding: 20px 20px;
`;
