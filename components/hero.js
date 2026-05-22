import { DOWN, GAME_TILE, LEFT, RIGHT, UP } from "../constants.js";
import { GameObject } from "./game-object.js";

export class Hero extends GameObject {
  constructor({ game, sprite, position, scale }) {
    super({ game, sprite, position, scale });
    this.speed = 200;
    this.maxFrame = 8;
    this.moving = false;
  }

  update(deltaTime) {
    let nextX = this.destinationPos.x;
    let nextY = this.destinationPos.y;

    const scaledSpeed = this.speed * deltaTime;
    console.log(scaledSpeed);

    const distance = this.moveTowards(this.destinationPos, scaledSpeed);
    const arrived = distance <= scaledSpeed;

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

      if (
        this.game.input.keys.length > 0 ||
        (!arrived && this.game.eventUpdate)
      ) {
        this.moving = true;
      } else {
        this.moving = false;
      }

      console.log(this.game.eventUpdate, this.game.timer);
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
