import "./styles.scss";
import Ham from "./scripts/hamburger";
import Scroll from "./scripts/scroll";

class App {
  constructor(Ham) {
    this.ham = new Ham();
    this.scroll = new Scroll();
  }
  init() {
    this.ham.init();
    this.scroll.init();
  }
}

const app = new App(Ham);
app.init();
