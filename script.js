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
        const response = await fetch(
            "https://space-chatbot-backend-7onqicq97-apoorva-bhardwaj.vercel.app/chat",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: userMessage
                })
            }
        );

        const raw = await response.text();

        console.log("Backend status:", response.status);
        console.log("Backend response:", raw);

        if (!response.ok) {
            return `⚠️ Backend error (${response.status})`;
        }

        const data = JSON.parse(raw);
        return data.reply;

    } catch (error) {
        console.error("Connection error:", error);
        return "⚠️ Could not connect to the Astrobot backend.";
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
