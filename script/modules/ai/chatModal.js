import { getMenu } from "../api/getData.js"
import { getRandomDunno} from "./dunnoResponse.js"

console.log(getMenu().then(foods => console.log(foods)))

let chatDataSets = [];
let recommendData = {};
let isDataLoaded = false;
let menuCache = [];

const jsonFiles = [
    "../data/recommend.json", 
    "../data/global.json",
    "../data/identity.json",
    "../data/help.json", 
    "../data/complaint.json"
];

async function loadChatData() {
    try {
        const responses = await Promise.all(
            jsonFiles.map(file => fetch(file))
        );

        const texts = await Promise.all(
            responses.map(res => res.text())
        );

        const parsed = texts.map(text => JSON.parse(text));

        recommendData = parsed[0]; // FIRST
        chatDataSets = parsed.slice(1); // REST

        isDataLoaded = true;
        console.log("JSON loaded successfully");

    } catch (error) {
        console.error("JSON load error:", error);
    }
}
loadChatData();
async function loadMenu() {
    menuCache = await getMenu();
}

loadMenu();

async function findFoodByName(message) {

    const foods = menuCache;

    const msg = normalize(message);

    for (const food of foods) {

        if (!food.name) continue;

        const name = normalize(food.name);

        if (msg.includes(name) || name.includes(msg)) {

            let desc = "Masarap na pagkain 😋";
            let img = "";

            // ✅ safe description
            if (food.description && typeof food.description === "object") {

                const langs = Object.keys(food.description);

                if (langs.length > 0) {

                    const randomLang =
                        langs[Math.floor(Math.random() * langs.length)];

                    desc = food.description[randomLang];
                }
            }

            // ✅ safe image
            if (food.img) {
                img = food.img;
            }

            return {
                name: food.name,
                desc: desc,
                img: img
            };
        }
    }

    return null;
}
function getRandomItems(arr, count = 3) {

    const shuffled = [...arr].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, count);
}

async function getRecommendation(message) {

    const msg = normalize(message);

    for (const key in recommendData) {

        const cleanKey = normalize(key);

        if (msg.includes(cleanKey)) {

            const foods = menuCache;

            const rule = recommendData[key];

            const result = foods.filter(food => {

                if (rule.category && food.category !== rule.category) return false;
                if (rule.isPopular && food.isPopular !== true) return false;
                if (rule.tag && !food.tags?.includes(rule.tag)) return false;
                if (rule.health && !food.healthTags?.includes(rule.health)) return false;
                if (rule.mealTime && (!food.mealTime || !food.mealTime.some(t => t.toLowerCase() === rule.mealTime.toLowerCase()))) return false;
                if (rule.diet && !food.dietType?.includes(rule.diet)) return false;
                if (rule.priceBelow && food.price > rule.priceBelow) return false;
                if (rule.priceAbove && food.price < rule.priceAbove) return false;

                return true;
            });

            if (result.length === 0) return "Walang ma-recommend 😅";

            const randomFoods = getRandomItems(result, 3);

            return "Try mo: " + randomFoods.map(f => f.name).join(", ");
        }
    }

    return null;
}
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

async function getBotResponse(message) {

    if (!isDataLoaded) return "Loading...";

    const foodInfo = await findFoodByName(message);

    if (foodInfo) {
        return foodInfo;
    }

    const rec = await getRecommendation(message);

    if (rec) return rec;

    const msg = normalize(message);

    for (const dataset of chatDataSets) {
        for (const key in dataset) {
            if (msg === normalize(key)) {
                return dataset[key];
            }
        }
    }

    const msgWords = msg.split(/\s+/).filter(Boolean);

    for (const dataset of chatDataSets) {
        for (const key in dataset) {

            const nk = normalize(key);

            if (
                msg.startsWith(nk + " ") ||
                msg.endsWith(" " + nk) ||
                msg === nk
            ) {
                return dataset[key];
            }
        }
    }

    // similarity

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

    if (highestScore >= 0.68) return bestMatch;

    return getRandomDunno();
}
async function sendMessage() {
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

    setTimeout(async () => {

        const aiMsg = document.createElement("p");
        aiMsg.className = "chat-msg ai";

        const res = await getBotResponse(message);

        if (typeof res === "string") {

            aiMsg.textContent = res;

        } else if (typeof res === "object") {

            aiMsg.innerHTML = `
                <div class="chat-food">

                    ${res.img ? `<img src="${res.img}" width="120">` : ""}

                    <div>
                        <b>${res.name}</b><br>
                        ${res.desc}
                    </div>

                </div>
            `;
        }

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