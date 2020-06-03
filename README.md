# Boss Battle

An expanded idea of "War RNG." While "War RNG" only displayed numbers and text, "Boss Battle" has a UI that is akin to classic role-playing games from the 1990s. The user has three different options to attack the enemy, all with varying degrees of attack strength and hit percentage. When the user clicks "End Turn" the boss will attack the user. Any action that occurs will be displayed in the log at the bottom of the screen until either the boss or the player is defeated. 
Changes thus far: 
  - Automated enemy attack using the "setTimeout()" function so that the enemy will initiate an attack 1 second after the user inputs a     command
  - Removed the "End Turn" button
  - CSS styled and positioned the Hit Point counters for both the enemy and user
  - Disabled attack buttons once either the enemy's or user's Hit Points reach zero

This project is growing into a Choose Your Own Adventure RPG. 
  - Added a welcome screen where the user can input their name
  - The value of the input is then stored in a property within an object dedicated to the user's information, which includes statistics     like strength, critical hit percentages, and so on. 

# Clock 

Another project inspired by jsbeginners.com. The project as it stands now displays the current date and time in a small, rounded window. 
Upcoming changes: 
  - CSS style the window to mimic a smartphone lock screen (in terms of format and shape) (finished)
  - CSS style the font and spacing (finished)
  - Add background image (finished)
  - Center the entire <div> in the center
  - Add a gradient background behind the <div>

Things I learned from this project:
  - The "setTimeout()" function, which in this situation continues to call the nested function (the one that displays the time) every       1000ms (so it updates the current time every second, as if it is running continuously like a regular clock). 
  - When attempting to break the code, the setTimeout() function seemed to the one that caused the most problems. Without it set at all,     or at an appropriate interval, the clock would not run as it is intended. 

# Colour Switcher

A simple colour switcher application. The inspiration for this project was taken from jsbeginners.com. As the user clicks the button, the JavaScript function randomly selects an index of an array of colours and changes the background of the page. The text value inside the button also changes to the name of the colour that is currently displayed.

# One Rep Max (1RM) Calculator 

A calculation tool for weightlifters. The user inputs the weight of any given exercise and calculates their estimated one rep max presented in either pounds (lbs) or kilograms (kgs). Future changes include adding percentages of the user's one rep max in order to train for different purposes. 

# "War" RNG

A random number generator that mimics a combat scenario in a role-playing game. It compares two numbers against eachother within a range (1-600) that represent attack values for the player and "boss". The higher number wins and the user is greeted with a message: either "You Died" or "You Defeated".
