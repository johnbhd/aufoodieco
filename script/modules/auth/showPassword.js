const passwordToggle = document.getElementById('passwordToggle');
const passwordInput = document.getElementById('txtPassword');
const confirmPasswordToggle = document.getElementById('confirmPasswordToggle');
const confirmPasswordInput = document.getElementById('confirmPasswordInput');


passwordToggle.addEventListener('click', () => {
    const isPassword = passwordInput.type === "password"
    
    passwordInput.type = isPassword ? "text" : "password";
    passwordToggle.classList.toggle("fa-eye", !isPassword);
    passwordToggle.classList.toggle("fa-eye-slash", isPassword);
})

confirmPasswordToggle.addEventListener('click', () => {
    const isPassword = confirmPasswordInput.type === "password"
    
    confirmPasswordInput.type = isPassword ? "text" : "password";
    confirmPasswordToggle.classList.toggle("fa-eye", !isPassword);
    confirmPasswordToggle.classList.toggle("fa-eye-slash", isPassword);
})