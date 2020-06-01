let logBox = document.getElementById("battle-log")
let battleLog = document.getElementById("log");
let bossHP = document.getElementById("bossHP");
let playerHP = document.getElementById("playerHP");
let bossHealth = 1000;
let playerHealth = 1000;



// Attack option 1: Normal Attack
function normAtk() {
    let normalAtk = Math.floor(Math.random() * 50) + 1;
    let normalPercentage = Math.floor(Math.random() * 5) + 1;
        if (`${bossHealth - normalAtk}` < 1) {
            bossHP.innerHTML = "You Defeated";
        } else if (normalPercentage === 1) {
                battleLog.innerHTML = "Miss!";
        } else {
            battleLog.innerHTML = "Normal Attack" + ": " + normalAtk;
            bossHP.innerHTML = `${bossHealth = bossHealth - normalAtk} / 1000`;
        }
}

// Attack option 2: Heavy Attack 

function heavyAtk() {
    let heavyAtk = Math.floor(Math.random() * 200) + 1;
    let heavyPercentage = Math.floor(Math.random() * 3) + 1;
        if (`${bossHealth - heavyAtk}` < 1) {
            bossHP.innerHTML = "You Defeated";
        } else if (heavyPercentage === 1) {
            battleLog.innerHTML = "Miss!";
        } else {
            battleLog.innerHTML = "Heavy Attack" + ": " + heavyAtk;
            bossHP.innerHTML = `${bossHealth = bossHealth - heavyAtk} / 1000`;
        }
}

// Attack option 3: Magic Attack

function magicAtk() {
    let magicAtk = Math.floor(Math.random() * 150) + 1;
    let magicPercentage = Math.floor(Math.random() * 4) + 1;
        if (`${bossHealth - magicAtk}` < 1) {
        bossHP.innerHTML = "You Defeated";
    } else if (magicPercentage === 1) {
        battleLog.innerHTML = "Miss!";
    } else {
        battleLog.innerHTML = "Magic Attack" + ": " + magicAtk;
        bossHP.innerHTML = `${bossHealth = bossHealth - magicAtk} / 1000`;
    }
}

function endTurn() {
    let bossAtk = Math.floor(Math.random() * 100) + 1;
    let bossPercentage = Math.floor(Math.random() * 2) + 1;
    if (`${playerHealth - bossAtk}` < 1) {
        playerHP.innerHTML = "You Died"
    } else if (bossPercentage === 1) {
        battleLog.innerHTML = "You dodged the attack";
    } else {
        battleLog.innerHTML = "Radical Skateboarder inflicted " + bossAtk + " damage!";
        playerHP.innerHTML = `${playerHealth = playerHealth - bossAtk} / 1000`;
    }
}

setTimeout("endTurn()", 2000)