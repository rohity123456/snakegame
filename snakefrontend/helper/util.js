import { proceedWithuUpdate } from "../test.js";
import BE from "./backend.js";
import UISTR, { CONST } from "./constants.js";
import HF from "./helper.js";

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
  closeWindow() {
    console.log("CLOSED");
    util.setVisiblity(".modal", "hidden");
  }
  validateUser(name, username, password) {
    let errors = [];
    name != "NA" &&
      !this.checkMinLength(name, 3, "name", errors) &&
      name != "NA" &&
      this.checkMaxLength(name, 30, "name", errors);
    !this.checkMinLength(username, 4, "username", errors) &&
      this.checkMaxLength(username, 30, "username", errors);
    password != "NA" &&
      !this.checkMinLength(password, 10, "password", errors) &&
      password != "NA" &&
      this.checkMaxLength(password, 30, "password", errors);
    return errors;
  }
  checkMinLength(input, min, key, errors) {
    if (!input || input.trim().length < min) {
      const errorObj = {};
      errorObj[key] = `${key} must be greater than ${min} characters !`;
      errors.push(errorObj);
      return true;
    }
  }
  checkMaxLength(input, max, key, errors) {
    if (!input || input.trim().length > max) {
      const errorObj = {};
      errorObj[key] = `${key} must be smaller than ${max} characters !`;
      errors.push(errorObj);
    }
  }
  async onSignUpBtnClick(e) {
    try {
      e.preventDefault();
      console.log("SIGNUP");
      util.setLoading(".form__bottom button", true);
      util.toggleEnable(".form__bottom button");

      const keyArray = ["name", "username", "password"];
      const inpSelectors = CONST.INPSELECTORS.map((s) => s + "up");
      const user = util.getUIInputBySelector(inpSelectors);
      const errors = util.validateUser(...user);
      if (util.setErrorMessages(inpSelectors, errors, keyArray)) return;
      const data = await BE.signUp(
        user.reduce((acc, curr, idx) => {
          acc[keyArray[idx]] = curr;
          return acc;
        }, {})
      );
      if (data.status === CONST.STATUS_FAILED)
        util.setErrorMessages([".form__bottom .generr"], [data], ["general"]);
      console.log("USER", data);
    } catch (exception) {
      console.error(exception);
    } finally {
      util.setLoading(".form__bottom button");
      util.toggleEnable(".form__bottom button", true);
    }
  }
  async onSignInBtnClick(e) {
    try {
      e.preventDefault();
      console.log("SIGNIN");
      util.setLoading(".form__bottom button", true);
      util.toggleEnable(".form__bottom button");
      const inpSelectors = CONST.INPSELECTORS.map((s) => s + "in").slice(1);
      const keyArray = ["username", "password"];
      const user = util.getUIInputBySelector(inpSelectors);
      const errors = util.validateUser("NA", ...user);
      if (util.setErrorMessages(inpSelectors, errors, keyArray)) return;
      const data = await BE.signIn(
        user.reduce((acc, curr, idx) => {
          acc[keyArray[idx]] = curr;
          return acc;
        }, {})
      );
      if (data.status === CONST.STATUS_FAILED)
        return util.setErrorMessages(
          [".form__bottom .generr"],
          [data],
          ["general"]
        );
      HF.setItemsInLocalStorage([{ token: data.token }, { user: data.user }]);
      util.ProceedWithAfterAuthActivity();
    } catch (exception) {
      console.error("RES", exception);
    } finally {
      util.setLoading(".form__bottom button");
      util.toggleEnable(".form__bottom button", true);
    }
  }
  getUIInputBySelector = (selectors) =>
    selectors.map((selector) => HF.getEl(selector).value);
  setErrorMessages(selectors, errors, keyArray) {
    selectors.forEach((selector, index) => {
      const input = HF.getEl(selector);
      const error = errors.find(
        (errorObj) => Object.keys(errorObj)[0] == keyArray[index]
      );
      if (error && error.hasOwnProperty("general")) {
        input.innerText = error["general"];
        return;
      }
      input.parentElement.nextElementSibling.innerText = error
        ? error[keyArray[index]]
        : "";
    });
    return errors.length;
  }
  setLoading(selector, loading) {
    const element = HF.getEl(selector);
    if (loading) {
      element.innerHTML += UISTR.LOADICON;
    } else element.removeChild(element.lastElementChild);
  }
  toggleEnable = (selector, enabled) =>
    (HF.getEl(selector).disabled = !enabled);
  ProceedWithAfterAuthActivity() {
    util.hideModal();
    HF.hideAllNonAuthElements();
    HF.showAllAuthElements();
    util.upDateUserScoreAndRank();
  }
  //leaderBoard
  updateLeaderBoard(highestScorers) {
    let scorersListElement = HF.getEl(".playersboard ul");
    highestScorers.forEach(({ username, higestScore }) => {
      let listItem = HF.createEl("li", ["list-item"]);
      const h4 = HF.createEl("h4");
      h4.innerText = username;
      const p = HF.createEl("p");
      p.innerText = higestScore;
      listItem = HF.appendMultipleChilds(listItem, [h4, p]);
      scorersListElement = HF.appendMultipleChilds(scorersListElement, [
        listItem,
      ]);
    });
  }
  hideModal() {
    util.setVisiblity(".modal", "hidden");
  }
  upDateUserScoreAndRank() {
    const { name, higestScore, Rank } = HF.getItemFromLocalStorage("user");
    const usernameEl = HF.getEl(".username");
    const myRankSpan = HF.getEl(".myRankBox span");
    const highestScoreTextEL = HF.getEl(".myboard__right h3");
    usernameEl.innerText = `Welcome, ${name}`;
    highestScoreTextEL.innerText = higestScore;
    myRankSpan.innerText = "Your Rank " + Rank;

    //Welome, Rohit
  }
  SignOutUser() {
    BE.signOut();
    window.location.reload();
  }
}
const util = new Util();
export default util;
