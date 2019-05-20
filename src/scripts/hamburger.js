export default class {
  constructor() {
    this.button = document.querySelector(".hamburger");
    this.links = document.querySelector(".links");

    this.toggleMenu = this.toggleMenu.bind(this);
  }
  toggleMenu() {
    this.button.classList.toggle("hamburger--active");
    this.links.classList.toggle("links--active");
  }
  init() {
    this.button.addEventListener("click", this.toggleMenu);
  }
}
