import snake from "../snake";
import { update } from "../test";
class HelperFunction {
  getEl = (selector) => document.querySelector(selector);
  setHtml = (selector, HTML) => {
    const el = document.querySelector(selector);
    el.innerHTML = HTML;
    return el;
  };
  generateRandomValues = (min, max) =>
    Math.floor(Math.random() * (max - min) + min);

  checkUserAction = (e) => {
    if (e.key == "ArrowUp") snake.direction = "top";
    else if (e.key == "ArrowDown") snake.direction = "bottom";
    else if (e.key == "ArrowLeft") snake.direction = "left";
    else if (e.key == "ArrowRight") snake.direction = "right";
    else if (e.key == " ") {
      let stop = snake.stop;
      snake.stop = !snake.stop;
      if (stop) {
        update();
      }
    }
  };
}
const HF = new HelperFunction();
console.log(HF);
export default HF;
