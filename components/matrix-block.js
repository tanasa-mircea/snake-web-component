class MatrixBlock extends HTMLElement {
  constructor(config) {
    super();

    this.cellSize = config.cellSize;
  }

  connectedCallback() {
    this.setWidthAndHeight();
  }

  setWidthAndHeight() {
    this.style.height = `${this.cellSize}px`;
    this.style.width = `${this.cellSize}px`;
  }

  enable() {
    this.classList.add("active");
  }

  disable() {
    this.classList.remove("active");
  }
}

customElements.define('matrix-block', MatrixBlock);