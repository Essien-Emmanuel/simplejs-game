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
      scale: 0.56,
    });

    this._registerEvents();

    this._debug = false;
    this.eventTimer = 0;
    this.eventInterval = 60;
    this.eventUpdate = true;
  }

  _registerEvents() {
    const debugButton = document.querySelector("#debugButton");
    debugButton.addEventListener("click", () => {
      this._debug = !this._debug;
      this.render();
    });
  }

  update(deltaTime) {
    this.hero.update(deltaTime);

    if (this.eventTimer > this.eventInterval) {
      this.eventTimer = this.eventInterval % this.eventTimer;
      this.eventUpdate = true;
    } else {
      this.eventTimer += deltaTime;
      this.eventUpdate = false;
    }
  }

  render() {
    this.world.drawMap(this.ctx);
    this.hero.drawSprite(this.ctx);
    this.world.drawForeground(this.ctx);

    if (this._debug) {
      this.world.drawGrid(
        this.ctx,
        //  { verbose: true }
      );
    }
  }
}
