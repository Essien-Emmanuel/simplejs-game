export class Collider {
  constructor(x, y, width, height, offsetX = 0, offsetY) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.offsetX = 0;
    this.offsetY = 0;
    this.isTrigger = false;
  }

  update(objectX, objectY) {
    this.x = objectX + this.offsetX;
    this.y = objectY + this.offsetY;
  }
}
