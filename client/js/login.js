const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const signup_toggle = document.querySelector(".signup_toggle");
const login_toggle = document.querySelector(".signin_toggle");
const loginMessage = document.getElementById("login-message");
const signupMessage = document.getElementById("signup-message");

signupMessage.innerHTML = "";
loginMessage.innerHTML = "";

signup_toggle.addEventListener("click", function () {
  signupForm.classList.toggle("hidden");
  loginForm.classList.toggle("hidden");
  loginMessage.innerHTML = "";
});

login_toggle.addEventListener("click", function () {
  loginForm.classList.toggle("hidden");
  signupForm.classList.toggle("hidden");
  signupMessage.innerHTML = "";
});

const handleLogin = async (e) => {
  e.preventDefault();
  const loginUsername = document.getElementById("loginUsername").value;
  const loginPassword = document.getElementById("loginPassword").value;
  const signupUsername = document.getElementById("signupUsername").value;
  const signupPassword = document.getElementById("signupPassword").value;

  let username = "";
  let password = "";

  if (e.target.id === "loginform") {
    username = loginUsername;
    password = loginPassword;
  } else {
    username = signupUsername;
    password = signupPassword;
  }

  const data = { username, password };

  let state = "";

  e.target.id === "loginform" ? (state = "login") : (state = "signup");
  if (password === "" || username === "") {
    state === "login"
      ? (loginMessage.innerHTML = "Please enter username and password")
      : (signupMessage.innerHTML = "Please enter username and password");
  } else {

    try {
      const response = await fetch(`http://localhost:3000/account/${state}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      if (json.status === "OK") {
        state === "login"
          ? (window.location.href = "/html/chatbot.html")
          : ((signupMessage.innerHTML = "User created successfully"),
            signupMessage.classList.add("text-green-500"));
      } else if (json.status === "Error") {
        state === "login"
          ? (loginMessage.innerHTML = "Wrong username or password")
          : (signupMessage.innerHTML = "User already exists");
      }
    } catch (error) {
      state === "login"
        ? (loginMessage.innerHTML = "Service currently down")
        : (signupMessage.innerHTML = "Service currently down");
    }
  }
};

loginForm.addEventListener("submit", handleLogin);
signupForm.addEventListener("submit", handleLogin);

loginForm.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    handleLogin(e);
  }
});
