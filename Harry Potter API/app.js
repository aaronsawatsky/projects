const data = 'http://hp-api.herokuapp.com/api/characters'
const button = document.querySelector('.random');
const characterCards = document.querySelector('.character-cards');
const container = document.querySelector('.container');
const score = document.querySelector('.score');
let selectedCards = [];
let selectedDivs = [];
let selectedChildren = [];
let matchedCards = [];
let matchedNames = [];
let selectedNames = [];
let indexes = [];
let counter = 0;

fetch(data)
    .then(function(response) {
        return response.json();
    })
    .then(function(result) {
        result = result.concat(result);
        const shuffle = array => {
            var currentIndex = array.length, temporaryValue, randomIndex;
            while (0 !== currentIndex) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
            return array;
        }
        button.addEventListener('click', () => {
            button.ontransitionend = () => {
                characterCards.style.opacity = '1';
                button.innerText = "Shuffle Cards";
                score.style.opacity = '1';
            }
            button.style.top = '0';
            characterCards.innerHTML = '';
            shuffle(result);
            result.forEach(result => {
                let charCard = document.createElement('div');
                charCard.classList.add('playing-card');
                charCard.innerHTML =
                `<img src="${result.image}" alt="" class="pic">
                <p class="name">${result.name}</p>`
                characterCards.appendChild(charCard);
            })
        })
    })
characterCards.addEventListener('click', e => {
    console.log(e.target);
    if (e.target !== characterCards) {
        let arr = Array.from(characterCards.children);
        indexes.push(arr.indexOf(e.target.parentNode));
        selectedCards.push(e.target.parentNode.children[1].innerText);
        selectedDivs.push(e.target.parentNode);
        selectedChildren.push(e.target);
        selectedNames.push(e.target.parentNode.children[1]);
        e.target.style.opacity = '1';
        e.target.parentNode.children[1].style.display = 'initial';
        if (selectedCards.length === 2) {
            characterCards.style.pointerEvents = "none";
            if (selectedCards.every( (val, i, arr) => val === arr[0]) && !indexes.every((val, i, arr) => val === arr[0])) {
                characterCards.style.pointerEvents = "auto";
                console.log("MATCH");
                counter++;
                score.innerText = `Matches: ${counter}/25`;
                selectedDivs.forEach(div => {
                    matchedCards.push(div);
                });
                selectedDivs = [];
                matchedCards.forEach(card => {
                    card.classList.add('pics');
                })  
                selectedNames.forEach(name => {
                    matchedNames.push(name);
                })
                selectedNames = [];
                matchedNames.forEach(name => {
                    name.classList.add('pics');
                })
                selectedChildren = [];
                indexes = [];  
                selectedCards = [];
            
            } else {
                setTimeout(() => {
                    characterCards.style.pointerEvents = "auto";
                    selectedChildren.forEach(div => {
                        div.style.opacity = '0';
                    })
                    selectedNames.forEach(name => {
                        name.style.display = 'none';
                    })
                    selectedDivs = [];
                    selectedCards = [];
                    selectedChildren = [];
                    indexes = [];       
                }, 1000)
                console.log("NO MATCH");
            }
        }
        if (matchedCards.length === 50) {
            let gameOver = document.createElement('button');
            gameOver.classList.add('game-over');
            gameOver.innerText = 'Play Again?';
            container.appendChild(gameOver);
            gameOver.addEventListener('click', () => {
                window.location.reload();
            })
        }
    } else {
        characterCards.style.pointerEvents = 'none';
        setTimeout(() => {
            characterCards.style.pointerEvents = 'auto';
        }, 100)
    }
})
