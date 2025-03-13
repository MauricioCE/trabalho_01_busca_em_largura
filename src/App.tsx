import { css } from "@emotion/react";
import Game from "./components/Game.tsx";

function App() {
  return (
    <>
      <div css={wrapper}>
        <Game />
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
