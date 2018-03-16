var SnakeGame = (function (self) {
    //create unit
    var context;
    var box = 32;
    var ground = new Image();
    ground.src = "./images/ground.png";
    var foodImg = new Image();
    foodImg.src = "./images/food.png";
    var snake = [];
    var food, score, game, d;
    self.initialize = function () {
        snake = [];
        d = "";
        snake[0] = {
            x: 9 * box,
            y: 9 * box
        }
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
        score = 0;
        game = setInterval(draw, 100);
        document.addEventListener('keydown', direction);
    }
    self.playAgain = function () {
        document.getElementById("gameOver").style.display = "none";
        initialize();
    }
    self.draw = function () {
        context.drawImage(ground, 0, 0);

        for (i = 0; i < snake.length; i++) {
            context.fillStyle = (i == 0) ? "green" : "white";
            context.fillRect(snake[i].x, snake[i].y, box, box);
            context.strokeStyle = "Red";
            context.strokeRect(snake[i].x, snake[i].y, box, box);
        }
        context.drawImage(foodImg, food.x, food.y);
        context.fillStyle = "white";
        context.font = "45px Changa one"
        context.fillText(score, 2 * box, 1.6 * box);
        var newX = snake[0].x,
            newY = snake[0].y;
        if (d == "LEFT") {
            newX -= box;
        } else if (d == "RIGHT") {
            newX += box;
        } else if (d == "UP") {
            newY -= box;
        } else if (d == "DOWN") {
            newY += box;
        }
        var newHead = {
            x: newX,
            y: newY
        }
        if (newX == food.x && newY == food.y) {
            score++;
            food = {
                x: Math.floor(Math.random() * 17 + 1) * box,
                y: Math.floor(Math.random() * 15 + 3) * box
            }
        } else {
            snake.pop();
        }

        if (newX < box || newX > box * 17 || newY < box * 3 || newY > box * 17) {
            gameOver();
        }
        for (i = 0; i < snake.length; i++) {
            if (snake[i].x == newX && snake[i].y == newY) {
                gameOver();
            }
        }
        snake.unshift(newHead);
    }
    self.gameOver = function () {
        clearInterval(game);
        document.getElementById('gameOver').style.display = "block";
    }
    self.direction = function () {
        if (event.keyCode == 37 && d != "RIGHT") {
            d = "LEFT";

        } else if (event.keyCode == 38 && d != "DOWN") {
            d = "UP";

        } else if (event.keyCode == 39 && d != "LEFT") {
            d = "RIGHT";

        } else if (event.keyCode == 40 && d != "UP") {
            d = "DOWN";
        }
    }
    self.onload = function () {
        var cvs = document.getElementById("myCanvas");
        context = cvs.getContext("2d");
        initialize();

    };
})(window);