import dot from "./dot.js";
import HF from "./helper/helper.js";
import snake from "./snake.js";
import { context } from "./test.js";

class Game {
  IsSnakeHittingItself() {
    return snake.tail
      .slice(0, snake.tail.length - 1)
      .some(({ x, y }) => snake.x - x == 0 && snake.y - y == 0);
  }
  checkUserAction = (e) => {
    if (e.key == "ArrowUp") snake.direction = "top";
    else if (e.key == "ArrowDown") snake.direction = "bottom";
    else if (e.key == "ArrowLeft") snake.direction = "left";
    else if (e.key == "ArrowRight") snake.direction = "right";
    else if (e.key == " ") {
      let stop = snake.stop;
      snake.stop = !snake.stop;
      if (stop) {
        this.update();
      }
    }
  };
  update = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    snake.updateSnake();
    snake.draw(snake);
    dot.draw();
    if (!snake.stop) requestAnimationFrame(this.update);
  };
  updateScore() {
    if (Math.abs(snake.x - dot.x) <= 5 && Math.abs(snake.y - dot.y) <= 5) {
      dot.isEaten = true;
      snake.score++;
      HF.setHtml(".score", snake.score);
    }
  }
}
const game = new Game();
export default game;
