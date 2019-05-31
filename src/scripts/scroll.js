export default class {
  constructor() {
    this.init = this.init.bind(this);
  }
  headerPhoto(y) {
    const photo = document.querySelector(".landing__photo");
    photo.style.transform = `translateY(${y}px)`;
    photo.style.opacity = `${1 - y / 360}`;
  }
  init() {
    const self = this;
    window.addEventListener("scroll", function(e) {
      console.log(e.pageY);
      self.headerPhoto(e.pageY);
    });
  }
}
