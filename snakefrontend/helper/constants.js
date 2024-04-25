class UI_HTML_STRINGS {
  MODAL_INFO = `<div class="modalInfo">
      <div class="modalInfo__top">
        <h3>Well Played !</h3>
      </div>
      <div class="modalInfo__center">
        <div class="yourscore finalscore">
          <span>Your Score  = </span>
          <span class="scoretext">0 </span>
        </div>
        <div class="highestscore finalscore">
          <span>Highest  = </span>
          <span class="highestscoretext"> 0</span>
        </div>
      </div>
      <div class="modalInfo__bottom">
        <h4>Wanna Play Again ?</h4>
        <div class="modal__buttons">
          <button>Yes ! Why Not ?</button>
        </div>
      </div>`;
  SIGNIN_FORM = `<section class="form">
      <div class="form__top">
        <h2>Sign In to See Where you stand</h2>
        <div class="tooltip"><i class="fa fa-times"></i></div>
      </div>
      <div class="form__bottom">
        <form>
          <div>
            <div>
              <input type="text" value="" autocomplete="off" placeholder="username" id="usernamein">
            </div>
            <span class="inp_error"></span>
          </div>
          <div>
            <div>
              <input type="password" autocomplete="off" placeholder="password" id="passwordin">
            </div>
            <span class="inp_error"></span>
          </div>
          <span class="inp_error generr">
          </span>
          <button type="submit" class="loadparent">SIGN IN
          </button>
        </form>
        <p>Or register <span class="spanlink">here</span></p>
      </div>
    </section>`;
  SIGNUP = `<section class="form">
      <div class="form__top">
        <h2>Sign Up to Join Great Players</h2>
        <div class="tooltip"><i class="fa fa-times"></i></div>
      </div>
      <div class="form__bottom">
        <form>
          <div>
            <div><input type="text" placeholder="name" id="nameup"></div>
            <span class="inp_error"></span>
          </div>
          <div>
            <div>
              <input type="text" placeholder="username" id="usernameup">
            </div>
            <span class="inp_error"></span>
          </div>
          <div>
            <div>
              <input type="text" placeholder="password" id="passwordup">
            </div>
            <span class="inp_error"></span>
          </div>
          <span class="inp_error generr">
          </span>
          <button type="submit" class="loadparent">SIGN UP
          </button>
        </form>
        <p>Already a User ? Login <span class="spanlink">here</span></p>
      </div>
    </section>`;
  LOADICON = `<i class="fa fa-spinner loadicon"></i>`;
}

class CONSTANTS {
  STATUS_FAILED = "FAILED";
  STATUS_SUCCESS = "SUCCESS";
  AUTHORIZATION = "authorization";
  INPSELECTORS = [
    ".form__bottom #name",
    ".form__bottom #username",
    ".form__bottom #password",
  ];
  FAILED_TO_FETCH = "TypeError: Failed to fetch";
  INTERNAL_SERVER_ERROR_MSG =
    "There is some internal server error, please try again later";
  VISIBLE = "visible";
  HIDDEN = "hidden";
}

//export stuff
export const CONST = new CONSTANTS();
const UISTR = new UI_HTML_STRINGS();
export default UISTR;
