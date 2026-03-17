import { showPassword } from "./showPassword.js";
import { doLogin, doRegister } from "./authHooks.js";

const authBtn = document.getElementById("auth-btn");
const formTitle = document.getElementById("form-title");
const fieldDiv = document.querySelector(".form-fields");
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.querySelector('.nav-links');
const overlay = document.querySelector('.overlay');
const btnAbout = document.querySelector(".btn-about");
const btnFeatures = document.querySelector(".btn-features");
const btnGuest = document.querySelector(".btn-guest");
const year = document.getElementById("year");

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
year.textContent = currentYear;

const raw = sessionStorage.getItem("session");
const get = raw ? JSON.parse(raw) : null;
console.log(get);

btnAbout.addEventListener('click', () => {
  window.location.href = "./pages/features.html"
})
btnFeatures.addEventListener('click', () => {
  window.location.href = "./pages/developers.html"
})

btnGuest.addEventListener('click', () => {
    sessionStorage.setItem("session", JSON.stringify({
      name: "Guest",
      role: "guest"
    }));
    window.location.href = "./pages/homepage.html"
})

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('show');
  overlay.classList.toggle('show')
});
overlay.addEventListener('click', () => {
  navLinks.classList.remove('show');
  overlay.classList.remove('show');
})
let isLogin = true;




function renderRegister() {
  formTitle.textContent = "Register Page";
  fieldDiv.innerHTML = `
    <label>Email:</label>
    <input type="email" id="txtEmail" required>
    <label style="padding-top: 10px;">Password:</label>
    <div class="passwordField">
        <input type="password" id="txtPassword" required>
        <i class="fa-solid fa-eye icon" id="passwordToggle"></i>
    </div>
    <label style="padding-top: 10px;">Confirm Password:</label>
    <div class="confirmPasswordField">
        <input type="password" id="confirmPasswordInput" required>
        <i class="fa-solid fa-eye icon" id="confirmPasswordToggle"></i>
    </div>
    <button class="btn" id="btn-register">Register</button>
  `;
  bindRegister();
  showPassword();
}

function bindLogin() {
  const loginBtn = document.getElementById("btn-login");
  const emailInput = document.getElementById("txtEmail");
  const passInput = document.getElementById("txtPassword");
  
  loginBtn.addEventListener("click", doLogin);
  emailInput.addEventListener("keydown", e => { if(e.key==="Enter") doLogin(); });
  passInput.addEventListener("keydown", e => { if(e.key==="Enter") doLogin(); });
}

function bindRegister() {
  const registerBtn = document.getElementById("btn-register");
  const emailInput = document.getElementById("txtEmail");
  const passInput = document.getElementById("txtPassword");
  const confirmInput = document.getElementById("confirmPasswordInput");
  
  registerBtn.addEventListener("click", doRegister);
  emailInput.addEventListener("keydown", e => { if(e.key==="Enter") doRegister(); });
  passInput.addEventListener("keydown", e => { if(e.key==="Enter") doRegister(); });
  confirmInput.addEventListener("keydown", e => { if(e.key==="Enter") doRegister(); });
}


authBtn.addEventListener("click", () => {
  if(isLogin) {
    renderRegister();
    isLogin = false;
    authBtn.innerHTML = `Already have account? <u>Login here.</u>`;
  } else {
    window.location.reload()
    isLogin = true;
  
  }
});

document.addEventListener("DOMContentLoaded", () => {
  bindLogin();
  showPassword();
});