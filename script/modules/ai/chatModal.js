
function toggleChat() {
    const chatModal = document.getElementById("chat-modal");
    chatModal.style.display = chatModal.style.display === "flex" ? "none" : "flex";
}

function closeChat() {
    const chatModal = document.getElementById("chat-modal");
    chatModal.style.display = "none";
}

function sendMessage() {
    const chatBody = document.getElementById("chat-body");
    const chatInput = document.getElementById("chat-input");
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    const userMsg = document.createElement("p");
    userMsg.textContent = message;
    userMsg.classList.add("chat-msg", "user");
    chatBody.appendChild(userMsg);
    
    chatInput.value = "";
    chatBody.scrollTop = chatBody.scrollHeight;
    
    setTimeout(() => {
        const aiMsg = document.createElement("p");
        aiMsg.textContent = "Hello! How can I assist you today?";
        aiMsg.classList.add("chat-msg", "ai");
        chatBody.appendChild(aiMsg);
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 800);
}

document.addEventListener("click", function(e) {
    const target = e.target;

    if (target.closest(".chatAssistant-icon")) {
        toggleChat();
    }

    if (target.closest("#close-chat")) {
        closeChat();
    }

    if (target.closest("#send-chat")) {
        sendMessage();
    }
});

document.addEventListener("keydown", function(e) {
    if (e.key === "Enter" && e.target.id === "chat-input") {
        sendMessage();
    }
});