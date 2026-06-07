import {
  GAME_HEIGHT,
  GAME_TILE,
  GAME_WIDTH,
  HERO_PIXELS_PER_FRAME,
} from "../constants.js";
import { Explosion } from "../effects/explosion.js";
import { GameAnimation } from "./animation.js";
import { Camera } from "./camera.js";
import { Collider } from "./collider.js";
import { GameObject } from "./game-object.js";
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
      scale: 0.4,
    });

    // other sprites
    // bomb
    const bombImg = new Image();
    bombImg.src = "../assets/bomb.png";
    bombImg.onload = () => {
      this.bomb = new GameObject({
        game: this,
        sprite: {
          x: 0,
          y: 0,
          w: 1000,
          h: 1050,
          image: bombImg,
        },
        position: { x: 10 * GAME_TILE, y: 12 * GAME_TILE },
        scale: 0.01,
      });
    };

    // sound
    this.walkSound = new Audio();
    this.walkSound.volume = 0.3;
    this.walkSound.src = "../assets/walk.wav";

    this.bgSound = new Audio();
    this.bgSound.volume = 0.5;
    this.bgSound.loop = true;
    this.bgSound.src = "../assets/bg.mp3";

    // animation
    this.animation = new GameAnimation();

    this._registerEvents();

    this._debug = false;
    this.eventTimer = 0;
    this.eventInterval = 60;
    this.eventUpdate = true;

    this.playBgSound = true;
    window.addEventListener("keydown", (e) => {
      if (e.key.toLowerCase() === "p") {
        this.playBgSound = !this.playBgSound;
      }
    });
  }

  _registerEvents() {
    const debugButton = document.querySelector("#debugButton");
    debugButton.addEventListener("click", () => {
      this._debug = !this._debug;
      this.render();
    });
  }

  update(deltaTime) {
    if (this.playBgSound) {
      this.bgSound.volume = 0.5;
      this.bgSound.play();
    } else {
      this.bgSound.volume = 0;
    }
    this.hero.update(deltaTime);

    if (this.eventTimer > this.eventInterval) {
      this.eventTimer = this.eventInterval % this.eventTimer;
      this.eventUpdate = true;
    } else {
      this.eventTimer += deltaTime;
      this.eventUpdate = false;
    }

    this.camera.follow(this.hero);

    // test animation
    if (this.bomb && this.bomb.isVisible) {
      if (
        this.hero.position.x === this.bomb.position.x &&
        this.hero.position.y === this.bomb.position.y
      ) {
        this.animation.add(
          new Explosion(this.bomb.position.x, this.bomb.position.y),
        );
        this.animation.update();
        this.bomb.isVisible = false;
      }
    }
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
    this.hero.drawSprite(this.ctx, camera);
    this.world.drawForeground(this.ctx, camera);
    if (this.bomb) this.bomb.drawSprite(this.ctx, camera);
    this.animation.draw(this.ctx, camera);

    if (this._debug) {
      this.world.drawGrid(
        this.ctx,
        camera,
        //  { verbose: true }
      );
    }
  }
}
