import dot from "./dot.js";
import game from "./game.js";
import HF from "./helper/helper.js";
import snake from "./snake.js";
//get Canvas element

const canvas = HF.getEl("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 100;
export const context = canvas.getContext("2d");

game.update();
window.addEventListener("keydown", game.checkUserAction);

//for testing
// let a = (i, n) => {
//   if (i == n - 1) return;
//   snake.tail[i] = {
//     x: snake.x - n * 2 + (i + 1) * 2,
//     y: snake.y,
//   };
//   a(++i, n);
// };
// a(0, 301);
