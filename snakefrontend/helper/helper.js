class HelperFunction {
  cookies = undefined;
  getEl = (selector) => document.querySelector(selector);
  setHtml = (selector, HTML) => {
    const el = document.querySelector(selector);
    el.innerHTML = HTML;
    return el;
  };
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
}
const HF = new HelperFunction();
console.log(HF);
export default HF;
