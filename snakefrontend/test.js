import dot from "./dot.js";
import game from "./game.js";
import HF from "./helper/helper.js";
import snake from "./snake.js";
//get Canvas element
window.onload = (e) => {
  if (!document.cookie || !HF.getCookieByKey("token")) {
    console.log("TOKEN NOT THERE");
  }
  startGame();
};
const canvas = HF.getEl("canvas");
export const context = canvas.getContext("2d");

const startGame = () => {
  canvas.width = window.innerWidth;
  window.addEventListener("keydown", game.checkUserAction);

  if (window.innerWidth < 1000) {
    canvas.height = window.innerHeight - 150;
    game.assignCallbacksToMobBtnEvents();
    HF.getEl("#mobile_btns").style.display = "flex";
  } else canvas.height = window.innerHeight - 30;

  game.update();

  // const btnPlayAgain = HF.getEl(".modal__buttons button:first-child");
  // btnPlayAgain.addEventListener("click", game.onPlayAgainClick);
};

//for testing
let a = (i, n) => {
  if (i == n - 1) return;
  snake.tail[i] = {
    x: snake.x - n * 2 + (i + 1) * 2,
    y: snake.y,
  };
  a(++i, n);
};
a(0, 30);
