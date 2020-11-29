class UI_HTML_STRINGS {
  MODAL_INFO = `<div class="modalInfo">
      <div class="modalInfo__top">
        <h3>Well Played !</h3>
      </div>
      <div class="modalInfo__center">
        <div class="yourscore finalscore">
          <span>Your Score : </span>
          <span class="scoretext">0 </span>
        </div>
        <div class="highestscore finalscore">
          <span>Highest : </span>
          <span class="highestscoretext"> 0</span>
        </div>
      </div>
      <div class="modalInfo__bottom">
        <h4>Wanna Play Again ?</h4>
        <div class="modal__buttons">
          <button>Yes ! Why Not ?</button>
        </div>
      </div>`;
  SIGNIN_FORM = ` <section class="form">
      <div class="form__top">
        <h2>Sign In to See Where you stand</h2>
        <i class="fa fa-times"></i>
      </div>
      <div class="form__bottom">
        <form>
          <div><input type="text" name="" placeholder="username"></div>
          <div><input type="text" name="" placeholder="password"></div>
          <button type="submit">SIGN IN</button>
        </form>
        <p>Or register <span class="spanlink">here</span></p>
      </div>
    </section>`;
}
const UISTR = new UI_HTML_STRINGS();
export default UISTR;
