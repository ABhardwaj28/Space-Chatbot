const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

async function sendMessage() {
    const userMessage = userInput.value.trim();
    if (userMessage === "") return;

    // Display user's message
    addMessage(userMessage, "user");
    userInput.value = "";

    // Get bot's response from backend
    const botReply = await getBotResponse(userMessage);

    // Display bot's response
    addMessage(botReply, "bot");
}

async function getBotResponse(userMessage) {
    try {
        const response = await fetch("http://127.0.0.1:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage }),
        });
        const data = await response.json();
        return data.reply;
    } catch (error) {
        console.error("Error connecting to backend:", error);
        return "⚠️ Sorry, I’m having trouble connecting to my space database!";
    }
}

function addMessage(text, sender) {
    const bubble = document.createElement("div");
    bubble.classList.add("message-bubble", sender === "user" ? "user-bubble" : "bot-bubble");
    bubble.textContent = text;
    chatBox.appendChild(bubble);
    chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") sendMessage();
});
