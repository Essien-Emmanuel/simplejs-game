import { COLS, GAME_TILE, ROWS, DOWN, LEFT, RIGHT, UP } from "../constants.js";

export class Camera {
  constructor(world, width, height) {
    this.world = world;
    this.width = width;
    this.height = height;
    this.x = 0;
    this.y = 0;
    this.speed = 64;
    this.maxX = COLS * GAME_TILE - this.width;
    this.maxY = ROWS * GAME_TILE - this.height;
  }

  move(deltaTime, speedX, speedY) {
    const scaledSpeed = (this.speed * deltaTime) / 1000;
    this.x += speedX * scaledSpeed;
    this.y += speedY * scaledSpeed;

    this.x = Math.max(0, Math.min(this.x, this.maxX));
    this.y = Math.max(0, Math.min(this.y, this.maxY));
  }

  updatePosition(deltaTime, lastKey) {
    let speedX = 0;
    let speedY = 0;

    if (lastKey === UP) speedY = -1;
    if (lastKey === DOWN) speedY = 1;
    if (lastKey === LEFT) speedX = -1;
    if (lastKey === RIGHT) speedX = 1;

    this.move(deltaTime, speedX, speedY);
  }
}
