import game from "./game.js";
import BE from "./helper/backend.js";
import UISTR, { CONST } from "./helper/constants.js";
import HF from "./helper/helper.js";
import util from "./helper/util.js";
import snake from "./snake.js";
//get Canvas element
window.onload = async (e) => {
  if (!BE.isAuthenticated()) {
    util.setActiveCardInModal(UISTR.SIGNIN_FORM);
    util.addListener(".form__bottom button", "click", util.onSignInBtnClick);
    util.addListener(".form__top i", "click", util.closeWindow);
    util.addListener(".signtop", "click", () => {
      util.setVisiblity(".modal", "visible");
    });
    util.setVisiblity(".modal", "visible");
  } else {
    proceedWithuUpdate();
  }
  util.addListener(".signout", "click", util.SignOutUser);
  updateCanvas();
  const data = await BE.getHighestScorers();
  if (data["status"] == CONST.STATUS_SUCCESS)
    util.updateLeaderBoard(data.highestScores);
};
export const proceedWithuUpdate = () => {
  util.ProceedWithAfterAuthActivity();
};
const canvas = HF.getEl("canvas");
export const context = canvas.getContext("2d");

const updateCanvas = () => {
  // debugger
  window.addEventListener("keydown", game.checkUserAction);
  if (window.innerWidth < 1000) {
    canvas.height = window.innerHeight - 150;
    game.assignCallbacksToMobBtnEvents();
    HF.getEl("#mobile_btns").style.display = "flex";
  } else {
    canvas.height = window.innerHeight - 66;
    canvas.width = window.innerWidth - 300;
  }

  game.update();

  // const btnPlayAgain = HF.getEl(".modal__buttons button:first-child");
  // btnPlayAgain.addEventListener("click", game.onPlayAgainClick);
};

//for testing
let a = (i, n) => {
  if (i == n - 1) return;
  snake.tail[i] = {
    x: snake.x - n * 2 + (i + 1) * 2,
    y: snake.y,
  };
  a(++i, n);
};
a(0, 30);
