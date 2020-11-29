import dot from "./dot";
import game from "./game";
import { context } from "./test";
class Snake {
  constructor(width = 10, height = 10, speed = 2) {
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.x = 500;
    this.y = 100;
    this.direction = "right";
    this.stop = false;
    this.score = 30;
    this.tail = [];
  }
  draw = ({ x, y, width, height, direction }) => {
    context.fillStyle = "red";
    snake.tail.forEach((tail) => {
      context.fillRect(tail.x, tail.y, width, height);
    });
    context.fillRect(x, y, width, height);
  };
  updateSnake = () => {
    const snake = this;
    game.checkIsSnakeHittingItself();
    this.updateSnakeTail();
    game.updateScore();
    switch (snake.direction) {
      case "left": {
        this.goLeft();
        break;
      }
      case "right": {
        this.goRight();
        break;
      }
      case "bottom": {
        this.goBottom();

        break;
      }
      case "top": {
        this.goTop();

        break;
      }
    }
  };
  goLeft() {
    if (snake.x + snake.width < 0) {
      snake.x = canvas.width;
    } else snake.x -= snake.speed;
    if (snake.y > canvas.height) {
      snake.y = canvas.height - 10;
    }
    if (snake.y < 0) {
      snake.y = canvas.height + 10;
    }
  }
  goRight() {
    if (snake.x - snake.width > canvas.width) {
      snake.x = -snake.width;
    } else snake.x += snake.speed;
    if (snake.y > canvas.height) {
      snake.y = canvas.height - 10;
    }
    if (snake.y < 0) {
      snake.y = canvas.height + 10;
    }
  }
  goTop() {
    if (snake.y + snake.height < 0) {
      snake.y = canvas.height;
    } else snake.y -= snake.speed;
    if (snake.x > canvas.width) {
      snake.x = canvas.width - 10;
    }
    if (snake.x < 0) {
      snake.x = canvas.width + 10;
    }
  }
  goBottom() {
    if (snake.y - snake.height > canvas.height) {
      snake.y = -snake.height;
    } else snake.y += snake.speed;
    if (snake.x > canvas.width) {
      snake.x = canvas.width - 10;
    }
    if (snake.x < 0) {
      snake.x = canvas.width + 10;
    }
  }
  updateSnakeTail() {
    for (let i = 0; i < snake.tail.length - 1; i++) {
      snake.tail[i] = snake.tail[i + 1];
    }
    if (snake.score > 0)
      snake.tail[snake.score - 1] = { x: snake.x, y: snake.y };
  }
  reset() {
    this.tail = [];
    this.score = 0;
    this.stop = false;
    game.update();
  }
}

const snake = new Snake();
export default snake;
