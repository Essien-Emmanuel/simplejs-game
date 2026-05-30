export class Camera {
  constructor(world, width, height) {
    this.world = world;
    this.width = width;
    this.height = height;
    this.x = 0;
    this.y = 0;
    this.speed = 1;
  }

  move(speedX, speedY) {
    this.x += speedX * this.speed;
    this.y += speedY * this.speedY;
  }
}
