import { css } from "@emotion/react";
import Game from "./components/Game.tsx";
import MovableSquare from "./components/MovableSquare.tsx";

function App() {
  return (
    <>
      <div css={wrapper}>
        <Game />
        <MovableSquare x={10} y={0} />
        <MovableSquare x={10} y={0} />
        <MovableSquare x={10} y={0} />
        <MovableSquare x={10} y={0} />
        <MovableSquare x={10} y={0} />
      </div>
    </>
  );
}

const wrapper = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #afc8ee;
`;

export default App;
