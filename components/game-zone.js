const keyCodes = {
  "arrowLeft": 37,
  "arrowRight": 39,
  "arrowDown": 40,
  "arrowUp": 38,
}

class GameZone extends HTMLElement {
  constructor() {
    super();
    this.rows = 20;
    this.columns = 20;
    this.cellSize = 30;
    this.backgroundColor = "#000";

    this.mazeMatrix = [];
    this.blocksMatrix = [];
    this.venomSnake = [];
    this.animationFrameRef = null;

    this.xDirection = 1;
    this.yDirection = 0;

    this.snakeSize = 3;

    this.setStyles();
    this.setupMatrix();
    this.addMazeBlocks();

    this.addSnake();
  }

  connectedCallback() {
    this.startGame();
    this.addKeydownListeners();
  }

  setStyles() {
    this.classList.add("game-zone");
    this.style.width = `${this.columns * this.cellSize}px`;
    this.style.height = `${this.rows * this.cellSize}px`;
    this.style.backgroundColor = `${this.backgroundColor}`;
  }

  setupMatrix() {
    for (let i = 0; i < this.rows; i++) {
      this.mazeMatrix[i] = [];

      for (let j = 0; j < this.columns; j++) {
        if (i === 0 ||
            i === this.rows - 1 ||
            j === 0 ||
            j === this.columns - 1) {
          this.mazeMatrix[i][j] = 1;
        } else {
          this.mazeMatrix[i][j] = 0;
        }
      }
    }
  }

  addMazeBlocks() {
    let matrixBlockClass = customElements.get("matrix-block");

    for (let i = 0; i < this.rows; i++) {
      this.blocksMatrix[i] = [];

      for (let j = 0; j < this.columns; j++) {
        let buildingBlock = new matrixBlockClass({
          cellSize: this.cellSize
        });
        this.blocksMatrix[i][j] = buildingBlock;
        this.appendChild(buildingBlock);

        if (this.mazeMatrix[i][j]) {
          buildingBlock.enable();
        }
      }
    }
  }

  addSnake() {
    for (let i = 0; i < this.snakeSize; i++) {
      let blockX = Math.floor(this.columns / 2) - i;
      let blockY = Math.floor(this.rows / 2);

      this.mazeMatrix[blockY][blockX] = 1;

      this.venomSnake.push({
        x: blockX,
        y: blockY
      });
    }
  }

  moveSnake() {
    let snakeLength = this.venomSnake.length;
    let horizontalStep = 1 * this.xDirection;
    let verticalStep = 1 * this.yDirection;
    let previousVenomSnake = this.venomSnake.map(snakeBlock => {
      return {
        x: snakeBlock.x,
        y: snakeBlock.y
      }
    });

    let snakeHead = this.venomSnake[0];
    let newHeadCoords = {
      x: snakeHead.x + horizontalStep,
      y: snakeHead.y + verticalStep
    }

    this.venomSnake[0] = {
      x: newHeadCoords.x,
      y: newHeadCoords.y
    }

    if (!this.mazeMatrix[newHeadCoords.y] || this.mazeMatrix[newHeadCoords.y][newHeadCoords.x] === 1) {
      this.gameOver();
      return;
    }

    this.mazeMatrix[snakeHead.y][snakeHead.x] = 0;
    this.mazeMatrix[newHeadCoords.y][newHeadCoords.x] = 1;

    for (let i = 1; i < snakeLength; i++) {
      let prevCoords = this.venomSnake[i];

      let newCoords = {
        x: previousVenomSnake[i - 1].x,
        y: previousVenomSnake[i - 1].y
      }

      this.mazeMatrix[prevCoords.y][prevCoords.x] = 0;
      this.mazeMatrix[newCoords.y][newCoords.x] = 1;

      this.venomSnake[i] = {
        x: newCoords.x,
        y: newCoords.y
      }
    }
  }

  refreshRenderedBlocks() {
    for (let i = 0; i < this.columns; i++) {
      for (let j = 0; j < this.rows; j++) {
        if (this.mazeMatrix[i][j]) {
          this.blocksMatrix[i][j].enable();
        } else {
          this.blocksMatrix[i][j].disable();
        }
      }
    }
  }

  startGame() {
    this.gameStarted = true;

    setInterval(() => {
      this.moveSnake();
    }, 300);

    this.animationFrameRef = requestAnimationFrame(this.gameFrame.bind(this));
  }

  gameFrame() {
    if (!this.gameStarted) {
      return;
    }

    this.refreshRenderedBlocks();
    requestAnimationFrame(this.gameFrame.bind(this));
  }

  addKeydownListeners() {
    document.addEventListener("keydown", this.keydownHandler.bind(this));
  }

  setXDirection(newDirection) {
    if (!this.xDirection) {
      this.xDirection = newDirection;
      this.yDirection = 0;
    }
  }

  setYDirection(newDirection) {
    if (!this.yDirection) {
      this.xDirection = 0;
      this.yDirection = newDirection;
    }
  }

  keydownHandler(event) {
    switch (event.keyCode) {
      case keyCodes.arrowLeft:
        this.setXDirection(-1);
        break;
      case keyCodes.arrowRight:
        this.setXDirection(1);
        break;
      case keyCodes.arrowDown:
        this.setYDirection(1);
        break;
      case keyCodes.arrowUp:
        this.setYDirection(-1);
        break;
    }
  }

  gameOver() {
    cancelAnimationFrame(this.animationFrameRef);
    this.animationFrameRef = null;
    this.gameStarted = false;
  }
}

customElements.define('game-zone', GameZone);