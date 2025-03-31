import { css } from "@emotion/react";
import Map from "./entities/Map";
import Controls from "./ui/Controls";
import { stagesList } from "../data/stages";
import Header from "./ui/header/Header";

// const animSpeed = 100;
const stage = stagesList[0];

export default function Game() {
  return (
    <div css={wrapperStyle}>
      <Header title="Breadth First Search (BFS)" />
      <div css={mainStyle}>
        <div css={leftContainer}></div>
        <div css={centerContainer}>
          <Map stage={stage} />
          <Controls />
        </div>
        <div css={rightContainer}></div>
      </div>
    </div>
  );
}

// STYLES =====================================================================================

const wrapperStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100vw;
  height: 100vh;
  padding: 0 20px;
  background-color: #00041a;
`;

const mainStyle = css``;

const leftContainer = css``;

const centerContainer = css``;

const rightContainer = css``;
