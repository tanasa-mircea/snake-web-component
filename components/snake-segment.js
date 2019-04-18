class SnakeSegment extends BuildingBlock {
  constructor(config) {
    super(config);

    this.xDirection = config.xDirection;
    this.yDirection = config.yDirection;
  }

  connectedCallback() {
    this.setStyles();
  }

  getDirection() {
    return {
      xDirection: this.xDirection,
      yDirection: this.yDirection
    }
  }

  setDirection(newDirections) {
    this.xDirection = newDirections.xDirection;
    this.yDirection = newDirections.yDirection;
  }

  setPosition(newPosition) {
    this.xPosition = newPosition.xPosition;
    this.yPosition = newPosition.yPosition;
  }

  updateStylePosition() {
    let newX = this.xPosition * this.cellSize;
    let newY = this.yPosition * this.cellSize;

    this.style.transform = `translate(${newX}px, ${newY}px)`;
  }
}

customElements.define('snake-segment', SnakeSegment);