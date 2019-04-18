class BonusBlock extends MatrixBlock {
  constructor(config) {
    super(config);

    this.attachShadow({mode: 'open'});
  }

  connectedCallback() {
    this.setWidthAndHeight();
    let style = document.createElement("style");
    style.textContent = `
      style {
        .active {
          border: 1px solid red;
        }
      }`
    this.shadowRoot.appendChild(style);
  }
}

customElements.define('bonus-block', BonusBlock);