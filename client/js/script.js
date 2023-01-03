import bot from "../assets/bot.svg";
import user from "../assets/user.svg";

const form = document.querySelector("form");
const chatContainer = document.querySelector("#chat_container");

let loadInterval;

function loader(element) {
  element.textContent = "";

  loadInterval = setInterval(() => {
    element.textContent += ".";

    if (element.textContent.length > 3) {
      element.textContent = "";
    }
  }, 400);
}
function typeText(element, text) {
  let i = 0;

  let typeInterval = setInterval(() => {
    if (i < text.length) {
      element.innerHTML += text.charAt[i];
      i++;
    } else {
      clearInterval(typeInterval);
    }
  }, 20);
}

function getUniqueId() {
  const time = Date.now();
  const randomNum = Math.floor(Math.random() * 100000000);
  return `id-${time}-${randomNum}`;
}

function chatColor(isAi, value, uniqueId) {
  return `
        <div class="wrapper ${isAi && "ai"}">
            <div class="chat">
                <div class="profile">
                    <img src="${isAi ? bot : user}" alt="${isAi ? "bot" : "user"}" />
                </div>
                <div class="message" id=${uniqueId}>${value}</div>
            </div>
        </div>
            `;
}

const handleFormSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData(form);

  chatContainer.innerHTML += chatColor(false, data.get("prompt"));

  form.reset();

  const uniqueId = getUniqueId();
  chatContainer.innerHTML += chatColor(true, " ", uniqueId);

  chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById(uniqueId);

  loader(messageDiv);
}

form.addEventListener("submit", handleFormSubmit);
form.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    handleFormSubmit(e);
  }
})
