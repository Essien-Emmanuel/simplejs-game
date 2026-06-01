import {
  DOWN,
  GAME_HEIGHT,
  GAME_TILE,
  GAME_WIDTH,
  GAME_WORLD_HEIGHT,
  GAME_WORLD_WIDTH,
  LEFT,
  RIGHT,
  ROWS,
  UP,
} from "../constants.js";
import { GameObject } from "./game-object.js";

export class Hero extends GameObject {
  constructor({ game, sprite, position, scale }) {
    super({ game, sprite, position, scale });
    this.speed = 100;
    this.maxFrame = 8;
    this.moving = false;
  }

  update(deltaTime) {
    if (!this.isVisible) return;

    let nextX = this.destinationPos.x;
    let nextY = this.destinationPos.y;

    const scaledSpeed = this.speed * (deltaTime / 1000);

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
    }

    if (this.game.input.keys.length > 0 || !arrived) {
      this.moving = true;
    } else {
      this.moving = false;
    }

    let row = nextY / GAME_TILE;
    let col = nextX / GAME_TILE;

    // collision
    if (this.game.world.getTile(this.game.world.map[4], row, col) === 0) {
      this.moving = false;
    } else {
      this.destinationPos.x = Math.max(
        0,
        Math.min(nextX, GAME_WORLD_WIDTH - GAME_TILE),
      );
      this.destinationPos.y = Math.max(
        0,
        Math.min(nextY, GAME_WORLD_HEIGHT - GAME_TILE),
      );
    }

    if (this.moving && this.game.eventUpdate) {
      if (this.sprite.x < this.maxFrame) {
        this.sprite.x++;
      } else {
        this.sprite.x = 1;
      }
    } else if (!this.moving) {
      this.sprite.x = 0;
    }
  }
}
