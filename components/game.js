import { GAME_TILE, HERO_PIXELS_PER_FRAME } from "../constants.js";
import { Hero } from "./hero.js";
import { Input } from "./input.js";
import { World } from "./world.js";

export class Game {
  constructor(ctx) {
    this.ctx = ctx;

    this.world = new World();
    this.input = new Input();

    this.hero = new Hero({
      game: this,
      sprite: {
        x: 0,
        y: 0,
        w: HERO_PIXELS_PER_FRAME,
        h: HERO_PIXELS_PER_FRAME,
        image: document.querySelector("#hero"),
      },
      position: { x: 10 * GAME_TILE, y: 10 * GAME_TILE },
      scale: 1,
    });

    this._debug = true;
    this._registerEvents();
  }

  _registerEvents() {
    const debugButton = document.querySelector("#debugButton");
    debugButton.addEventListener("click", () => {
      this._debug = !this._debug;
      this.render();
    });
  }

  update() {
    this.hero.update();
  }

  render() {
    this.world.drawMap(this.ctx);
    this.hero.drawSprite(this.ctx);

    if (this._debug) {
      this.world.drawGrid(this.ctx);
    }
  }
}
