import { letterTransition } from "./helpers";
import throttle from "lodash.throttle";

export default class {
  constructor() {
    this.landing = document.querySelector(".landing");
    this.hello = this.landing.querySelector(".header-hello");
    this.name = this.landing.querySelector(".header-name");
    this.photo = this.landing.querySelector(".landing__photo");
    this.socialText = this.landing.querySelector(".social-text");

    this.scrollControl = this.scrollControl.bind(this);
    this.init = this.init.bind(this);
  }
  headerPhoto(y) {
    this.photo.style.transform = `translateY(${y}px)`;
    this.photo.style.opacity = `${1 - y / 360}`;
  }
  scrollControl(e) {
    console.log(e);
    this.headerPhoto(e.pageY);
    if (e.pageY < 150) {
      this.landing.classList.remove("landing--inactive");
    } else if (e.pageY >= 150) {
      this.landing.classList.add("landing--inactive");
    }
  }
  init() {
    letterTransition(this.name, "header-letter");
    letterTransition(this.socialText, "social-letters");
    window.addEventListener("scroll", throttle(this.scrollControl, 100));
  }
}
