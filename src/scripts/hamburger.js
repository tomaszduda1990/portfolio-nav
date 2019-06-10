export default class {
  constructor() {
    this.body = document.querySelector("body");
    this.button = document.querySelector(".hamburger");
    this.links = document.querySelector(".links");

    this.toggleMenu = this.toggleMenu.bind(this);
  }
  toggleMenu() {
    this.button.classList.toggle("hamburger--active");
    this.links.classList.toggle("links--active");
    if (window.screen.width < 900) {
      this.body.classList.toggle("stop-scrolling");
    }
  }
  init() {
    this.button.addEventListener("click", this.toggleMenu);
  }
}
