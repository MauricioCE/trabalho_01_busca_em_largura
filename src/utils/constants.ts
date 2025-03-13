const nodeSize = 50;
// const borderColor = "#8e8080";

export const gameConstants = {
  text: {
    darkColor: "#000",
    lightColor: "#fff",
  },
  grid: {
    rowGap: 0,
    colGap: 0,
  },
  vertex: {
    size: nodeSize,
    colors: {
      darkText: "#40458c",
      lightText: "#fefefe",
      unVisited: "#ebebeb",
      visited: "#d0d0d0",
      queued: "#a2e997",
      disabled: "#868679",
      path: "#f47c7c",
    },
  },
  pacman: {
    color: "#ffe300",
    size: nodeSize,
    spriteUrl: "",
  },
  ghost: {
    color: "#ff090b",
    size: nodeSize,
    spriteUrl: "",
  },
};
