const { default: HF } = require("./helper/helper");
import { context } from "./test";
class Dot {
  constructor(width = 10, height = 10) {
    this.x = undefined;
    this.y = undefined;
    this.width = width;
    this.height = height;
    this.isEaten = true;
  }
  draw = () => {
    const dot = this;
    if (dot.isEaten) {
      dot.x = HF.generateRandomValues(10, canvas.width - 20);
      dot.y = HF.generateRandomValues(10, canvas.height - 20);
      dot.isEaten = false;
    }
    context.fillStyle = "yellow";
    context.fillRect(dot.x, dot.y, dot.width, dot.height);
  };
}
const dot = new Dot();
export default dot;
