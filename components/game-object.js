import { GAME_TILE, HALF_TILE } from "../constants.js";

export class GameObject {
  constructor({ game, sprite, position, scale, isVisible, coliider }) {
    this.game = game;
    this.sprite = sprite ?? { x: 0, y: 0, w: 0, h: 0, image: "" };
    this.position = position ?? { x: 0, y: 0 };
    this.scale = scale ?? 1;
    this.isVisible = isVisible ?? true;
    this.collider = coliider ?? null;

    this.width = this.sprite.w * this.scale;
    this.halfWidth = this.width / 2;
    this.height = this.sprite.h * this.scale;

    this.destinationPos = { x: this.position.x, y: this.position.y };
    this.distanceToTravel = { x: 0, y: 0 };
  }

  moveTowards(destinationPos, speed) {
    this.distanceToTravel.x = destinationPos.x - this.position.x;
    this.distanceToTravel.y = destinationPos.y - this.position.y;

    let distance = Math.hypot(this.distanceToTravel.x, this.distanceToTravel.y);

    if (distance <= speed) {
      this.position.x = destinationPos.x;
      this.position.y = destinationPos.y;
    } else {
      let stepX = this.distanceToTravel.x / distance;
      let stepY = this.distanceToTravel.y / distance;

      this.position.x += stepX * speed;
      this.position.y += stepY * speed;

      this.distanceToTravel.x = destinationPos.x - this.position.x;
      this.distanceToTravel.y = destinationPos.y - this.position.y;

      distance = Math.hypot(this.distanceToTravel.x, this.distanceToTravel.y);
    }

    return distance;
  }

  drawSprite(ctx, camera) {
    if (!this.isVisible) return;

    const cameraX = camera.x;
    const cameraY = camera.y;

    if (this.game._debug) {
      ctx.fillStyle = "rgba(187, 240, 15, 0.91)";
      ctx.fillRect(
        this.destinationPos.x - cameraX,
        this.destinationPos.y - cameraY,
        GAME_TILE,
        GAME_TILE,
      );

      ctx.fillStyle = "rgba(225, 10, 10, 0.7)";
      ctx.fillRect(
        this.position.x - cameraX,
        this.position.y - cameraY,
        GAME_TILE,
        GAME_TILE,
      );
    }

    ctx.drawImage(
      this.sprite.image,
      this.sprite.x * this.sprite.w,
      this.sprite.y * this.sprite.h,
      this.sprite.w,
      this.sprite.h,
      this.position.x + HALF_TILE - this.halfWidth - cameraX,
      this.position.y + GAME_TILE - this.height - cameraY,
      this.width,
      this.height,
    );
  }
}
