import { GameObject } from "./game-object.js";

export class Hero extends GameObject {
  constructor({ game, sprite, position, scale }) {
    super({ game, sprite, position, scale });
  }
}
