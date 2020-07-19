const plus = document.querySelector('.plus');
const minus = document.querySelector('.minus');
const people = document.querySelector('#people');
const btn = document.querySelector('.calculate');
const result = document.querySelector('.result');
const resultDiv = document.querySelector('.resultDiv');
const inputs = document.querySelectorAll('input');
resultDiv.style.display = "none";


plus.addEventListener('click', () => {
    people.value++;
});

minus.addEventListener('click', () => {
    people.value--;
    if (people.value < 0) {
        people.value = 0;
    }
});


//inputs.forEach(input => {
//    if (input.value.length === 0) {
//        btn.disabled = true;
//    } else {
//        btn.disabled = false;
//    }
//})

btn.addEventListener('submit', e => {
    e.preventDefault();
    let bill = document.querySelector('#bill');
    let tip = document.querySelector('.tip');
    let billVal = bill.value;
    let tipNum = (tip.options[tip.selectedIndex].value);
    let total = Math.round((billVal * `1.${tipNum}`) / people.value);
    result.textContent = `$${total}`;
    resultDiv.style.display = "block";
});
