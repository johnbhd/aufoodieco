let globalData = {};
let greetingData = {};
let isDataLoaded = false;

async function loadChatData() {
    try {
        const globalRes = await fetch("../data/global.json");
        const globalText = await globalRes.text();

        console.log("GLOBAL RAW:", globalText);

        const greetRes = await fetch("../data/greeting.json");
        const greetText = await greetRes.text();

        console.log("GREETING RAW:", greetText);

        globalData = JSON.parse(globalText);
        greetingData = JSON.parse(greetText);

        isDataLoaded = true;

        console.log("✅ JSON PARSED SUCCESS");
    } catch (error) {
        console.error("❌ REAL ERROR:", error);
    }
}
loadChatData();

function toggleChat() {
    const chatModal = document.getElementById("chat-modal");
    chatModal.style.display =
        chatModal.style.display === "flex" ? "none" : "flex";
}

function closeChat() {
    document.getElementById("chat-modal").style.display = "none";
}

function normalize(text) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

function similarity(a, b) {
    const matrix = [];

    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }

    const distance = matrix[b.length][a.length];
    return 1 - distance / Math.max(a.length, b.length);
}

function getBotResponse(message) {
    const msg = normalize(message);

    let bestMatch = null;
    let highestScore = 0;

    const checkData = (data) => {
        for (let key in data) {
            const cleanKey = normalize(key);

            if (msg.replace(/\s/g, "").includes(cleanKey.replace(/\s/g, ""))) {
                return data[key];
            }

            const score = similarity(msg, cleanKey);

            if (score > highestScore) {
                highestScore = score;
                bestMatch = data[key];
            }
        }
    };

    const greetMatch = checkData(greetingData);
    if (greetMatch) return greetMatch;

    const globalMatch = checkData(globalData);
    if (globalMatch) return globalMatch;

    if (highestScore > 0.4) return bestMatch;

    return "Sorry 😅 I didn't understand that.";
}

function sendMessage() {
    const chatBody = document.getElementById("chat-body");
    const chatInput = document.getElementById("chat-input");

    const message = chatInput.value.trim();
    if (!message) return;

    const userMsg = document.createElement("p");
    userMsg.className = "chat-msg user";
    userMsg.textContent = message;
    chatBody.appendChild(userMsg);

    chatInput.value = "";
    chatBody.scrollTop = chatBody.scrollHeight;

    setTimeout(() => {
        const aiMsg = document.createElement("p");
        aiMsg.className = "chat-msg ai";

        if (!isDataLoaded) {
            aiMsg.textContent = "Loading... ⏳";
        } else {
            aiMsg.textContent = getBotResponse(message);
        }

        chatBody.appendChild(aiMsg);
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 500);
}

document.addEventListener("click", (e) => {
    if (e.target.closest(".chatAssistant-icon")) {
        toggleChat();
    }

    if (e.target.closest("#close-chat")) {
        closeChat();
    }

    if (e.target.closest("#send-chat")) {
        sendMessage();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.target.id === "chat-input") {
        sendMessage();
    }
});