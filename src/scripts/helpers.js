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

export const scrollControll = e => {
  if (e.pageY < 100) {
    console.log("siema");
  } else {
    console.log("buuu" + " " + e.pageY);
  }
};

export const letterTransition = (el, cls) => {
  const frag = textToSpans(el, cls);
  el.textContent = "";
  el.appendChild(frag);
};
