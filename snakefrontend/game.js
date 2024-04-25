import dot from "./dot.js";
import BE from "./helper/backend.js";
import UISTR from "./helper/constants.js";
import HF from "./helper/helper.js";
import util from "./helper/util.js";
import snake from "./snake.js";
import { canvas, context } from "./test.js";

class Game {
  constructor() {
    this.highestscore = 0;
  }
  IsSnakeHittingItself() {
    return snake.tail.some(({ x, y }) => snake.x - x == 0 && snake.y - y == 0);
  }
  checkUserAction = (e) => {
    e.stopPropagation();
    if (e.key == "ArrowUp" || e.target.id == "uparrow") snake.direction = "top";
    else if (e.key == "ArrowDown" || e.target.id == "downarrow")
      snake.direction = "bottom";
    else if (e.key == "ArrowLeft" || e.target.id == "leftarrow")
      snake.direction = "left";
    else if (e.key == "ArrowRight" || e.target.id == "rightarrow")
      snake.direction = "right";
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
  checkIsSnakeHittingItself() {
    if (game.IsSnakeHittingItself()) {
      snake.stop = true;
      this.updateScoreOnUI(snake.score);
    }
  }
  updateScoreOnUI(score) {
    if (score > this.highestscore) {
      this.highestscore = score;
      BE.updateScoreInBackend(this.highestscore);
    }
    util.setActiveCardInModal(UISTR.MODAL_INFO);
    util.addListener(
      ".modal__buttons button:first-child",
      "click",
      game.onPlayAgainClick
    );
    HF.setHtml(".scoretext", score);
    HF.setHtml(".highestscoretext", this.highestscore);
    util.setVisiblity(".modal", "visible");
    HF.getEl(".modalInfo").classList.add("modalInfoActive");
  }
  resetGame() {
    HF.getEl(".modalInfo").classList.remove("modalInfoActive");
  }
  onPlayAgainClick() {
    snake.reset();
    game.resetGame();
    HF.setHtml(".score", snake.score);
    HF.getEl(".modal").style.visibility = "hidden";
  }
  assignCallbacksToMobBtnEvents() {
    ["#uparrow", "#downarrow", "#leftarrow", "#rightarrow"].forEach(
      (selector) => {
        HF.getEl(selector).onclick = this.checkUserAction;
        console.log(HF.getEl(selector));
      }
    );
  }
}
const game = new Game();
export default game;
