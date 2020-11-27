import dot from "./dot.js";
import game from "./game.js";
import HF from "./helper/helper.js";
import snake from "./snake.js";
//get Canvas element

const canvas = HF.getEl("canvas");
canvas.width = window.innerWidth;
window.addEventListener("keydown", game.checkUserAction);

if (window.innerWidth < 1000) {
  canvas.height = window.innerHeight - 150;
  game.assignCallbacksToMobBtnEvents();
  HF.getEl("#mobile_btns").style.display = "flex";
} else canvas.height = window.innerHeight - 30;
export const context = canvas.getContext("2d");

game.update();

const btnPlayAgain = HF.getEl(".modal__buttons button:first-child");
btnPlayAgain.addEventListener("click", game.onPlayAgainClick);

//for testing
let a = (i, n) => {
  if (i == n - 1) return;
  snake.tail[i] = {
    x: snake.x - n * 2 + (i + 1) * 2,
    y: snake.y,
  };
  a(++i, n);
};
//a(0, 301);
