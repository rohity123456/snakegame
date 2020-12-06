import { CONST } from "./constants.js";
import HF from "./helper.js";

class Backend {
  constructor() {
    this.API = "http://localhost:8080/api";
  }
  async signUp(userData) {
    console.log("USER", userData);
    const datafromBackend = await this.customPOSTFetch("/signup", userData);
    return datafromBackend;
  }
  async signIn(userData) {
    console.log("USER", userData);
    const datafromBackend = await this.customPOSTFetch("/signin", userData);
    return datafromBackend;
  }
  //highestscorers
  getHighestScorers = async () => await this.customFetch("/highestscorers");

  isAuthenticated() {
    return !!HF.getItemFromLocalStorage("token");
  }
  async customFetch(URI_PATH) {
    try {
      console.log(this.API);
      const response = await fetch(this.API + URI_PATH, {
        mode: "cors",
        cache: "no-cache",
      });
      const data = await response.json();
      return data;
    } catch (exception) {
      if (exception.toString() === CONST.FAILED_TO_FETCH)
        return {
          general: CONST.INTERNAL_SERVER_ERROR_MSG,
          status: CONST.STATUS_FAILED,
        };
    }
  }
  async customPOSTFetch(URI_PATH, body, headers) {
    try {
      console.log(this.API);
      const response = await fetch(this.API + URI_PATH, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: headers || {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(body),
      });
      const data = await response.json();
      return data;
    } catch (exception) {
      if (exception.toString() === CONST.FAILED_TO_FETCH)
        return {
          general: CONST.INTERNAL_SERVER_ERROR_MSG,
          status: CONST.STATUS_FAILED,
        };
    }
  }
  async updateScoreInBackend(highestScore) {
    const user = HF.getItemFromLocalStorage("user");
    const token = HF.getItemFromLocalStorage("token");
    user.higestScore = highestScore;
    const header = {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    };
    const response = await BE.customPOSTFetch(
      `/updateUserScore/${user._id}`,
      user,
      header
    );
    console.log(response);
  }
  signOut() {
    HF.removeItemsInLocalStorage(["user", "token"]);
  }
}
const BE = new Backend();
export default BE;
