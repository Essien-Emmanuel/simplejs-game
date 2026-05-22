import { DOWN, GAME_TILE, LEFT, RIGHT, UP } from "../constants.js";
import { GameObject } from "./game-object.js";

export class Hero extends GameObject {
  constructor({ game, sprite, position, scale }) {
    super({ game, sprite, position, scale });
    this.maxFrame = 8;
    this.moving = false;
  }

  update() {
    if (this.game.input.lastKey === UP) {
      this.sprite.y = 8;
    }
    if (this.game.input.lastKey === DOWN) {
      this.sprite.y = 10;
    }
    if (this.game.input.lastKey === LEFT) {
      this.sprite.y = 9;
    }
    if (this.game.input.lastKey === RIGHT) {
      this.sprite.y = 11;
    }

    if (this.game.input.keys.length > 0) {
      this.moving = true;
    } else {
      this.moving = false;
    }

    if (this.moving) {
      if (this.sprite.x > this.maxFrame) {
        this.sprite.x = 1;
      } else {
        this.sprite.x++;
      }
    } else {
      this.sprite.x = 0;
    }
  }
}
