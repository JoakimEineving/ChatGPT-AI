<h1 align="center">
Fullstack project: Chatbot GPT-3 2.0
</h1>

<p align="center">
Frontend:
Javascript, HTML, CSS, Tailwind
</br>
Backend:
Node, Express, MongoDB


Chatbot connected to OpenAi's API. It looks a lot like ChatGPT but also allows the user to modify different parameters, for example which training dataset (model) the bot should use. You can also modify temperature, higher values means the model will take more risks.
</p>

![](https://github.com/JoakimEineving/ChatGPT-AI/blob/master/client/assets/chatbot_demo.gif)

## How to Use 

**Step 1:**

Download or clone this repo by using the link below:

```
https://github.com/JoakimEineving/ChatGPT-AI.git
```


**Step 2:**

Navigate to /server/.env and enter your api key:
```
OPENAI_API_KEY="YOUR API KEY"
```

**Step 3:**

in the terminal, navigate to /client and run  
```
npm run dev
```
Then navigate to /server and run
```
npm run server
```


