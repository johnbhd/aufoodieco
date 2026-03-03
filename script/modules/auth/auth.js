const loginForm = document.getElementById("loginform");
const registerForm = document.getElementById("registerform");

const users = {
  email: "jb",
  password: "jb123"
};

function login(e) {
  e.preventDefault();
  
  const email = document.getElementById("txtEmail").value;
  const password = document.getElementById("txtPassword").value;
  
  if (email == users.email && password === users.password) {
    window.location.href = "./pages/homepage.html";
  } else {
    alert("Wrong credentials...");
  }
}

function register(e) {
  e.preventDefault();
  const email = document.getElementById("txtEmail").value;
  const password = document.getElementById("txtPassword").value;
  const confirmPassword = document.getElementById("confirmPasswordInput").value;
  
  if (password == confirmPassword) {
    alert("Email: "+email);
    alert("Password: "+password);
  } else {
    alert("password not match!");
  }
}
if (loginForm) {
  loginForm.addEventListener("submit", login);
}
if (registerForm) {
  registerForm.addEventListener("submit", register);
}