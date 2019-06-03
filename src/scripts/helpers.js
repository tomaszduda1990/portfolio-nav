export const textToSpans = (el, clName) => {
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
