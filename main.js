import { Game } from "./components/game.js";
import { World } from "./components/world.js";
import { GAME_HEIGHT, GAME_WIDTH } from "./constants.js";

window.addEventListener("load", () => {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = GAME_WIDTH;
  canvas.height = GAME_HEIGHT;
  ctx.imageSmoothingEnabled = false;

  const world = new World();
  const game = new Game(ctx, world);
  game.render();
});
