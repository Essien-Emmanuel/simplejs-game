import { GAME_TILE, HALF_TILE } from "../constants.js";

export class GameObject {
  constructor({ game, sprite, position, scale }) {
    this.game = game;
    this.sprite = sprite ?? { x: 0, y: 0, w: 0, h: 0, image: "" };
    this.position = position ?? { x: 0, y: 0 };
    this.scale = scale ?? 1;

    this.width = this.sprite.w * this.scale;
    this.halfWidth = this.width / 2;
    this.height = this.sprite.h * this.scale;
  }

  drawSprite(ctx) {
    ctx.fillStyle = "rgba(225, 10, 10, 0.7)";
    ctx.fillRect(this.position.x, this.position.y, GAME_TILE, GAME_TILE);
    ctx.drawImage(
      this.sprite.image,
      0,
      0,
      this.sprite.w,
      this.sprite.h,
      this.position.x + HALF_TILE - this.halfWidth,
      this.position.y + GAME_TILE - this.height,
      //   this.sprite.w,
      //   this.sprite.h,

      this.width,
      this.height,
    );
    console.log(this.height);
  }
}
