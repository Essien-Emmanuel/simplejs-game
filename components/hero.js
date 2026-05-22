import { DOWN, GAME_TILE, LEFT, RIGHT, UP } from "../constants.js";
import { GameObject } from "./game-object.js";

export class Hero extends GameObject {
  constructor({ game, sprite, position, scale }) {
    super({ game, sprite, position, scale });
    this.speed = 2;
    this.maxFrame = 8;
    this.moving = false;
  }

  update() {
    let nextX = this.destinationPos.x;
    let nextY = this.destinationPos.y;

    const distance = this.moveTowards(this.destinationPos, this.speed);
    const arrived = distance <= this.speed;

    if (arrived) {
      if (this.game.input.lastKey === UP) {
        nextY -= GAME_TILE;
        this.sprite.y = 8;
      }
      if (this.game.input.lastKey === DOWN) {
        nextY += GAME_TILE;
        this.sprite.y = 10;
      }
      if (this.game.input.lastKey === LEFT) {
        nextX -= GAME_TILE;
        this.sprite.y = 9;
      }
      if (this.game.input.lastKey === RIGHT) {
        nextX += GAME_TILE;
        this.sprite.y = 11;
      }

      if (this.game.input.keys.length > 0 || !arrived) {
        this.moving = true;
      } else {
        this.moving = false;
      }
      console.log("x", this.moving, this.sprite.x);

      if (this.moving) {
        if (this.sprite.x < this.maxFrame) {
          this.sprite.x++;
        } else {
          this.sprite.x = 1;
        }
      } else {
        this.sprite.x = 0;
      }
    }
    this.destinationPos.x = nextX;
    this.destinationPos.y = nextY;
  }
}
