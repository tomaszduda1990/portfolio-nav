import throttle from "lodash.throttle";
export default class {
  constructor() {
    this.section = document.querySelector(".about-me");
    this.container = this.section.querySelector(".articles__container");
    this.buttons = this.section.querySelectorAll(".dot");
    this.currentSlide = 1;
    this.isMoving = false;
    this.pos = {
      start: 0,
      end: 0
    };
    this.init = this.init.bind(this);
    this.moveContainer = this.moveContainer.bind(this);
    this.moveSideEffects = this.moveSideEffects.bind(this);
    this.buttonHandler = this.buttonHandler.bind(this);
    this.startMoveHandler = this.startMoveHandler.bind(this);
    this.moveArticleElementsHandler = this.moveArticleElementsHandler.bind(
      this
    );
    this.endMoveHandler = this.endMoveHandler.bind(this);
  }

  startMoveHandler(e) {
    console.log(e);
    let x;
    if (typeof e.changedTouches !== "undefined") {
      x = e.changedTouches[0].pageX;
    } else {
      x = e.clientX;
    }
    console.log(x);
    this.isMoving = true;
    this.pos.start = x;
  }
  endMoveHandler(e) {
    console.log(e);
    let x;
    if (typeof e.changedTouches !== "undefined") {
      x = e.changedTouches[0].pageX;
    } else {
      x = e.clientX;
    }
    console.log(x);
    this.pos.end = x;
    const slideLength = this.pos.start - this.pos.end;
    if (slideLength < 0 && Math.abs(slideLength) > 100) {
      this.currentSlide > 1 ? this.currentSlide-- : null;
    } else if (slideLength > 0 && Math.abs(slideLength) > 100) {
      this.currentSlide < 3 ? this.currentSlide++ : null;
    }
    this.moveContainer(this.currentSlide);
    this.isMoving = false;
  }
  moveContainer(slide) {
    const artWidth = this.container.querySelector("article").clientWidth;
    this.moveSideEffects(slide);
    switch (slide) {
      case 1:
        this.container.style.transform = `translateX(0)`;
        return;
      case 2:
        this.container.style.transform = `translateX(-${artWidth}px)`;
        return;
      case 3:
        this.container.style.transform = `translateX(-${artWidth * 2}px)`;
        return;
      default:
        return;
    }
  }
  moveSideEffects(slide) {
    const index = slide - 1;
    const colors = ["#252525", "#f7be18", "#3d405b"];

    this.buttons.forEach(item => {
      const i = item.dataset.page;
      i == slide
        ? item.classList.add("dot--active")
        : item.classList.remove("dot--active");
    });
    document.body.style.background = colors[index];
  }
  moveArticleElementsHandler(e) {
    if (this.isMoving) {
      console.log(e);
    }
  }
  buttonHandler(e) {
    const slide = parseInt(e.target.dataset.page);
    this.currentSlide = slide;
    this.moveContainer(slide);
  }

  init() {
    // button events
    this.buttons.forEach(btn =>
      btn.addEventListener("click", this.buttonHandler)
    );
    // mouse events
    this.section.addEventListener("mousedown", this.startMoveHandler);
    this.section.addEventListener("mouseup", this.endMoveHandler);
    this.section.addEventListener("mousemove", this.moveArticleElementsHandler);
    // touch events
    this.section.addEventListener("touchstart", this.startMoveHandler);
    this.section.addEventListener("touchend", this.endMoveHandler);
  }
}

// add on touch start / end and on mouse down / up events
// make a global X variable which will controll x move of h3 and p
// if X will be too big change currentSlide
