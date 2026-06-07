import { GAME_TILE } from "../constants.js";

export class Explosion {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.width = this.spriteWidth * 0.15;
    this.height = this.spriteHeight * 0.15;
    this.img = new Image();
    this.img.src = "../assets/boom.png";
    this.sound = new Audio();
    this.sound.src = "../assets/boom.wav";
    this.sound.volume = 0.1;
    this.frame = 0;
    this.maxFrame = 5;
    this.timer = 0;
    this.angle = Math.random() * 6.28;
  }

  update() {
    this.timer++;

    if (this.frame === 0) this.sound.play();

    if (this.timer % 10 === 0) {
      this.frame++;
    }
  }

  draw(ctx, camera) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.drawImage(
      this.img,
      this.spriteWidth * this.frame,
      0,
      this.spriteWidth,
      this.spriteHeight,
      0 - this.width * 0.5 - camera.x,
      0 - this.height * 0.5 - camera.y,
      this.width,
      this.height,
    );
    ctx.restore();
  }
}
