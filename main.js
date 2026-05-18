const GAME_WIDTH = 592;
const GAME_HEIGHT = 496;
const GAME_TILE = 16;
const COLS = GAME_WIDTH / GAME_TILE;
const ROWS = GAME_HEIGHT / GAME_TILE;

let debug = false;
let ctx;

function drawGrid(ctx) {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      ctx.strokeRect(col * GAME_TILE, row * GAME_TILE, GAME_TILE, GAME_TILE);
    }
  }
}

window.addEventListener("load", () => {
  const canvas = document.querySelector("canvas");
  ctx = canvas.getContext("2d");

  canvas.width = GAME_WIDTH;
  canvas.height = GAME_HEIGHT;
  ctx.imageSmoothingEnabled = false;
  if (debug) drawGrid(ctx);
  const TILE_IMAGE = document.querySelector("#tileset");
});

window.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    debug = !debug;
  }
  console.log({ debug });
  if (debug) drawGrid(ctx);
});
