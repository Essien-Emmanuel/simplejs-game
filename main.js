import { Game } from "./components/game.js";
import { GAME_HEIGHT, GAME_WIDTH } from "./constants.js";

window.addEventListener("load", () => {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = GAME_WIDTH;
  canvas.height = GAME_HEIGHT;
  ctx.imageSmoothingEnabled = false;

  const game = new Game(ctx);

  function animate() {
    game.update();
    game.render();
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
});
