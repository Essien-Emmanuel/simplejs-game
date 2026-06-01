import { COLS, GAME_TILE, ROWS, DOWN, LEFT, RIGHT, UP } from "../constants.js";

export class Camera {
  constructor(world, width, height) {
    this.world = world;
    this.width = width;
    this.height = height;
    this.x = 0;
    this.y = 0;
    this.maxX = COLS * GAME_TILE - this.width;
    this.maxY = ROWS * GAME_TILE - this.height;
  }

  follow(target) {
    this.x = target.position.x + GAME_TILE / 2 - this.width / 2;
    this.y = target.position.y + GAME_TILE / 2 - this.height / 2;

    this.x = Math.max(0, Math.min(this.x, this.maxX));
    this.y = Math.max(0, Math.min(this.y, this.maxY));
  }
}
