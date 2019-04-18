const startXDirection = 1;
const startYDirection = 0;

class VenomSnake extends HTMLElement {
  constructor(config) {
    super();

    this.segments = [];
    this.cellSize = config.cellSize;
    this.snakeSegmentClass = customElements.get("snake-segment");

    let snakeHead = new this.snakeSegmentClass({
      additionalClass: "head",
      xPosition: config.xPosition,
      yPosition: config.yPosition,
      xDirection: startXDirection,
      yDirection: startYDirection,
      cellSize: this.cellSize
    });

    this.segments.push(snakeHead);
    this.addSegment();
    this.addSegment();
    this.addSegment();
    this.addSegment();
    this.addSegment();
    this.addSegment();
    this.addSegment();
  }

  connectedCallback() {
    this.renderAllSegments();
  }

  renderAllSegments() {
    for (let i = 0; i < this.segments.length; i++) {
      this.appendChild(this.segments[i]);
    }
  }

  addSegment() {
    let previousSegment = this.segments[this.segments.length - 1];
    let previousSegmentPosition = previousSegment.getPosition();
    let previousSegmentDirection = previousSegment.getDirection();

    let segment = new this.snakeSegmentClass({
      xPosition: previousSegmentPosition.xPosition - previousSegmentDirection.xDirection,
      yPosition: previousSegmentPosition.yPosition - previousSegmentDirection.yDirection,
      xDirection: previousSegmentDirection.xDirection,
      yDirection: previousSegmentDirection.yDirection,
      cellSize: this.cellSize
    });

    this.segments.push(segment);
    this.appendChild(segment);
  }

  moveSnake(step) {
    let oldDirections = this.segments.map(segment => {
      return segment.getDirection();
    })

    for (let i = 0; i < this.segments.length; i++) {
      let previousSegmentDirection,
          currentSegment = this.segments[i],
          currentSegmentPosition = currentSegment.getPosition(),
          currentSegmentDirections = currentSegment.getDirection();

      if (i === 0) {
        previousSegmentDirection = oldDirections[i];
      } else {
        previousSegmentDirection = oldDirections[i - 1];
      }


      currentSegment.setPosition({
        xPosition: currentSegmentPosition.xPosition + currentSegmentDirections.xDirection * step,
        yPosition: currentSegmentPosition.yPosition + currentSegmentDirections.yDirection * step,
      })

      currentSegment.setDirection({
        xDirection: previousSegmentDirection.xDirection,
        yDirection: previousSegmentDirection.yDirection,
      })

      currentSegment.updateStylePosition();
    }
  }

  setXDirection(newDirection) {
    let snakeHead = this.segments[0],
        snakeHeadDirections = snakeHead.getDirection();

    if (snakeHeadDirections.xDirection === 0) {
      snakeHead.setDirection({
        xDirection: newDirection,
        yDirection: 0
      })
    }
  }

  setYDirection(newDirection) {
    let snakeHead = this.segments[0],
        snakeHeadDirections = snakeHead.getDirection();

    if (snakeHeadDirections.yDirection === 0) {
      snakeHead.setDirection({
        xDirection: 0,
        yDirection: newDirection
      })
    }
  }
}

customElements.define('venom-snake', VenomSnake);