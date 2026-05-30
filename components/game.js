import {
  GAME_HEIGHT,
  GAME_TILE,
  GAME_WIDTH,
  HERO_PIXELS_PER_FRAME,
} from "../constants.js";
import { Camera } from "./camera.js";
import { Hero } from "./hero.js";
import { Input } from "./input.js";
import { World } from "./world.js";

export class Game {
  constructor(ctx) {
    this.ctx = ctx;

    this.world = new World();
    this.input = new Input();
    this.camera = new Camera(this.world, GAME_WIDTH, GAME_HEIGHT);

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

    this.camera.updatePosition(deltaTime, this.input.lastKey);
  }

  render() {
    const camera = {
      x: this.camera.x,
      y: this.camera.y,
      w: this.camera.width,
      h: this.camera.height,
    };

    this.hero.isVisible = true;

    this.world.drawMap(this.ctx, camera);
    this.hero.drawSprite(this.ctx);
    this.world.drawForeground(this.ctx, camera);

    if (this._debug) {
      this.world.drawGrid(
        this.ctx,
        //  { verbose: true }
      );
    }
  }
}
