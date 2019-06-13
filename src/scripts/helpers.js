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

//created experimental function
export const createSpanLine = (el, clName, lWidth) => {
  const frag = document.createDocumentFragment();
  const text = el.textContent.match(/\b(\w+\W+)/g);
  console.log(text);
  el.textContent = "";
  const spliced = [];
  while (text.length > 0) {
    spliced.push(text.splice(0, lWidth));
  }
  const spans = spliced.map(span => {
    const spn = document.createElement("span");
    spn.textContent = span.join(" ");
    spn.classList.add(clName);
    return spn;
  });
  spans.forEach(el => {
    frag.appendChild(el);
  });
  el.appendChild(frag);
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
export const assignY = e => {
  let y;
  if (typeof e.changedTouches !== "undefined") {
    y = e.changedTouches[0].pageY;
  } else {
    y = e.clientY;
  }
  return y;
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
  if (swipeLength < -5 && Math.abs(swipeLength) < slideChageScope) {
    setArticleCssProps(currentArticle.firstElementChild, 100, 0.75);
    setArticleCssProps(currentArticle.lastElementChild, 50, 0.75);
  } else if (swipeLength > 5 && Math.abs(swipeLength) < slideChageScope) {
    setArticleCssProps(currentArticle.firstElementChild, -100, 0.75);
    setArticleCssProps(currentArticle.lastElementChild, -50, 0.75);
  } else {
    endMoveHandler(e);
  }
};
