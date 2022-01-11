'use strict';

// Defining functions
let state = {
    currentDate : 0
};

function renderOverview(selectedDay) {
    let moodWord = document.querySelector(".mood-word");
    
    let p2 = document.querySelector(".activities");
    let p3 = document.querySelector(".user-highlight");
    let p4 = document.querySelector(".user-struggle");
    let moodStrings = ["awful", "terrible", "ok", "terrific", "awesome"]

    let reflectionHeader = document.querySelectorAll('h2')[1];
    let selectedDate = selectedDay.date;
    let cleanDate = selectedDate.replace('2021-', '');
    reflectionHeader.textContent = cleanDate + ' Reflection';

    document.querySelector('.display-ref').textContent = selectedDay.reflection;

    moodWord.textContent = moodStrings[selectedDay.avgMood - 1];
    if (selectedDay.activities.length === 0) {
        p2.textContent = "You haven't added any activity today!";
    } else {
        p2.textContent = "Your activities from today included: ";
        for (let activity of selectedDay.activities) {
            let listEle = document.createElement("li");
            listEle.textContent = activity;
            p2.appendChild(listEle);
        }
    }

    if (selectedDay.highlights == "") {
        p3.textContent = "You haven't added any highlights today!";
    } else {
        p3.textContent = 'Your highlight of the day was "' + selectedDay.highlights + '"';
    }
        
    if (selectedDay.struggles == "") {
        p4.textContent = "You haven't added any struggles today!";
    } else {
        p4.textContent = 'Your struggle of the day was "' + selectedDay.struggles + '"';
    }

}


function setDays(userData) {
    let wholeGrid = document.querySelector('.grid');
    let today = new Date();
    gridSetUp(wholeGrid, today);

    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let monthHeader = document.querySelector('h2');
    monthHeader.textContent = monthHeader.textContent.replace('{Month}', months[today.getMonth()]);

    if(userData.days.length === 0) {
        let errorObj = new Error('Start journaling!');
        noGridData(errorObj);

    }

    userData.days.forEach((day) => {
        let current = document.getElementById(day.date);
        let moods = ['one', 'two', 'three', 'four', 'five'];
        current.classList.add(moods[day.avgMood - 1]);
        current.addEventListener("click", function () {
            state.currentDate = current.value;
            renderOverview(userData.days[state.currentDate - 1]);
        });
    });

}


function gridSetUp(grid, today) {
    let monthFirstDate = new Date(today.getFullYear(), (today.getMonth()), 1);
    let monthLastDate = new Date(today.getFullYear(), (today.getMonth() + 1), 0);

    for(let i = 0; i < grid.children.length; i++) {
        let current = grid.children[i];
        let month = today.getMonth() + 1;
        let day = i;
        
        current.value = day;
        if(month < 10) {
            month = '0' + month;

        }
        if(day < 10) {
            day = '0' + day;

        }

        let cleanDate = '' + today.getFullYear() + '-' + month + '-' + day;

        if(i < 7) {
            if(i < monthFirstDate.getDay()) {
                current.classList.add('not-yet');

            } else {
                current.classList.add('to-go');
                current.setAttribute('id', cleanDate);
                current.textContent = day;
            }

        } else if(i > monthLastDate.getDate()) {
            current.classList.add('not-yet');

        } else {
            current.classList.add('to-go');
            current.setAttribute('id', cleanDate);
            current.textContent = day;
        }
    }
}


function noGridData(errorObj) {
    let indexParent = document.querySelector('.msg');
    if(indexParent) {
        let alert = document.createElement('div');
        alert.classList.add('alert', 'alert-info');
        alert.textContent = errorObj.message;
    
        indexParent.insertBefore(alert, indexParent.childNodes[0]);

    }

}


fetch('./user-data/user.json')
    .then((response) => {
        return response.json();

    })
    .then((data) => {
        setDays(data);

    })
    .catch((error) => {
        noGridData(error);

    });


let mainButtons = document.querySelectorAll('.button');
for(let i = 0; i < mainButtons.length; i++) {
    mainButtons[i].addEventListener('mouseenter', () => {
        mainButtons[i].classList.toggle('button-hover');

    });

    mainButtons[i].addEventListener('mouseleave', () => {
        mainButtons[i].classList.toggle('button-hover');

    });

}


let navButtons = document.querySelectorAll('.nav-link');
for(let i = 0; i < navButtons.length; i++) {
    navButtons[i].addEventListener('mouseenter', () => {
        navButtons[i].classList.toggle('text-light');
        navButtons[i].innerHTML = '<strong>' + navButtons[i].textContent + '</strong>';

    });

    navButtons[i].addEventListener('mouseleave', () => {
        navButtons[i].classList.toggle('text-light');
        navButtons[i].innerHTML = navButtons[i].textContent;

    }); 

}


let gridBoxes = document.querySelectorAll('.grid-box');
for(let i = 0; i < gridBoxes.length; i++) {
    gridBoxes[i].addEventListener('mouseenter', () => {
        gridBoxes[i].classList.toggle('grid-hover');

    });

    gridBoxes[i].addEventListener('mouseleave', () => {
        gridBoxes[i].classList.toggle('grid-hover');

    })

}


let moments = document.getElementById('moments');

let loadFile = function(event) {
    let output = document.createElement('img');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.alt = "a moment uploaded by the user"
    output.classList.add("secondmoment")
    output.onload = function() {
        URL.revokeObjectURL(output.src) // free memory
    }
    let momentContainer = document.createElement('div');
    momentContainer.appendChild(output);
    moments.appendChild(momentContainer);

    };


document.querySelector('#submit-button').addEventListener('click', (event) => {
    event.preventDefault();

    let entryDate = document.getElementById('journal_date').value;
    let entryMood = document.getElementById('mood').value;
    let entryActivities = [];
    let check = document.querySelectorAll('input[type=checkbox]');
    for(let i = 0; i < check.length; i++) {
        if(check[i].checked) {
            entryActivities.push(check[i].value);
        }
    }
    let entryHighlight = document.getElementById('highlight_field').value;
    let entryStruggle = document.getElementById('struggle_field').value;
    let entryJournal = document.getElementById('main_journal_field').value;

    let newCard = document.createElement('div');
    newCard.classList.add("card");
    let cards = document.querySelector('.cards');

    let date = document.createElement('h2');
    date.textContent = "Journal Date: " + entryDate;
    date.classList.add('h3');
    newCard.appendChild(date);

    let mood = document.createElement('p');
    mood.textContent = "Mood score: " + entryMood;
    newCard.appendChild(mood);

    let activities = document.createElement('p');
    activities.textContent = "Activities: "
    for (let i = 0; i < entryActivities.length; i++) {
        activities.textContent += entryActivities[i];
        if(i < entryActivities.length - 1) {
            activities.textContent += ", ";
        }
    }
    newCard.appendChild(activities);
    
    let highlight = document.createElement('p');
    highlight.textContent = "Daily highlight: " + entryHighlight;
    newCard.appendChild(highlight);

    let struggle = document.createElement('p');
    struggle.textContent = "Daily Struggle: " + entryStruggle;
    newCard.appendChild(struggle);

    let journal = document.createElement('p');
    journal.textContent = " Daily Journal: " + entryJournal;
    newCard.appendChild(journal);

    cards.insertBefore(newCard, cards.childNodes[0]);

    
});

loadFile();