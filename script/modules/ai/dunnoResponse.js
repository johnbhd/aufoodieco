const dunnoResponses = [
    "Hmm… di ko sure yan 😅 try asking me about food instead! 🍔",
    "Sorry, hindi ko gets 😕 FoodieRoi here, baka food related tanong? 🍜",
    "Oops, di ko alam yan 😅 pero I can help you find masarap na pagkain! 🍕",
    "Paumanhin 😔 hindi ko masagot, pero pwede kita bigyan ng food reco! 🍟",
    "Hmm… medyo nalito ako 😅 try mo food or menu questions 🍱",
    "Di ko pa alam yan 😔 pero ask me anything about meals! 🍗",
    "Sorry! 😅 FoodieRoi at your service, food lang specialty ko 🍩",
    "Hindi ko maintindihan 😕 pero I can suggest popular dishes! 🍛",
    "Ewan ko dyan 😅 pero gutom ka ba? I got you! 🍜",
    "Di ako sure 😅 pero kung pagkain yan, kayang kaya ko! 🍔",
    "Ay hala 😅 di ko alam yan, pero FoodieRoi can help you pick something to eat! 🍕",
    "Hmm sorry 😔 nalito ako, pero tara hanap tayo pagkain! 🍔",
    "Di ko gets 😕 pero kung gutom ka, may suggestions ako! 🍜",
    "Oops 😅 wala akong sagot dyan, pero may masarap akong alam! 🍟",
    "Pasensya na 😔 di ko sure, pero gusto mo ba ng food reco? 🍗",
    "Medyo lost ako 😅 pero I can show you popular meals! 🍛",
    "Di ko masagot yan 😕 pero FoodieRoi knows good food 😉🍕",
    "Sorry 😅 hindi ko forte yan, pagkain lang talaga specialty ko 🍔",
    "Naku 😅 di ko alam, pero try mo magtanong about food! 🍜",
    "Hmm 😔 di ko pa kaya yan, pero kaya kitang pakainin virtually 😄🍩",
    "Ay sorry 😅 di ko alam yan, pero ready ako mag suggest ng food! 🍔",
    "Hmm 🤔 medyo di ko gets, pero FoodieRoi can help you find meals! 🍜",
    "Pasensya 😔 wala akong answer dyan, pero may masarap akong mairerecommend! 🍕",
    "Oops 😅 nalito ako, pero gusto mo ba ng pagkain ideas? 🍟",
    "Di ko sure 😕 pero baka trip mo ng trending dishes? 🍛",
    "Sorry 😅 hindi ko pa alam yan, pero food suggestions meron ako! 🍗",
    "Medyo blank ako dyan 😅 pero kaya kitang tulungan pumili ng food 🍱",
    "Hmm 😔 di ko masagot, pero I can guide you sa menu! 🍔",
    "Ay 😅 di ko forte yan, pero expert ako sa pagkain! 🍜",
    "Naku 😅 wala akong idea dyan, pero gutom ka ba? May reco ako! 🍩"
];


let shuffledResponses = [];
let currentIndex = 0;

function shuffleArray(array) {
    return array
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
}

export function getRandomDunno() {
    // If all used or first run, reshuffle
    if (currentIndex === 0 || currentIndex >= shuffledResponses.length) {
        shuffledResponses = shuffleArray(dunnoResponses);
        currentIndex = 0;
    }

    const response = shuffledResponses[currentIndex];
    currentIndex++;

    return response;
}