import {
  mainLayer,
  backgroundLayer,
  objectLayer,
} from "./components/layers.js";

const GAME_WIDTH = 272;
const GAME_HEIGHT = 304;
const GAME_TILE = 16;
const COLS = GAME_WIDTH / GAME_TILE;
const ROWS = GAME_HEIGHT / GAME_TILE;

const map = [backgroundLayer, mainLayer, objectLayer];

const tileMap = Array.from({ length: 323 }, (_, index) => index + 1);

let isTile = false;
let debug = false;
let defaultMap = map[1];

function getTile(map, row, col) {
  return map[COLS * row + col];
}

window.addEventListener("load", () => {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = GAME_WIDTH;
  canvas.height = GAME_HEIGHT;
  ctx.imageSmoothingEnabled = false;

  const TILE_IMAGE = document.querySelector("#tileset");
  const TILE_IMAGE_CELL = 16;
  const TILE_IMAGE_COL = TILE_IMAGE.width / TILE_IMAGE_CELL;

  let index = 1;

  function drawGrid(ctx) {
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        if (debug) {
          ctx.strokeRect(
            col * GAME_TILE,
            row * GAME_TILE,
            GAME_TILE,
            GAME_TILE,
          );
          ctx.font = "bold 8px Arial";
          ctx.fillStyle = "white";
          ctx.fillText(index, col * GAME_TILE, (row + 1) * GAME_TILE);
        }

        index++;
        if (index > 323) {
          index = 1;
        }
      }
    }
  }

  function drawMap(layer) {
    if (!isNaN(layer)) {
      defaultMap = map[layer];
    }

    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const tile = getTile(defaultMap, row, col);
        const sx = ((tile - 1) * TILE_IMAGE_CELL) % TILE_IMAGE.width;
        const sy = Math.floor((tile - 1) / TILE_IMAGE_COL) * TILE_IMAGE_CELL;

        ctx.drawImage(
          TILE_IMAGE,
          sx,
          sy,
          TILE_IMAGE_CELL,
          TILE_IMAGE_CELL,
          col * GAME_TILE,
          row * GAME_TILE,
          GAME_TILE,
          GAME_TILE,
        );
      }
    }
  }
  function renderWorld() {
    drawMap(0);
    drawMap(1);
    drawMap(2);
  }
  renderWorld();

  const worldButton = document.querySelector("#worldButton");
  const debugButton = document.querySelector("#debugButton");
  const tilesetButton = document.querySelector("#tilesetButton");

  worldButton.addEventListener("click", () => {
    // defaultMap = map;
    isTile = false;
    index = 1;
    renderWorld();
  });

  tilesetButton.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    isTile = true;
    defaultMap = tileMap;
    index = 1;
    drawMap();
  });

  debugButton.addEventListener("click", () => {
    debug = !debug;
    index = 1;
    if (!isTile) {
      renderWorld();
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawMap();
    }

    if (debug) drawGrid(ctx);
  });
});
