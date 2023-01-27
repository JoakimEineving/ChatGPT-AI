const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
var signup_toggle=document.querySelector(".signup_toggle");
var signin_toggle=document.querySelector(".signin_toggle");

signup_toggle.addEventListener('click',function(){
  signupForm.classList.toggle('hidden'); 
  loginForm.classList.toggle('hidden');
});
  
signin_toggle.addEventListener('click',function(){
  loginForm.classList.toggle('hidden');  
  signupForm.classList.toggle('hidden');
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
  console.log(JSON.stringify(data))
  
  let state = "";
  if (e.target.id === "loginform") {
    state = "login";
  } else {
    state = "signup";
  }
  console.log(state);
  
  try {
    const response = await fetch(`http://localhost:3000/${state}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(JSON.stringify(data))
    const json = await response.json();
    console.log(json);
    console.log(json.status);
    if (json.status === "OK") {
      console.log("response is ok");
      window.location.href = "/";
    }
  } catch (error) {
    console.error(error);
  }
};

loginForm.addEventListener("submit", handleLogin);
signupForm.addEventListener("submit", handleLogin);

// // form.addEventListener("keyup", (e) => {
  //   if (e.keyCode === 13) {
    //     handleLogin(e);
    //   }
    // });
