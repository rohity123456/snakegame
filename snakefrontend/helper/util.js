import HF from "./helper";

class Util {
  setActiveCardInModal(card) {
    const modal = HF.getEl(".modal");
    modal.innerHTML = "";
    modal.innerHTML = card;
  }
  setVisiblity(selector, visiblity) {
    HF.getEl(selector).style.visibility = visiblity;
  }
  addListener(selector, event, listener) {
    const element = HF.getEl(selector);
    if (element) element.addEventListener(event, listener);
  }
}
const util = new Util();
export default util;
