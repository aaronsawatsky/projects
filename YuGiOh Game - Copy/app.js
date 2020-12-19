const dataBase = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';
const cardImages = 'https://storage.googleapis.com/ygoprodeck.com/pics/';
const hand = document.querySelector('.hand');
const opponentDeck = document.querySelector('.opponent-deck');
const playerDeck = document.querySelector('.player-deck');
const playerHandandDeck = document.querySelector('.player-hand-and-deck');
const playerHand = document.querySelectorAll('.player-hand');
const zoom = document.querySelector('.zoom');
const zoomCard = document.querySelector('.zoom-card');
const fieldZoomCard = document.querySelector('.field-zoom-card');
const cancel = document.querySelector('.cancel');
const set = document.querySelector('.set');
const zoomButtons = document.querySelector('.zoom-buttons');
const fieldButtons = document.querySelector('.field-buttons');
const attackMode = document.querySelector('.attack-mode');
const defence = document.querySelector('.defence');
const attack = document.querySelector('.attack');
const sacrifice = document.querySelector('.sacrifice');
const confirmSacrifice = document.querySelector('.confirm-sacrifice');
const endTurn = document.querySelector('.end');
const playerField = document.querySelector('.player-field');
const playerField1 = document.querySelector('.player-field1');
const playerField2 = document.querySelector('.player-field2');
const playerField3 = document.querySelector('.player-field3');
const playerField4 = document.querySelector('.player-field4');
const playerField5 = document.querySelector('.player-field5');
const playerFieldCell = document.querySelectorAll('.player-field-cell');
const graveyard = document.querySelector('.graveyard');
let sacrificeToggle = false;
let monsterCards = [];
let sacrificeTally = 0;
let setTally = 0;
let moveToGraveyard;
let deck1 = [];
let deck2 = [];
let playerFiveCardHandObjects = [];
let inPlay = [];
let selectedImage = [];
let graveyardCards = [];
let sacrificedCards = [];
let toSacrifice;
let playerHandandDeckChildren = Array.from(playerHandandDeck.children);
let playerFieldChildren = Array.from(playerField.children);

// Creating tag indicating Defence Mode
let d = document.createElement('p');
d.classList.add('defence-tag');
d.innerHTML = "D";

//Retrieving data from JSON and extracting only normal monster cards --> organizing those cards into two decks and shuffling
fetch(dataBase)
    .then(function(response) {
        return response.json();
    })

    // Getting only Normal Monster Cards
    .then(function(result) {
        result.data.forEach(result => {
            if (result.type === "Normal Monster") {
                monsterCards.push(result);
            }
        });

        //Shuffle Function
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

        // Shuffling all of the cards and then separating into two separate decks
        shuffle(monsterCards);
        for (let i = 0; i < 30; i++) {
            deck1.push(monsterCards[i]);
        }
        shuffle(monsterCards);
        for (let i = 0; i < 30; i++) {
            deck2.push(monsterCards[i]);
        }

        //For each card in each deck, creating a div in which to contain the image and then adding it to the "Deck" divs on either side of the field
        deck1.forEach(card => {
            let playingCardOne = document.createElement('div');
            playingCardOne.classList.add('playing-card-one');
            playingCardOne.innerHTML = 
                `<img src="${cardImages+card.id}.jpg" alt="" class="pic">`
            opponentDeck.appendChild(playingCardOne);
        })
        deck2.forEach(card => {
            let playingCardTwo = document.createElement('div');
            playingCardTwo.classList.add('playing-card-two');
            playingCardTwo.innerHTML = 
                `<img src="${cardImages+card.id}.jpg" alt="" class="pic">`
            playerDeck.appendChild(playingCardTwo);
        })

        // Draw hand function
        const drawHand = (deck, hand, handAndDeckChildren) => {
            deck.forEach(card => {
                if (hand.length < 5) {
                    hand.push(deck.shift(card));
                }
                for (let i = 0; i < 5; i++) {
                    for (let j = 0; j < hand.length; j++) {
                        if (i === j) {
                        // handAndDeckChildren[i].innerHTML = `<img src="${cardImages+hand[j].id}.jpg" alt="" class="pic">`
                        handAndDeckChildren[i].style.backgroundImage = `url(${cardImages+hand[j].id}.jpg)`
                        }
                    }
                }
            })
        }

        // When user clicks on their own deck, it populates their hand with the first 5 cards in the list (indexes 0-5);
        playerDeck.addEventListener('click', (e) => {
            drawHand(deck1, playerFiveCardHandObjects, playerHandandDeckChildren);
        })

        // When user clicks on the cards in their hand, another div opens up to give the user a zoomed in image of the card.
        // User can then choose from a few buttons to initiate an action.
        playerHandandDeck.addEventListener('click', e => {
            let imgURL = e.target.style.backgroundImage.replace('url','');
            imgURL = imgURL.slice(2,-2);
            // console.log(imgURL);
            // apply this to cards that have been removed from hand
            playerHand.forEach(hand => {
                hand.style.pointerEvents = 'auto';
            })
            if (!e.target.parentNode.parentNode.classList.contains('player-deck')) {
                attack.style.display = 'none';
                sacrifice.style.display = 'none';
                zoom.style.display = 'block';
                zoomCard.innerHTML = 
                `<img src="${imgURL}" alt="" class="pic">`
                selectedImage.push(imgURL);
                console.log(selectedImage[0]);
            }
        })

        // To add a selected card to the field and in play, the user clicks on the desired card, then the space to which they want to play the card
        playerField.addEventListener('click', e => {
            //Loops through the cards in the hand and removes that card from the hand since that card has been played
            for (let i = 0; i < 5; i++) {
                if (parseInt(playerHandandDeckChildren[i].style.backgroundImage.replace(/\D/g,'')) === parseInt(selectedImage[0].replace(/\D/g,''))) {
                    playerHandandDeckChildren[i].style.backgroundImage = '';
                }
            }
            // Loop through the hand and take it from the hand and into the "inPlay" array. 
            playerFiveCardHandObjects.forEach(card => {
                if (card.id === parseInt(selectedImage[0].replace(/\D/g,''))) {
                    let moveToInPlay = playerFiveCardHandObjects.indexOf(card);
                    inPlay.push(playerFiveCardHandObjects.splice(moveToInPlay, 1));
                    // console.log(playerFiveCardHandObjects);
                    //console.log(inPlay);
                }
            })
            for (let i = 0; i < 5; i++) {
                playerFieldChildren[i].style.animation = '';
            }
            playerFieldChildren.forEach(child => {
                if (!child.style.backgroundImage) {
                    e.target.style.backgroundImage = `url(${selectedImage[0]})`
                }
            })
            //selectedImage = [];
        })

        // For each field cell, this allows the user to select the card that is in play and decide to either sacrifice or attack. 
        playerField1.addEventListener('click', e => {
            if (!playerField1.style.backgroundImage) {
                attack.style.display = 'inline-block';
                sacrifice.style.display = 'inline-block';
                set.style.display = 'none';
                attackMode.style.display = 'none';
                defence.style.display = 'none';
                zoom.style.display = 'block';
                zoomCard.innerHTML = 
                `<img src="${e.target.style.backgroundImage}" alt="" class="pic">`;
            }
        })
        playerField2.addEventListener('click', e => {
            if (playerField2.getElementsByTagName('img').length > 0) {
                attack.style.display = 'inline-block';
                sacrifice.style.display = 'inline-block';
                set.style.display = 'none';
                attackMode.style.display = 'none';
                defence.style.display = 'none';
                zoom.style.display = 'block';
                zoomCard.innerHTML = 
                `<img src="${imgURL}" alt="" class="pic">`;
            }
        })
        playerField3.addEventListener('click', e => {
            if (playerField3.getElementsByTagName('img').length > 0) {
                attack.style.display = 'inline-block';
                sacrifice.style.display = 'inline-block';
                set.style.display = 'none';
                attackMode.style.display = 'none';
                defence.style.display = 'none';
                zoom.style.display = 'block';
                zoomCard.innerHTML = 
                `<img src="${e.target.src}" alt="" class="pic">`;
            }
        })
        playerField4.addEventListener('click', e => {
            if (playerField4.getElementsByTagName('img').length > 0) {
                attack.style.display = 'inline-block';
                sacrifice.style.display = 'inline-block';
                set.style.display = 'none';
                attackMode.style.display = 'none';
                defence.style.display = 'none';
                zoom.style.display = 'block';
                zoomCard.innerHTML = 
                `<img src="${e.target.src}" alt="" class="pic">`;
            }
        })
        playerField5.addEventListener('click', e => {
            if (playerField5.getElementsByTagName('img').length > 0) {
                attack.style.display = 'inline-block';
                sacrifice.style.display = 'inline-block';
                set.style.display = 'none';
                attackMode.style.display = 'none';
                defence.style.display = 'none';
                zoom.style.display = 'block';
                zoomCard.innerHTML = 
                `<img src="${e.target.src}" alt="" class="pic">`;
            }
        })


// ---------------------------------------------------- button functionality --------------------------------------------------------
        endTurn.addEventListener('click', () => {
            setTally = 0;
        })
        cancel.addEventListener('click', () => {
            zoom.style.display = 'none';
            attackMode.style.display = 'none';
            defence.style.display = 'none';
            set.style.display = 'inline-block';
            selectedImage = [];
        })

        sacrifice.addEventListener('click', () => {
            toSacrifice = zoomCard.getElementsByTagName('img')[0].src;
            confirmSacrifice.style.display = 'inline-block';
            sacrifice.style.display = 'none';
            
        })
        confirmSacrifice.addEventListener('click', () => {
            sacrificeToggle = true;
            inPlay.forEach(card => {
                if (card[0].id === parseInt(toSacrifice.replace(/\D/g,''))) {
                    moveToGraveyard = inPlay.indexOf(card);
                    graveyardCards.push(inPlay.splice(moveToGraveyard, 1));
                    sacrificeTally++;
                    // console.log(graveyardCards);
                }
            })
            graveyard.innerHTML = `<img src="${toSacrifice}" alt="" class="pic">`
            zoom.style.display = 'none';
            confirmSacrifice.style.display = 'none';
            set.style.display = 'inline-block';
            sacrifice.style.display = 'inline-block';
            for (let i = 0; i < 5; i++) {
                if (parseInt(playerFieldChildren[i].innerHTML.replace(/\D/g,'')) === parseInt(toSacrifice.replace(/\D/g,''))) {
                    playerFieldChildren[i].innerHTML = '';
                }
            }
            // console.log(sacrificeToggle);
            //console.log(sacrificeTally) 
        })
        set.addEventListener('click', () => {
            if (setTally < 1) {
                set.style.display = 'none';
                attackMode.style.display = 'inline-block';
                defence.style.display = 'inline-block';
                setTally++;
            } else {
                alert("Only one set per turn");
            }
            playerFiveCardHandObjects.forEach(object => {
                if (object.id === parseInt(zoomCard.innerHTML.replace(/\D/g,''))) {
                    if (object.level < 5) {
                        set.style.display = 'none';
                        attackMode.style.display = 'inline-block';
                        defence.style.display = 'inline-block'; 
                    }
                    if (object.level >= 5 && object.level < 7) {
                        if (sacrificeToggle === true && sacrificeTally === 1) {
                            set.style.display = 'none';
                            attackMode.style.display = 'inline-block';
                            defence.style.display = 'inline-block';
                            sacrificeTally = 0;
                        } else {
                            alert("You need to sacrifice 1 card");
                        }
                    } if (object.level >= 7) {
                        if (sacrificeToggle === true && sacrificeTally === 2) {
                            set.style.display = 'none';
                            attackMode.style.display = 'inline-block';
                            defence.style.display = 'inline-block';
                            sacrificeTally = 0;
                        } else {
                            alert("You need to sacrifice 2 cards");
                        }
                    }
                }
            })
            // console.log(sacrificeToggle);
        })
        attackMode.addEventListener('click', () => {
            playerFiveCardHandObjects.forEach(object => {
                if (object.id === parseInt(zoomCard.innerHTML.replace(/\D/g,''))) {
                    object.status = 'attack';
                    //console.log(object.status);
                }
            })
            zoom.style.display = 'none';
            set.style.display = 'inline-block';
            cancel.style.display = 'inline-block';
            attackMode.style.display = 'none';
            defence.style.display = 'none';
            for (let i = 0; i < 5; i++) {
                playerFieldChildren[i].style.animation = 'animate 2s linear infinite';
            }
            sacrificeToggle = false;
        })
        defence.addEventListener('click', () => {
            playerFiveCardHandObjects.forEach(object => {
                if (object.id === parseInt(zoomCard.innerHTML.replace(/\D/g,''))) {
                    object.status = 'defence';
                    //console.log(object.status);
                }
            })
            zoom.style.display = 'none';
            set.style.display = 'inline-block';
            cancel.style.display = 'inline-block';
            attackMode.style.display = 'none';
            defence.style.display = 'none';
            for (let i = 0; i < 5; i++) {
                playerFieldChildren[i].style.animation = 'animate 2s linear infinite';
            }
        })
    })


    // defence mode