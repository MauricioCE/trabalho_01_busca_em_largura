import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Game from "./components/Game.tsx";
import Map from "./components/Map.tsx";

const stage = [
  ". . . . . x . . . . . .",
  "x . x x . . x . x x x .",
  ". . . . x . . . . . . .",
  ". x x . . x x x . . x .",
  ". . . . . . . . . x x .",
  ". x x x x . x . . . x .",
  ". . x . x . . x . . x .",
  ". . x . x . . x . . . .",
  ". x x . x x . x . x x .",
  ". x . . . . . . . x . .",
  ". . x . . . x . . . . .",
  ". . . . x x x x x x x .",
];

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Map stage={stage} />
  </StrictMode>
);
