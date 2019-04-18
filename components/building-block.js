class BuildingBlock extends HTMLElement {
  constructor(config) {
    super();
    this.backgroundColor = "#fff";
    this.cellSize = config.cellSize;
    this.xPosition = config.xPosition;
    this.yPosition = config.yPosition;
    this.additionalClass = config.additionalClass;
  }

  // Hooks are not inherited
  connectedCallback() {
    this.setStyles();
  }

  setStyles() {
    if (this.additionalClass) {
      this.classList.add(this.additionalClass)
    }

    this.classList.add("building-block");
    this.style.width = `${this.cellSize}px`;
    this.style.height = `${this.cellSize}px`;
    this.style.backgroundColor = `${this.backgroundColor}`;
    this.style.transform = `translate(${this.xPosition * this.cellSize}px, ${this.yPosition * this.cellSize}px)`;
  }

  getPosition() {
    return {
      xPosition: this.xPosition,
      yPosition: this.yPosition
    }
  }
}

customElements.define('building-block', BuildingBlock);