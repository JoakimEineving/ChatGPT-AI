import bot from "../assets/bot.svg";
import user from "../assets/user.svg";

const form = document.querySelector(".chatform");
const chatContainer = document.querySelector("#chat_container");
const temperatureSlider = document.getElementById("temperature");
const logout = document.getElementById("logout");
const deleteAll = document.getElementById("deleteAll");
const promptList = document.getElementById("promptList");
let save = document.getElementById("save");
let currentResponse = "";

logout.addEventListener("click", () => {
  window.location.href = "/index.html";
});

const model = document.getElementById("model");

model.addEventListener("change", function () {
  console.log(model.value);
  model.value = this.value;
});

let loadInterval;

// add a loading animation to the chatbot's chat bubble
function loader(element) {
  element.textContent = "";

  loadInterval = setInterval(() => {
    element.textContent += ".";

    if (element.textContent.length > 3) {
      element.textContent = "";
    }
  }, 400);
}
//add currentresponse in promptlist
async function addToPromptList() {
  const response = await fetch(`http://localhost:3000/prompt/savePrompt`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ response: currentResponse }),
  });
  if (response.status === 200) {
    promptList.innerHTML += `<li>${currentResponse}</li>`;
    console.log("Prompt saved!");
  }
}

(async function retrievePrompts() {
  const response = await fetch(`http://localhost:3000/prompt/savedPrompts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status === 200) {
    const json = await response.json();
    console.log("Prompts retrieved!");
    console.log(json);
    json.forEach((prompt) => {
      promptList.innerHTML += `<li>${prompt.response}</li>`;
    });
  }
})();

deleteAll.addEventListener("click", async () => {
  const response = await fetch(`http://localhost:3000/prompt/deleteAll`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status === 200) {
    promptList.innerHTML = "";
    console.log("All prompts deleted!");
  }
});

//add event listener only if there is a save button
document.addEventListener("click", saveListener);
function saveListener(e) {
  if (e.target && e.target.id == "save") {
    addToPromptList();
    console.log("save button clicked");
  }
}

// type out the text in the element one character at a time
function typeText(element, text) {
  let i = 0;
  let typeInterval = setInterval(() => {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
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

// create a chat bubble element with the specified value and sender
function chatBubble(isAi, value, uniqueId) {
  return `
        <div class="wrapper ${isAi && "ai"}">
            <div class="chat">
                <div class="profile">
                    <img 
                      src=${isAi ? bot : user} 
                      alt="${isAi ? "bot" : "user"}" 
                    />
                </div>
                <div class="message" id=${uniqueId}>${value}</div>
                ${isAi ? `<button><img id="save" src="../assets/heart.svg" alt="save" /></button>` : ""}
            </div>
        </div>
            `;
}

const handleFormSubmit = async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  chatContainer.innerHTML += chatBubble(false, data.get("prompt"));
  form.reset();
  const uniqueId = getUniqueId();
  chatContainer.innerHTML += chatBubble(true, " ", uniqueId);
  chatContainer.scrollTop = chatContainer.scrollHeight;
  const messageDiv = document.getElementById(uniqueId);
  const temperature = temperatureSlider.value;

  loader(messageDiv);

  const response = await fetch("http://localhost:3000/chatbot", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: model.value,
      prompt: data.get("prompt"),
      temperature: temperature,
    }),
  });

  clearInterval(loadInterval);
  messageDiv.innerHTML = " ";
  if (response.ok) {
    const data = await response.json();
    const parsedData = data.bot.trim();
    typeText(messageDiv, parsedData);
    currentResponse = parsedData;
  } else {
    const err = await response.text();
    messageDiv.innerHTML = "Something went wrong";
    alert(err);
  }
};

form.addEventListener("submit", handleFormSubmit);

form.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    handleFormSubmit(e);
  }
});
