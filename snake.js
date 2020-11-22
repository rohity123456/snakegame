import dot from "./dot";
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
    this.score = 0;
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
    for (let i = 0; i < snake.tail.length - 1; i++)
      snake.tail[i] = snake.tail[i + 1];
    if (snake.score > 0)
      snake.tail[snake.score - 1] = { x: snake.x, y: snake.y };
    let { x, y, direction, speed } = snake;

    switch (direction) {
      case "left": {
        if (x + snake.width < 0) {
          snake.x = canvas.width;
        } else snake.x -= speed;
        if (snake.y > canvas.height) {
          snake.y = canvas.height - 10;
        }
        if (snake.y < 0) {
          snake.y = canvas.height + 10;
        }
        break;
      }
      case "right": {
        if (x - snake.width > canvas.width) {
          snake.x = -snake.width;
        } else snake.x += speed;
        if (snake.y > canvas.height) {
          snake.y = canvas.height - 10;
        }
        if (snake.y < 0) {
          snake.y = canvas.height + 10;
        }
        break;
      }
      case "bottom": {
        if (y - snake.height > canvas.height) {
          snake.y = -snake.height;
        } else snake.y += speed;
        if (snake.x > canvas.width) {
          snake.x = canvas.width - 10;
        }
        if (snake.x < 0) {
          snake.x = canvas.width + 10;
        }
        break;
      }
      case "top": {
        if (y + snake.height < 0) {
          snake.y = canvas.height;
        } else snake.y -= speed;
        if (snake.x > canvas.width) {
          snake.x = canvas.width - 10;
        }
        if (snake.x < 0) {
          snake.x = canvas.width + 10;
        }
        break;
      }
    }

    if (Math.abs(snake.x - dot.x) <= 5 && Math.abs(snake.y - dot.y) <= 5) {
      dot.isEaten = true;
      snake.score++;
    }
  };
}

const snake = new Snake();
export default snake;
