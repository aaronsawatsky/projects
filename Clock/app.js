function showTime() {
    let currentTime = document.getElementById("time");
    let currentDate = document.getElementById("date");
    let today = new Date();
    let day = today.getDay();
    let month = today.getMonth();
    let date = today.getDate();
    let year = today.getFullYear();
    let dayArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let monthArr = ["January", "February", "March", "April", "May", "June", "July", "September", "October", "November", "December"];
    let hours = today.getHours();
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (hours > 12) {
        hours = hours - 12;
    }
    let minutes = today.getMinutes();
    if (minutes < 10) {
        minutes = "0" + minutes;
    };
    let seconds = today.getSeconds();
    if (seconds < 10) {
        seconds = "0" + seconds;
    };
    currentDate.innerHTML = dayArr[day] + ", " + monthArr[month] + " " + date + ", " + year;
    currentTime.innerHTML = hours + ":" + minutes + ":" + seconds;
    setTimeout("showTime()", 1000);
}
showTime();
