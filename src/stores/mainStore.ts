import { create } from "zustand";
import { Size, Vector2 } from "../common/types";
import { GameMap } from "../components/game/Map";
import { clamp } from "../common/utils";

export interface GameState {
  map: GameMap;
  mapSize: Size;
  pacmanCoord: Vector2;
  ghostCoord: Vector2;
  steps: number;
  maxSteps: number;
  updateMap: number;
  path: Vector2[];

  setMap: (newMap: GameMap) => void;
  setMapSize: (newSize: Size) => void;
  setPacmanCoord: (coord: Vector2) => void;
  setGhostCoord: (coord: Vector2) => void;
  setStepsBy: (value: number) => void;
  setMaxSteps: (value: number) => void;
  triggerUpdate: (value: number) => void;
  setPath: (path: Vector2[]) => void;
}

export const useGameStore = create<GameState>((set) => ({
  map: [],
  mapSize: { width: 0, height: 0 },
  pacmanCoord: { x: -10, y: 0 },
  ghostCoord: { x: -10, y: 0 },
  steps: 0,
  maxSteps: 0,
  updateMap: 1,
  path: [],

  setMap: (newMap: GameMap) => set({ map: newMap }),
  setMapSize: (newSize: Size) => set({ mapSize: newSize }),
  setPacmanCoord: (coord: Vector2) => set({ pacmanCoord: coord }),
  setGhostCoord: (coord: Vector2) => set({ ghostCoord: coord }),
  setStepsBy: (value: number) =>
    set((state) => ({ steps: clamp(state.steps + value, 0, state.maxSteps) })),
  setMaxSteps: (value: number) => set({ maxSteps: value }),
  triggerUpdate: () => set((state) => ({ updateMap: state.updateMap + 1 })),
  setPath: (path: Vector2[]) => set({ path: path }),
}));
