import bot from "../assets/bot.svg";
import user from "../assets/user.svg";

// get the form element and chat container element
const form = document.querySelector(".chatform");
const chatContainer = document.querySelector("#chat_container");
const temperatureSlider = document.getElementById("temperature");

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

// generate a unique ID for the chat bubble
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
            </div>
        </div>
            `;
}

// handle the form submission
const handleFormSubmit = async (e) => {
  // prevent the default form submission behavior
  e.preventDefault();

  // get the form data
  const data = new FormData(form);

  // add the user's chat bubble to the chat container
  chatContainer.innerHTML += chatBubble(false, data.get("prompt"));
  //get temperature value

  // reset the form
  form.reset();

  // generate a unique ID for the chat bubble
  const uniqueId = getUniqueId();

  // add the bot's chat bubble to the chat container
  chatContainer.innerHTML += chatBubble(true, " ", uniqueId);

  // scroll to the bottom of the chat container
  chatContainer.scrollTop = chatContainer.scrollHeight;

  // get the message div element
  const messageDiv = document.getElementById(uniqueId);
  const temperature = temperatureSlider.value;
  // add a loading animation to the bot's chat bubble
  loader(messageDiv);

  // send a POST request to the server with the form data
  const response = await fetch("http://localhost:5000", {
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

  // clear the loading animation from the bot's chat bubble
  clearInterval(loadInterval);
  messageDiv.innerHTML = " ";

  // if the request was successful, add the response text to the bot's chat bubble
  if (response.ok) {
    const data = await response.json();
    const parsedData = data.bot.trim();
    console.log({ parsedData });

    typeText(messageDiv, parsedData);
  } else {
    // if the request was not successful, show an error message in the bot's chat bubble
    const err = await response.text();

    messageDiv.innerHTML = "Something went wrong";
    alert(err);
  }
};

// add an event listener for the form submission event
form.addEventListener("submit", handleFormSubmit);

// add an event listener for the keyup event
form.addEventListener("keyup", (e) => {
  // if the key pressed is the enter key, submit the form
  if (e.keyCode === 13) {
    handleFormSubmit(e);
  }
});
