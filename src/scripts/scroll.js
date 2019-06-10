import { letterTransition } from "./helpers";
import aboutMe from "./aboutMe";
import throttle from "lodash.throttle";

export default class {
  constructor() {
    this.landing = document.querySelector(".landing");
    this.hello = this.landing.querySelector(".header-hello");
    this.name = this.landing.querySelector(".header-name");
    this.photo = this.landing.querySelector(".landing__photo");
    this.socialText = this.landing.querySelector(".social-text");
    this.aboutMe = new aboutMe();

    this.scrollControl = this.scrollControl.bind(this);
    this.init = this.init.bind(this);
  }
  headerPhoto(y) {
    this.photo.style.transform = `translateY(${y}px)`;
    this.photo.style.opacity = `${1 - y / 360}`;
  }
  scrollControl() {
    const y = window.pageYOffset;
    this.headerPhoto(y);
    if (y < 150) {
      this.landing.classList.remove("landing--inactive");
      this.aboutMe.exit();
    } else if (y >= 100) {
      this.landing.classList.add("landing--inactive");
      this.aboutMe.init();
    }
  }
  init() {
    letterTransition(this.name, "header-letter");
    letterTransition(this.socialText, "social-letters");
    window.addEventListener("scroll", throttle(this.scrollControl, 100));
  }
}
