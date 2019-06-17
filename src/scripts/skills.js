export default class {
  constructor() {
    this.section = document.querySelector(".skills");
    this.lis = this.section.querySelectorAll("li");
    this.ps = this.section.querySelectorAll("li p");
    this.unveilLi = this.unveilLi.bind(this);
  }
  unveilLi(scroll) {
    this.lis.forEach(li => {
      if (scroll + li.offsetHeight - li.offsetTop > 0) {
        li.classList.add("skill--active");
      }
    });
  }
}
