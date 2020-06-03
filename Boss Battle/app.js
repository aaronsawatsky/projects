let player = {
    name: " ",
    strength: 100,
    armour: 0,
    crit: 1.5,
};

function setPlayerName() {
    player.name = document.getElementById("name").value; 
}


let logBox = document.getElementById("battle-log")
let battleLog = document.getElementById("log");
let bossHP = document.getElementById("bossHP");
let playerHP = document.getElementById("playerHP");
let bossHealth = 1000;
let playerHealth = 1000;


// Scroll Function
function scroll() {
    logBox.scrollTop = logBox.scrollHeight;
}

// Enemy Attack

function enemyAttack() {
    let bossAtk = Math.floor(Math.random() * 100) + 1;
    let bossPercentage = Math.floor(Math.random() * 2) + 1;
    if (`${playerHealth - bossAtk}` < 1) {
        playerHP.innerHTML = "You Died";
        document.getElementById("normAtk-btn").disabled = true;
        document.getElementById("heavyAtk-btn").disabled = true;
        document.getElementById("magicAtk-btn").disabled = true;
    } else if (bossPercentage === 1) {
        battleLog.innerHTML += "You dodged the attack!<br /><br />";
    } else {
        battleLog.innerHTML += "Skate Punk shred fiercely on his skateboard for " + bossAtk + " damage!<br /><br />";
        playerHP.innerHTML = `You : ${playerHealth = playerHealth - bossAtk} / 1000`;
    }
}

// Attack option 1: Normal Attack

function normAtk() {
    let normalAtk = Math.floor(Math.random() * 50) + 1;
    let normalPercentage = Math.floor(Math.random() * 5) + 1;
        if (`${bossHealth - normalAtk}` < 1) {
            bossHP.innerHTML = "You Defeated";
            document.getElementById("normAtk-btn").disabled = true;
            document.getElementById("heavyAtk-btn").disabled = true;
            document.getElementById("magicAtk-btn").disabled = true;
        } else if (normalPercentage === 1) {
                battleLog.innerHTML += "Miss!<br /><br />";
        } else {
            battleLog.innerHTML += "Normal Attack" + ": " + normalAtk + " damage!<br /><br />";
            bossHP.innerHTML = `Skate Punk : ${bossHealth = bossHealth - normalAtk} / 1000`;
        }
}

// Attack option 2: Heavy Attack 

function heavyAtk() {
    let heavyAtk = Math.floor(Math.random() * 200) + 1;
    let heavyPercentage = Math.floor(Math.random() * 3) + 1;
        if (`${bossHealth - heavyAtk}` < 1) {
            bossHP.innerHTML = "You Defeated";
            document.getElementById("normAtk-btn").disabled = true;
            document.getElementById("heavyAtk-btn").disabled = true;
            document.getElementById("magicAtk-btn").disabled = true;
        } else if (heavyPercentage === 1) {
            battleLog.innerHTML += "Miss!<br /><br />";
        } else {
            battleLog.innerHTML += "Heavy Attack" + ": " + heavyAtk + " damage!<br /><br />";
            bossHP.innerHTML = `Skate Punk : ${bossHealth = bossHealth - heavyAtk} / 1000`;
        }
}

// Attack option 3: Magic Attack

function magicAtk() {
    let magicAtk = Math.floor(Math.random() * 150) + 1;
    let magicPercentage = Math.floor(Math.random() * 4) + 1;
        if (`${bossHealth - magicAtk}` < 1) {
        bossHP.innerHTML = "You Defeated";
        document.getElementById("magicAtk-btn").disabled = true;
        document.getElementById("heavyAtk-btn").disabled = true;
        document.getElementById("normAtk-btn").disabled = true;
    } else if (magicPercentage === 1) {
        battleLog.innerHTML += "Miss!<br /><br />";
    } else {
        battleLog.innerHTML += "Magic Attack" + ": " + magicAtk + " damage!<br /><br />";
        bossHP.innerHTML = `Skate Punk : ${bossHealth = bossHealth - magicAtk} / 1000`;
    }
}
