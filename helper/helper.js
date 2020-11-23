import snake from "../snake";
import { update } from "../test";
class HelperFunction {
  getEl = (selector) => document.querySelector(selector);
  setHtml = (selector, HTML) => {
    const el = document.querySelector(selector);
    el.innerHTML = HTML;
    return el;
  };
  generateRandomValues = (min, max) =>
    Math.floor(Math.random() * (max - min) + min);
}
const HF = new HelperFunction();
console.log(HF);
export default HF;
