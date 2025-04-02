import { memo } from "react";
import { isSamePosition } from "../../../common/utils";
import Text from "../Text";
import { useGameStore } from "../../../stores/mainStore";

function TextLayer() {
  const map = useGameStore((state) => state.map);
  const pacmanCoord = useGameStore((state) => state.pacmanCoord);
  const ghostCoord = useGameStore((state) => state.ghostCoord);

  return (
    <g id="text_layer">
      {map.map((row, rowIndex) => {
        return row.map((tileData, colIndex) => {
          if (map[rowIndex][colIndex].type === "wall") return null;

          const coord = { x: rowIndex, y: colIndex };
          let dist = Infinity;
          if (
            !isSamePosition(coord, pacmanCoord) &&
            !isSamePosition(coord, ghostCoord)
          ) {
            dist = tileData.dist;
          }
          return (
            <Text
              key={`${rowIndex}-${colIndex}`}
              coord={tileData.coord}
              dist={dist}
            />
          );
        });
      })}
    </g>
  );
}

export default memo(TextLayer);
