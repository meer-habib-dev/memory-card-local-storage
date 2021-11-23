const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn= document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');

//keep track of current card
let currentActiveCard = 0;
 
//store DOM cards
const cardsEL = [];

//store card Data
const cardData = getCardData();
// //show card data
// const cardData = [
//     {
//         question: 'What must a variable begin with?',
//         answer: 'A letter, $ or _'
//     },
//     {
//         question: 'What is a variable?',
//         answer: 'Container for a piece of data'
//     },
//     {
//         question: 'Example of Case Sensitive Variable',
//         answer: 'thisIsAVariable'
//     }
// ];

// create all cards 
function createCards() {
    cardData.forEach((data,index) => createCard(data,index))
}

//create a single card in DOM
function createCard(data, index) {
    const card = document.createElement('div');
    card.classList.add('card');

    if (index === 0) {
        card.classList.add('active');
    }

    card.innerHTML = `
        <div class="inner-card">
                <div class="inner-card-front">
                    <p>${data.question}</p>
                </div>
                <div class="inner-card-back">
                    <p>${data.answer}</p> 
                </div>
        </div>
    `;

    card.addEventListener('click', () => card.classList.toggle('show-answer'));     

    //Add to DOM Cards
    cardsEL.push(card);

    cardsContainer.append(card);

    updateCurrentText();

}

//show number of cards

function updateCurrentText() {
    currentEl.innerText = `${currentActiveCard + 1}/${cardsEL.length}`
}

// get cards from local storage 

function getCardData() {
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;
}

//set cards data in localstorage

function setcardsData(card) {
   localStorage.setItem('cards',JSON.stringify(card))
}

createCards();


// event listeners
// next button
nextBtn.addEventListener('click', () => {
    cardsEL[currentActiveCard].className = 'card left';

    currentActiveCard = currentActiveCard + 1;

    if (currentActiveCard > cardsEL.length - 1) {
        currentActiveCard = cardsEL.length - 1;
    }
    cardsEL[currentActiveCard].className = 'card active';

    updateCurrentText()
})

// previous button
prevBtn.addEventListener('click', () => {
    cardsEL[currentActiveCard].className = 'card right';

    currentActiveCard = currentActiveCard - 1;

    if (currentActiveCard < 0) {
        currentActiveCard =0;
    }
    cardsEL[currentActiveCard].className = 'card active';

    updateCurrentText()
})

//show add container
showBtn.addEventListener('click',() => addContainer.classList.add('show'))

//hide add container
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));

//add new card
addCardBtn.addEventListener('click', () => {
    const question = questionEl.value;
    const answer = answerEl.value;

    if (question.trim() && answer.trim()) {
        const newCard = { question, answer };

        createCard(newCard);

        questionEl.value = '';
        answerEl.value = '';

        addContainer.classList.remove('show');
        setcardsData(cardData);
        cardData.push(newCard);
    } else {
        alert('madari kichu lek...!!!');
    }
})