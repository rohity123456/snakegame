import dot from "./dot.js";
import HF from "./helper/helper.js";
import snake from "./snake.js";
//get Canvas element

const canvas = HF.getEl("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
export const context = canvas.getContext("2d");
//debugger;

const fixDPI = () => {
  const canvas = HF.getEl("canvas");
  const w = parseInt(getComputedStyle(canvas).getPropertyValue("width"));
  const h = parseInt(getComputedStyle(canvas).getPropertyValue("height"));
  const DPI = window.devicePixelRatio;
  canvas.setAttribute("height", h * DPI);
  canvas.setAttribute("width", w * DPI);
};

export const update = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  snake.updateSnake();
  snake.draw(snake);
  dot.draw();
  if (!snake.stop) requestAnimationFrame(update);
};

window.addEventListener("keydown", HF.checkUserAction);
update();
