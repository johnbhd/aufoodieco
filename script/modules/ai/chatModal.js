let chatDataSets = [];
let isDataLoaded = false;

const jsonFiles = [
    "../data/global.json",
    "../data/identity.json",
    "../data/help.json"
];

async function loadChatData() {
    try {
        const responses = await Promise.all(
            jsonFiles.map(file => fetch(file))
        );

        const texts = await Promise.all(
            responses.map(res => res.text())
        );

        chatDataSets = texts.map(text => JSON.parse(text));

        isDataLoaded = true;
        console.log("JSON loaded successfully");
    } catch (error) {
        console.error("JSON load error:", error);
    }
}

loadChatData();

function toggleChat() {
    const modal = document.getElementById("chat-modal");
    modal.style.display = modal.style.display === "flex" ? "none" : "flex";
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
            if (b[i - 1] === a[j - 1]) {
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
    if (!isDataLoaded) return "Loading... ⏳";

    const msg = normalize(message);

    for (const dataset of chatDataSets) {
        for (const key in dataset) {
            if (msg === normalize(key)) {
                return dataset[key];
            }
        }
    }

    const msgWords = msg.split(/\s+/).filter(Boolean);
    if (msgWords.length === 1) {
        return "Sorry 😅 Hindi ko ma-gets yung '" + message + "'. Subukan mo 'menu', 'recommend', 'gutom' o 'hello' 😋";
    }

    for (const dataset of chatDataSets) {
        for (const key in dataset) {
            const nk = normalize(key);
            if (msg.startsWith(nk + " ") || msg.endsWith(" " + nk) || msg === nk) {
                return dataset[key];
            }
        }
    }

    for (const dataset of chatDataSets) {
        for (const key in dataset) {
            const keyWords = normalize(key).split(" ").filter(Boolean);
            if (keyWords.length > 0 && keyWords.every(w => msgWords.includes(w))) {
                return dataset[key];
            }
        }
    }

    let bestMatch = null;
    let highestScore = 0;

    for (const dataset of chatDataSets) {
        for (const key in dataset) {
            const cleanKey = normalize(key);
            const score = similarity(msg, cleanKey);

            if (score > highestScore) {
                highestScore = score;
                bestMatch = dataset[key];
            }
        }
    }

    if (highestScore >= 0.68) {
        return bestMatch;
    }

    return "Sorry 😅 Hindi ko ma-gets yung sinabi mo. Subukan mo 'menu', 'gutom ako', 'recommend' o 'salamat' 😋";
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
        aiMsg.textContent = getBotResponse(message);

        chatBody.appendChild(aiMsg);
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 500);
}

document.addEventListener("click", (e) => {
    if (e.target.closest(".chatAssistant-icon")) toggleChat();
    if (e.target.closest("#close-chat")) closeChat();
    if (e.target.closest("#send-chat")) sendMessage();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.target.id === "chat-input") {
        sendMessage();
    }
});