function calculate() {
    let weight = document.getElementById("weight-input").value;
    let reps = document.getElementById("rep-input").value;
    let scale = document.getElementById("dropdown");
    if (scale.options[scale.selectedIndex].value === "lbs") {
        let result = weight / (1.0278 - (0.0278 * reps))
        document.getElementById("result").innerHTML = `Your one rep max is: ${Math.floor(result)} lbs`;
    } 
    if (scale.options[scale.selectedIndex].value === "kgs") {
        let result = weight / (1.0278 - (0.0278 * reps))
        document.getElementById("result").innerHTML = `Your one rep max is: ${Math.floor(result)} kgs`;
    }
}