export class GameAnimation {
  constructor() {
    this.container = [];
  }

  add(effect) {
    this.container.push(effect);
  }

  update() {
    for (let i = 0; i < this.container.length; i++) {
      this.container[i].update();
    }
  }

  draw(ctx, camera) {
    for (let i = 0; i < this.container.length; i++) {
      this.container[i].draw(ctx, camera);
      if (this.container[i].frame === this.container[i].maxFrame) {
        this.container.splice(i, 1);
        i--;
      }
    }
  }
}
