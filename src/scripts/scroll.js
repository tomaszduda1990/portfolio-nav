import { textToSpans } from "./helpers";

export default class {
  constructor() {
    this.init = this.init.bind(this);
  }
  headerPhoto(y) {
    const photo = document.querySelector(".landing__photo");
    photo.style.transform = `translateY(${y}px)`;
    photo.style.opacity = `${1 - y / 360}`;
  }
  // test function ------------------------------------

  test(el) {
    const frag = textToSpans(el, "jupi");
    console.log(frag);
    el.textContent = "";
    el.appendChild(frag);
  }

  // end of test function ----------------------------
  init() {
    const self = this;
    window.addEventListener("scroll", function(e) {
      self.test(document.querySelector(".header-name"));
      self.headerPhoto(e.pageY);
    });
  }
}
