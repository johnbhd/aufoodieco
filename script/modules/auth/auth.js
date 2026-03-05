import { showPassword } from "./showPassword.js";

const authBtn = document.getElementById("auth-btn");
const formTitle = document.getElementById("form-title");
const fieldDiv = document.querySelector(".form-fields");
let isLogin = true;

const users = [
  { email: "user", password: "user123", role: "user"},
  { email: "admin", password: "admin123", role: "admin"}
]  

function renderLogin() {
  formTitle.textContent = "Login Page";
  fieldDiv.innerHTML = `
    <label>Email:</label>
    <input type="text" id="txtEmail" required>
    <label style="padding-top: 10px;">Password:</label>
    <div class="passwordField">
        <input type="password" id="txtPassword" required>
        <i class="fa-solid fa-eye icon" id="passwordToggle"></i>
    </div>
    <button class="btn" id="btn-login">Login</button>
  `;
  bindLogin();
  showPassword();
}

function renderRegister() {
  formTitle.textContent = "Register Page";
  fieldDiv.innerHTML = `
    <label>Email:</label>
    <input type="text" id="txtEmail" required>
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

function doLogin() {
  const email = document.getElementById("txtEmail").value;
  const password = document.getElementById("txtPassword").value;

  const role = email === "user" ? "user" : "admin";
  let credentials = false;

  users.map((user) => {
    if(email === user.email && password === user.password) {
      credentials = true
      if (user.role == "user") {
        alert("Welcome user!");
        window.location.href = "./pages/homepage.html";
      } else {
        alert("Welcome Admin!");
        window.location.href = "./pages/admin/dashboard.html";
      }
    } 
  })
  if (!credentials) {
      alert("Wrong credentials...");
  }
}

function doRegister() {
  const email = document.getElementById("txtEmail").value;
  const password = document.getElementById("txtPassword").value;
  const confirmPassword = document.getElementById("confirmPasswordInput").value;
  
  if(password === confirmPassword) {
    alert(`Registered!\nEmail: ${email}\nPassword: ${password}`);
    renderLogin();
    isLogin = true;
    authBtn.innerHTML = `Don't have an account? <u>Register here.</u>`;
  } else {
    alert("Passwords do not match!");
  }
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

renderLogin();
showPassword();