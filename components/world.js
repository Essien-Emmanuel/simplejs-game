import { COLS, GAME_TILE, ROWS } from "../constants.js";
import {
  backgroundLayer,
  collisionLayer,
  foregroundLayer,
  mainLayer,
  objectLayer,
} from "./layers.js";

export class World {
  constructor() {
    this.map = [
      backgroundLayer,
      mainLayer,
      objectLayer,
      foregroundLayer,
      collisionLayer,
    ];

    this.TILE_IMAGE = document.querySelector("#tileset");
    this.TILE_IMAGE_CELL = 16;
    this.TILE_IMAGE_COL = this.TILE_IMAGE.width / this.TILE_IMAGE_CELL;
    this.index = 1;
    this.defaultMap = this.map[1];
  }

  getTile(map, row, col) {
    return map[COLS * row + col];
  }

  drawGrid(ctx, options) {
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        ctx.strokeStyle = "black";
        ctx.lineWidth = 0.5;
        ctx.strokeRect(col * GAME_TILE, row * GAME_TILE, GAME_TILE, GAME_TILE);

        if (options && options.verbose) {
          ctx.font = "bold 8px Arial";
          ctx.fillStyle = "white";
          ctx.fillText(this.index, col * GAME_TILE, (row + 1) * GAME_TILE);

          this.index++;
          if (this.index > 323) {
            this.index = 1;
          }
        }
      }
    }
  }

  _drawLayer(ctx, layer) {
    if (!isNaN(layer)) {
      this.defaultMap = this.map[layer];
    }

    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const tile = this.getTile(this.defaultMap, row, col);
        const sx = ((tile - 1) * this.TILE_IMAGE_CELL) % this.TILE_IMAGE.width;
        const sy =
          Math.floor((tile - 1) / this.TILE_IMAGE_COL) * this.TILE_IMAGE_CELL;

        ctx.drawImage(
          this.TILE_IMAGE,
          sx,
          sy,
          this.TILE_IMAGE_CELL,
          this.TILE_IMAGE_CELL,
          col * GAME_TILE,
          row * GAME_TILE,
          GAME_TILE,
          GAME_TILE,
        );
      }
    }
  }

  drawForeground(ctx) {
    this._drawLayer(ctx, 3);
  }

  drawMap(ctx) {
    this._drawLayer(ctx, 0);
    this._drawLayer(ctx, 1);
    this._drawLayer(ctx, 2);
  }
}
