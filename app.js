window.addEventListener("load", start);

const allCardsContainer = document.getElementById('cards-start');
const notShuffledCardsContainer = document.getElementById("cards");
const remainingCardsContainer = document.getElementById("cards-remaining");
const shuffledCardsContainer = document.getElementById("cards-shuffled");
const shuffleButton = document.getElementById('shuffle-button');
const counterValue = document.getElementById('counter-value');

const cardValues = ['ACE', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING'];
let shuffleCounter = 0;

function start() {
    renderCards(cardValues);
    renderRemainingCards(cardValues, cardValues.length - 1);

    shuffleButton.addEventListener('click', shuffleClicked);
}


function renderCards(cards, highlightIndex, randomHighlightIndex) {
    notShuffledCardsContainer.innerHTML = '';
    cards.forEach((value, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.textContent = value;

        if (index === highlightIndex) {
            cardElement.classList.add('highlight');
        }
        if (index === randomHighlightIndex) {
            cardElement.classList.add('random-highlight');
        }

        notShuffledCardsContainer.appendChild(cardElement);
    });
}

async function fisherYatesShuffle(arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
        shuffleCounter++;

        updateCounter(shuffleCounter);

        renderCards(arr, i);
        await delay(500);

        const randomIndex = Math.floor(Math.random() * (i + 1));

        renderCards(arr, i, randomIndex);
        await delay(500);

        [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];

        renderShuffledCards(arr.splice(i, 1)[0]);
        renderRemainingCards(arr, i);
        renderCards(arr, i, null);
        await delay(500);
    }

    renderCards(arr);
    renderRemainingCards(arr, -1);
}

function updateCounter(count) {
    counterValue.textContent = count;
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



async function shuffleClicked() {
    shuffleButton.disabled = true;
    shuffleButton.classList.add("disabled");
    updateCounter(shuffleCounter);
    await fisherYatesShuffle([...cardValues]);
}



function renderRemainingCards(arr, i) {
    remainingCardsContainer.innerHTML = "";

    const remainingCards = arr.slice(0, i + 1);

    remainingCards.forEach((value) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.textContent = value;

        remainingCardsContainer.appendChild(cardElement);
    });
}

function renderShuffledCards(card) {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    cardElement.textContent = card;
    cardElement.classList.add("shuffled");
    shuffledCardsContainer.appendChild(cardElement);
}
