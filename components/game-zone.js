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
    this.animationFrameId;
    this.step = 0.05;

    this.setStyles();
    this.setMazeMatrix();
    this.addMazeBlocks();
    this.snake = this.addVenomSnake();
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
    this.style.display = `block`;
  }

  setMazeMatrix() {
    for (let i = 0; i < this.columns; i++) {
      this.mazeMatrix[i] = [];

      for (let j = 0; j < this.rows; j++) {
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
    let buildingBlockClass = customElements.get("building-block");

    for (let i = 0; i < this.columns; i++) {
      for (let j = 0; j < this.rows; j++) {
        if (this.mazeMatrix[i][j]) {
          let buildingBlock = new buildingBlockClass({
            xPosition: i,
            yPosition: j,
            cellSize: this.cellSize
          });
          this.appendChild(buildingBlock);
        }
      }
    }
  }

  addVenomSnake() {
    let venomSnakeClass = customElements.get("venom-snake");
    let venomSnake = new venomSnakeClass({
      xPosition: Math.floor(this.rows / 2),
      yPosition: Math.floor(this.columns / 2),
      cellSize: this.cellSize
    });

    this.appendChild(venomSnake);

    return venomSnake;
  }

  startGame() {
    // this.animationFrameId = requestAnimationFrame(this.gameFrame.bind(this));

    this.step = 1;
    setInterval(this.gameFrame.bind(this), 500);
  }

  gameFrame() {
    this.snake.moveSnake(this.step);

    // this.animationFrameId = requestAnimationFrame(this.gameFrame.bind(this));
  }

  addKeydownListeners() {
    document.addEventListener("keydown", this.keydownHandler.bind(this));
  }

  mazeCollisionCheck() {

  }

  keydownHandler(event) {
    switch (event.keyCode) {
      case keyCodes.arrowLeft:
        this.snake.setXDirection(-1);
        break;
      case keyCodes.arrowRight:
        this.snake.setXDirection(1);
        break;
      case keyCodes.arrowDown:
        this.snake.setYDirection(1);
        break;
      case keyCodes.arrowUp:
        this.snake.setYDirection(-1);
        break;
    }
  }
}

customElements.define('game-zone', GameZone);