import { DOWN, LEFT, RIGHT, UP } from "../constants.js";

export class Input {
  constructor() {
    this.keys = [];
    this._registerEvents();
  }

  _registerEvents() {
    window.addEventListener("keydown", (e) => {
      if (["ArrowUp", "w"].includes(e.key)) {
        this.keyPressed(UP);
      }
      if (["ArrowDown", "s"].includes(e.key)) {
        this.keyPressed(DOWN);
      }
      if (["ArrowLeft", "a"].includes(e.key)) {
        this.keyPressed(LEFT);
      }
      if (["ArrowRight", "d"].includes(e.key)) {
        this.keyPressed(RIGHT);
      }
    });

    window.addEventListener("keyup", (e) => {
      if (["ArrowUp", "w"].includes(e.key)) {
        this.keyReleased(UP);
      }
      if (["ArrowDown", "s"].includes(e.key)) {
        this.keyReleased(DOWN);
      }
      if (["ArrowLeft", "a"].includes(e.key)) {
        this.keyReleased(LEFT);
      }
      if (["ArrowRight", "d"].includes(e.key)) {
        this.keyReleased(RIGHT);
      }
    });
  }

  keyPressed(key) {
    if (this.keys.indexOf(key) > -1) {
      return;
    }
    this.keys.unshift(key);
    console.log(this.keys);
  }

  keyReleased(key) {
    const index = this.keys.indexOf(key);
    if (index > -1) {
      this.keys.splice(index, 1);
    }
    console.log(this.keys);
  }

  get lastKey() {
    return this.keys[0];
  }
}
