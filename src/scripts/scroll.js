import { letterTransition, createSpanLine } from "./helpers";
import AboutMe from "./aboutMe";
import Skills from "./skills";
import throttle from "lodash.throttle";

export default class {
  constructor() {
    this.landing = document.querySelector(".landing");
    this.hello = this.landing.querySelector(".header-hello");
    this.name = this.landing.querySelector(".header-name");
    this.photo = this.landing.querySelector(".landing__photo");
    this.socialText = this.landing.querySelector(".social-text");
    this.aboutMe = new AboutMe();
    this.skills = new Skills();

    this.borders = [];
    this.scrollControl = this.scrollControl.bind(this);
    this.init = this.init.bind(this);
  }
  headerPhoto(y) {
    if (1 - y / 550 > 0) {
      this.photo.style.transform = `translateY(${y}px)`;
      this.photo.style.opacity = `${1 - y / 550}`;
    } else {
      this.photo.style.opacity = 0;
    }
  }
  scrollControl() {
    const y = window.pageYOffset;
    this.headerPhoto(y);
    this.skills.unveilLi(y);
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
    this.aboutMe.articles.forEach(art =>
      createSpanLine(art, "article-line", 6)
    );
    this.aboutMe.articleHeaders.forEach(header =>
      createSpanLine(header, "article-header", 10)
    );
    // investigate this issue  ---------------------------
    console.log(this.skills.ps);
    this.skills.ps.forEach(p =>
      console.log(p.textContent.match(/\b(\w+\W+)/g))
    );
    // investigate this issue  ---------------------------
    letterTransition(this.name, "header-letter");
    letterTransition(this.socialText, "social-letters");
    letterTransition(this.aboutMe.header, "letter");
    window.addEventListener("scroll", throttle(this.scrollControl, 100));
  }
}
