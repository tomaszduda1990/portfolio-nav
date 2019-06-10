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
    this.borders = [];
    this.scrollControl = this.scrollControl.bind(this);
    this.init = this.init.bind(this);
  }
  headerPhoto(y) {
    if (1 - y / 360 > 0) {
      this.photo.style.transform = `translateY(${y}px)`;
      this.photo.style.opacity = `${1 - y / 360}`;
    }
  }
  scrollControl() {
    const y = window.pageYOffset;
    this.headerPhoto(y);
    const borders = [];
    document.querySelectorAll("section").forEach(section => {
      borders.push(section.offsetTop);
    });
    this.borders = borders;
    if (y < this.borders[0] + 100) {
      this.landing.classList.remove("landing--inactive");
    } else if (y >= this.borders[0] + 100 && y < this.borders[1] - 100) {
      this.landing.classList.add("landing--inactive");
      this.aboutMe.exit();
    } else if (y > this.borders[1] - 200 && y < this.borders[1]) {
      this.aboutMe.init();
    } else if (y > this.borders[1] + 100) {
      this.aboutMe.exit();
    }
  }
  init() {
    letterTransition(this.name, "header-letter");
    letterTransition(this.socialText, "social-letters");
    letterTransition(this.aboutMe.header, "letter");
    window.addEventListener("scroll", throttle(this.scrollControl, 100));
  }
}
