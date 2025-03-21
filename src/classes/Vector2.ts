export default class Vector2 {
  x: number;
  y: number;
  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  static zero(): Vector2 {
    return new Vector2(0, 0);
  }
}
