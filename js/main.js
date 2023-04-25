const sakuraApi = "https://emojihub.yurace.pro/api/random";
const wordApi = "https://clientes.api.greenborn.com.ar/public-random-word?c=1";
const deckApi = "https://deckofcardsapi.com/api/deck/";
const newDeck = "new/shuffle/?deck_count=1";
const drawCard = "/draw/?count=1";

// https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=2

// //www.deckofcardsapi.com/
// https://github.com/JessVel/sakura-card-captor-api
// https://blog.greenborn.com.ar/2022/03/04/actualizacion-en-api-de-palabras-al-azar/

//localStorage.setItem("deck_id", "");

if (localStorage.getItem("deck_id")) {
    document.querySelector(".card-section button").innerText = "Pick a card!";
}
document
    .querySelector(".art-section button")
    .addEventListener("click", () => getFetch1(sakuraApi));
document
    .querySelector(".word-section button")
    .addEventListener("click", () => getFetch2(wordApi));
document
    .querySelector(".card-section button")
    .addEventListener("click", () => getFetch3(deckApi));

function getFetch1(api) {
    fetch(api)
        .then((res) => res.json()) // parse response as JSON
        .then((data) => {
            document.querySelector(
                ".art-section p"
            ).innerHTML = ` ${data.htmlCode[0]}`;
        })
        .catch((err) => {
            console.log(`error ${err}`);
        });
}

function getFetch2(api) {
    fetch(api)
        .then((res) => res.json()) // parse response as JSON
        .then((data) => {
            document.querySelector(".word-section h3").textContent = data[0];
        })
        .catch((err) => {
            console.log(`error ${err}`);
        });
}

function getFetch3(api) {
    let apiDeck = "";

    if (!localStorage.getItem("deck_id")) apiDeck = api + newDeck;
    else apiDeck = api + localStorage.getItem("deck_id") + drawCard;
    fetch(apiDeck)
        .then((res) => res.json()) // parse response as JSON
        .then((data) => {
            if (!localStorage.getItem("deck_id")) {
                localStorage.setItem("deck_id", data.deck_id);
                document.querySelector(".card-section button").innerText =
                    "Pick a card!";
            } else {
                document.querySelector(".card-section img").src =
                    data.cards[0].image;
            }
        })
        .catch((err) => {
            console.log(`error ${err}`);
        });
}
