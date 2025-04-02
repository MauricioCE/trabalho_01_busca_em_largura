import generateMapData from "../common/mapHandler";
import { css } from "@emotion/react";
import Pacman from "./Pacman";
import Ghost from "./Ghost";
import { TileData } from "./Tile";
import { maxMapWidth } from "../common/constants";
import TilesLayer from "./layers/TilesLayer";
import PathLayer from "./layers/PathLayer";
import TextLayer from "./layers/TextLayer";
import { useGameStore } from "../stores/mainStore";
import { useEffect, useMemo } from "react";
import { bfs } from "../common/bfs";

type Props = {
  stage: string[];
};

export type GameMap = TileData[][];

export default function Map({ stage }: Props) {
  console.log("Map");
  const setMap = useGameStore((state) => state.setMap);
  const setMapSize = useGameStore((state) => state.setMapSize);
  const setPacmanCoord = useGameStore((state) => state.setPacmanCoord);
  const setGhostCoord = useGameStore((state) => state.setGhostCoord);
  const mapData = useMemo(() => {
    const data = generateMapData(stage);
    setMap(data.map);
    setMapSize(data.size);
    setPacmanCoord(data.pacmanCoord);
    setGhostCoord(data.ghostCoord);
    return data;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  const pacmanCoord = useGameStore((state) => state.pacmanCoord);
  const ghostCoord = useGameStore((state) => state.ghostCoord);

  useEffect(() => {
    bfs();
  }, [pacmanCoord, ghostCoord]);

  return (
    <div css={wrapperStyle(maxMapWidth)}>
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${mapData.size.width} ${mapData.size.height}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <TilesLayer />
        {/* <PathLayer /> */}
        {/* <TextLayer /> */}
        <Pacman />
        <Ghost />
      </svg>
    </div>
  );
}

// STYLES =====================================================================================

const wrapperStyle = (maxWidth: number) => css`
  width: 100%;
  max-width: ${maxWidth}px;
`;

// HOOKS =====================================================================================

// function useAnimation(
//   isPlaying: boolean,
//   timeoutId: React.RefObject<number>,
//   handleSteps: (value: number) => void
// ) {
//   useEffect(() => {
//     if (!isPlaying) return;

//     timeoutId.current = setInterval(() => {
//       handleSteps(+1);
//     }, animSpeed);

//     return () => clearTimeout(timeoutId.current);
//   }, [isPlaying]);
// }
