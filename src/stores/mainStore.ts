import { create } from "zustand";
import { Size, Vector2 } from "../common/types";
import { GameMap } from "../components/entities/Map";

export interface GameState {
  map: GameMap;
  mapSize: Size;
  pacmanPos: Vector2;
  ghostPos: Vector2;
  steps: number;
  maxSteps: number;
  updateMap: number;

  setMap: (newMap: GameMap) => void;
  setMapSize: (newSize: Size) => void;
  setPacmanPos: (newPos: Vector2) => void;
  setGhostPos: (newPos: Vector2) => void;
  setSteps: (value: number) => void;
  setMaxSteps: (value: number) => void;
  triggerUpdate: (value: number) => void;
}

export const useGameStore = create<GameState>((set) => ({
  map: [],
  mapSize: { width: 0, height: 0 },
  pacmanPos: { x: -10, y: 0 },
  ghostPos: { x: -10, y: 0 },
  steps: 0,
  maxSteps: 0,
  updateMap: 1,

  setMap: (newMap: GameMap) => set({ map: newMap }),
  setMapSize: (newSize: Size) => set({ mapSize: newSize }),
  setPacmanPos: (newPos: Vector2) => set({ pacmanPos: newPos }),
  setGhostPos: (newPos: Vector2) => set({ ghostPos: newPos }),
  setSteps: (value: number) => set({ steps: value }),
  setMaxSteps: (value: number) => set({ maxSteps: value }),
  triggerUpdate: () => set((state) => ({ updateMap: state.updateMap + 1 })),
}));
