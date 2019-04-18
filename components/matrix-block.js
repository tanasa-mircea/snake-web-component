class MatrixBlock extends HTMLElement {
  constructor(config) {
    super();

    this.cellSize = config.cellSize;
    this.isActive = false;
  }

  connectedCallback() {
    this.setWidthAndHeight();
  }

  setWidthAndHeight() {
    this.style.height = `${this.cellSize}px`;
    this.style.width = `${this.cellSize}px`;
  }

  enable() {
    this.isActive = true;
    this.classList.add("active");
  }

  disable() {
    this.isActive = false;
    this.classList.remove("active");
  }
}

customElements.define('matrix-block', MatrixBlock);