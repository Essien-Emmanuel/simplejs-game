export class Game {
  constructor(ctx, world) {
    this.ctx = ctx;
    this.world = world;

    this._debug = false;
    this._registerEvents();
  }

  _registerEvents() {
    const debugButton = document.querySelector("#debugButton");
    debugButton.addEventListener("click", () => {
      this._debug = !this._debug;
      this.render();
    });
  }

  update() {}

  render() {
    this.world.drawMap(this.ctx);

    if (this._debug) {
      this.world.drawGrid(this.ctx);
    }
  }
}
