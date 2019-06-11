const textToSpans = (el, clName) => {
  const frag = document.createDocumentFragment();
  const textArr = el.textContent.split("");
  const spans = textArr.map(letter => {
    const span = document.createElement("span");
    span.classList.add(clName);
    span.textContent = letter;
    return span;
  });
  spans.forEach(el => frag.appendChild(el));
  return frag;
};
const createSpanLine = (el, clName, lWidth) => {
  const frag = document.createDocumentFragment();
  const wordsArr = el.textContent.split(" ");
  const lineArr = [];
  while (wordsArr.length > 0) {
    lineArr.push(wordsArr.splice(0, lWidth));
  }
  const spans = lineArr.map(line => {
    const spn = document.createElement("span");
    spn.classList.add(clName);
    spn.textContent = line.join(" ");
    return spn;
  });
  spans.forEach(line => {
    frag.push(line);
  });
  return frag;
};
export const letterTransition = (el, cls) => {
  const frag = textToSpans(el, cls);
  el.textContent = "";
  el.appendChild(frag);
};
export const assignX = e => {
  let x;
  if (typeof e.changedTouches !== "undefined") {
    x = e.changedTouches[0].pageX;
  } else {
    x = e.clientX;
  }
  return x;
};
export const setArticleCssProps = (element, x, opacity) => {
  element.style.transform = `translateX(${x}px)`;
  element.style.opacity = opacity;
};
export const currentSlideController = (
  slideLength,
  slideChageScope,
  currentSlide
) => {
  if (slideLength < 0 && Math.abs(slideLength) > slideChageScope) {
    currentSlide > 1 ? currentSlide-- : null;
  } else if (slideLength > 0 && Math.abs(slideLength) > slideChageScope) {
    currentSlide < 3 ? currentSlide++ : null;
  }
  return currentSlide;
};
export const artMovementController = (
  swipeLength,
  slideChageScope,
  currentArticle,
  endMoveHandler,
  e
) => {
  if (swipeLength < 0 && Math.abs(swipeLength) < slideChageScope) {
    setArticleCssProps(currentArticle.firstElementChild, 100, 0.75);
    setArticleCssProps(currentArticle.lastElementChild, 50, 0.75);
  } else if (swipeLength > 0 && Math.abs(swipeLength) < slideChageScope) {
    setArticleCssProps(currentArticle.firstElementChild, -100, 0.75);
    setArticleCssProps(currentArticle.lastElementChild, -50, 0.75);
  } else {
    endMoveHandler(e);
  }
};
