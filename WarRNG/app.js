
function rolePlayingGame() {
    const playerHealth = Math.floor(Math.random() * 600) + 1;
    let playerAtk = Math.floor(Math.random() * 600) + 1;
    if (playerAtk < playerHealth) {
       document.getElementById("p1").innerHTML = `Boss Attack: ${playerHealth} Player Attack: ${playerAtk}`;
        playerAtk = Math.floor(Math.random() * 600) + 1;
        document.getElementById("p2").innerHTML = "You Died"
    } else {
    document.getElementById("p1").innerHTML = `Boss Attack: ${playerHealth} Player Attack: ${playerAtk}`;
    document.getElementById("p2").innerHTML = "You Defeated";
    }
};