// Selecionando os elementos dos formulários
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const errorMessage = document.getElementById("error-message");
const registerPassword = document.getElementById("register-password");
const registerConfirmPassword = document.getElementById("register-confirm-password");

// Alternar entre abas
loginTab.addEventListener("click", () => {
    loginTab.classList.add("active");
    registerTab.classList.remove("active");
    loginForm.classList.add("active");
    registerForm.classList.remove("active");
});

registerTab.addEventListener("click", () => {
    registerTab.classList.add("active");
    loginTab.classList.remove("active");
    registerForm.classList.add("active");
    loginForm.classList.remove("active");
});

// Validação do formulário de registro
registerForm.addEventListener("submit", (e) => {
    if (registerPassword.value !== registerConfirmPassword.value) {
        e.preventDefault(); // Evita o envio do formulário
        errorMessage.style.display = "block"; // Exibe a mensagem de erro
    } else {
        errorMessage.style.display = "none"; // Esconde a mensagem de erro
    }
});

// Redirecionar após login bem-sucedido
loginForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita o envio do formulário
    // Aqui você pode adicionar validações de login, se necessário, antes do redirecionamento.
    // Simulando um login bem-sucedido e redirecionando para a página home
    window.location.href = "home.html"; // Redireciona para a página home.html
});
