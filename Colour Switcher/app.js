const btn = document.getElementById("btn");
const bg = document.getElementById("bg");
const colours = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];

function changeColour() {
    const colourIndex = Math.floor(Math.random() * colours.length);
    bg.style.backgroundColor = colours[colourIndex];
    if (bg.style.backgroundColor === colours[0]) {
        btn.innerHTML = "Red";
        }
        else if (bg.style.backgroundColor === colours[1]) {
            btn.innerHTML = "Orange";
        }
        else if (bg.style.backgroundColor === colours[2]) {
            btn.innerHTML = "Yellow";
        }
        else if (bg.style.backgroundColor === colours[3]) {
            btn.innerHTML = "Green";
        }
        else if (bg.style.backgroundColor === colours[4]) {
            btn.innerHTML = "Blue";
        }
        else if (bg.style.backgroundColor === colours[5]) {
            btn.innerHTML = "Indigo";
        }
        else if (bg.style.backgroundColor === colours[6]) {
            btn.innerHTML = "Violet";
        }
}