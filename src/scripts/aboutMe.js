import throttle from "lodash.throttle";
import {
  assignX,
  setArticleCssProps,
  currentSlideController,
  artMovementController,
  letterTransition
} from "./helpers";
export default class {
  constructor() {
    this.section = document.querySelector(".about-me");
    this.container = this.section.querySelector(".articles__container");
    this.buttons = this.section.querySelectorAll(".dot");
    this.header = this.section.querySelector("h2");
    this.currentSlide = 1;
    this.gridGap = 100;
    this.isMoving = false;
    this.pos = {
      start: 0,
      end: 0
    };
    this.slideChageScope = 100;
    this.init = this.init.bind(this);
    this.moveContainer = this.moveContainer.bind(this);
    this.moveSideEffects = this.moveSideEffects.bind(this);
    this.buttonHandler = this.buttonHandler.bind(this);
    this.startMoveHandler = this.startMoveHandler.bind(this);
    this.moveArticleElementsHandler = this.moveArticleElementsHandler.bind(
      this
    );
    this.throttledMoveArticle = throttle(this.moveArticleElementsHandler, 350);
    this.endMoveHandler = this.endMoveHandler.bind(this);
    this.exit = this.exit.bind(this);
  }

  startMoveHandler(e) {
    if (!this.isMoving) {
      this.pos.start = assignX(e);
      this.isMoving = true;
    }
  }
  endMoveHandler(e) {
    if (this.isMoving) {
      this.pos.end = assignX(e);
      const slideLength = this.pos.start - this.pos.end;
      const currentArticle = this.container.querySelector(
        `article[data-page="${this.currentSlide}"]`
      );
      setArticleCssProps(currentArticle.firstElementChild, 0, 0);
      setArticleCssProps(currentArticle.lastElementChild, 0, 0);

      this.currentSlide = currentSlideController(
        slideLength,
        this.slideChageScope,
        this.currentSlide
      );

      this.moveContainer(this.currentSlide);
      this.isMoving = false;
      const newArticle = this.container.querySelector(
        `article[data-page="${this.currentSlide}"]`
      );
      setArticleCssProps(newArticle.firstElementChild, 0, 1);
      setArticleCssProps(newArticle.lastElementChild, 0, 1);
    }
  }
  moveContainer(slide) {
    const artWidth = this.container.querySelector("article").clientWidth * 2;
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
      const x = assignX(e);
      const swipeLength = this.pos.start - x;
      const currentArticle = this.container.querySelector(
        `article[data-page="${this.currentSlide}"]`
      );

      artMovementController(
        swipeLength,
        this.slideChageScope,
        currentArticle,
        this.endMoveHandler,
        e
      );
    }
  }
  buttonHandler(e) {
    const slide = parseInt(e.target.dataset.page);
    this.currentSlide = slide;
    this.moveContainer(slide);
    const currentArticle = this.container.querySelector(
      `article[data-page="${this.currentSlide}"]`
    );
    setArticleCssProps(currentArticle.firstElementChild, 0, 1);
    setArticleCssProps(currentArticle.lastElementChild, 0, 1);
  }

  init() {
    this.section.classList.remove("about-me--inactive");
    letterTransition(this.header, "letter");
    // button events
    this.buttons.forEach(btn =>
      btn.addEventListener("click", this.buttonHandler)
    );
    // mouse events
    this.section.addEventListener("mousedown", this.startMoveHandler);
    this.section.addEventListener("mouseup", this.endMoveHandler);
    this.section.addEventListener("mousemove", this.throttledMoveArticle);
    // touch events
    this.section.addEventListener("touchmove", this.throttledMoveArticle);
    this.section.addEventListener("touchstart", this.startMoveHandler);
    this.section.addEventListener("touchend", this.endMoveHandler);
  }
  exit() {
    this.currentSlide = 1;
    this.moveContainer(this.currentSlide);
    this.section.classList.add("about-me--inactive");
    // button events
    this.buttons.forEach(btn =>
      btn.removeEventListener("click", this.buttonHandler)
    );
    // mouse events
    this.section.removeEventListener("mousedown", this.startMoveHandler);
    this.section.removeEventListener("mouseup", this.endMoveHandler);
    this.section.removeEventListener("mousemove", this.throttledMoveArticle);
    // touch events
    this.section.removeEventListener("touchmove", this.throttledMoveArticle);
    this.section.removeEventListener("touchstart", this.startMoveHandler);
    this.section.removeEventListener("touchend", this.endMoveHandler);
  }
}

// apply mediaqueries and enter
// leave animations, eventually fix issue with currentIndex
// when scroll out
