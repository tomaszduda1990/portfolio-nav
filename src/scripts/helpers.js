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
export const letterTransition = (el, cls) => {
  const frag = textToSpans(el, cls);
  el.textContent = "";
  el.appendChild(frag);
};
