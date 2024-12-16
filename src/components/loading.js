import textCSS from '@/styles/components/loading.scss?inline';
import gsap from 'gsap';

const loadingTemplate = document.createElement('template');
loadingTemplate.innerHTML = `
  <style>
    ${textCSS}
  </style>
  <div class="loading">
    <div class="loading_wrapper">
      <h2><slot name="text">loading...</slot></h2>
      <div class="loading_inner"></div>
    </div>
  </div>
`;

export class Loading extends HTMLElement {
  #spinnerAnimation;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(loadingTemplate.content.cloneNode(true));

    const spinner = this.shadowRoot.querySelector('.loading_inner');
    this.#spinnerAnimation = gsap.to(spinner, {
      rotation: 360,
      duration: 2,
      repeat: -1,
      ease: 'none',
      paused: true,
    });
  }

  static get observedAttributes() {
    return ['text'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'text' && newValue) {
      const slot = this.shadowRoot.querySelector('slot[name="text"]');
      slot.textContent = newValue;
    }
  }

  show() {
    this.style.display = 'block';
    this.#spinnerAnimation.play();
  }

  hide() {
    this.style.display = 'none';
    this.#spinnerAnimation.pause();
  }
}

customElements.define('c-loading', Loading);
