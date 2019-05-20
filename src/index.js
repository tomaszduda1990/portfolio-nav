import "./styles.scss";
import Ham from "./scripts/hamburger";

class App {
  constructor(Ham) {
    this.ham = new Ham();
  }
  init() {
    this.ham.init();
  }
}

const app = new App(Ham);
app.init();
