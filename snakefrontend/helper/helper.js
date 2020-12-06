class HelperFunction {
  cookies = undefined;
  getEl = (selector) => document.querySelector(selector);
  setHtml = (selector, HTML) => {
    const el = document.querySelector(selector);
    el.innerHTML = HTML;
    return el;
  };
  createEl = (element, classList) => {
    const el = document.createElement(element);
    if (classList && classList.length) el.classList.add(...classList);
    return el;
  };
  appendMultipleChilds = (parentEl, chilrenElements) => {
    chilrenElements.forEach((childEl) => parentEl.append(childEl));
    return parentEl;
  };
  hideAllNonAuthElements() {
    document
      .querySelectorAll(".nonAuth")
      .forEach((element) => (element.style.display = "none"));
  }
  showAllAuthElements() {
    document
      .querySelectorAll(".authOnly")
      .forEach((element) => (element.style.display = "initial"));
  }
  generateRandomValues = (min, max) =>
    Math.floor(Math.random() * (max - min) + min);
  getCookieByKey(key) {
    //"token=123456; token2=456653456"
    if (!this.cookie) {
      let cookies = {};
      document.cookie.split(";").reduce((acc, curr) => {
        const keyValue = curr.trim().split("=");
        cookies[keyValue[0]] = keyValue[1];
      }, cookies);
      this.cookies = cookies;
    }
    console.log(this.cookies);
    return this.cookies[key];
  }
  setItemsInLocalStorage(Items) {
    if (Items.length) {
      Items.map((item) => {
        const key = Object.keys(item)[0];
        localStorage.setItem(key, JSON.stringify(item[key]));
      });
    }
  }
  getItemFromLocalStorage(itemKey) {
    return JSON.parse(localStorage.getItem(itemKey));
  }
  removeItemsInLocalStorage(Items) {
    if (Items.length) {
      Items.map((key) => {
        localStorage.removeItem(key);
      });
    }
  }
}
const HF = new HelperFunction();
console.log(HF);
export default HF;
