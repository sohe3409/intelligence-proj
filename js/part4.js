window.part4 = (function () {
    "use strict";

    let nextBtn = document.getElementById("next"),
        testDiv = document.getElementById("test"),
        score = 0,
        count = 0,
        s = 16,
        initial,
        correct = "",
        readyBtn = document.createElement("BUTTON"),
        readDiv = document.createElement("div"),
        countDiv = document.createElement("div"),
        shapesDiv = document.createElement("div"),
        guessList = document.createElement("div"),
        shapeClick = shapesDiv.children,
        guessClick = guessList.children;

    readyBtn.innerHTML = "START";
    readDiv.className = "seeRead";
    countDiv.className = "clock";
    shapesDiv.className = "shapes";
    guessList.className = "guess2";

    /** The elements in guessArr will be the classlist
        for each object on display and the guess lists content.*/
    let guessArr = [
        "red square",
        "blue circle",
        "green circle",
        "yellow square",
        "purple circle",
        "blue square",
        "green square",
        "yellow circle",
        "purple square",
        "red circle"
    ];

    let index = [1, 3, 6, 4, 8, 5, 9, 2, 7, 0];

    /** Creating the shapes and ordered list.*/
    for (let i = 0; i < guessArr.length; i++) {
        shapesDiv.innerHTML += `<div class="${guessArr[index[i]]}"></div>`;
        guessList.innerHTML += "<p>" + (i + 1)+ ". " + guessArr[i] + "</p>";
    }

    /** Adding click-events to the different shapes.*/
    for (let i = 0; i < shapeClick.length; i++) {
        shapeClick[i].addEventListener("click", makeGuess);
    }

    /** The function drawShapes() runs when the test has been initiated
        and append the tests divs and starts the countdown.*/
    function drawShapes() {
        testDiv.innerHTML = "";
        testDiv.appendChild(readDiv);
        readDiv.appendChild(countDiv);
        readDiv.appendChild(shapesDiv);
        readDiv.appendChild(guessList);
        countdown();
    }

    /** The function countdown() displays a timer clock for 15s.*/
    function countdown() {
        let sec = s;

        (function timer() {
            if (0 < sec) {
                sec--;
                initial = setTimeout(timer, 1000);
                countDiv.innerHTML = (sec + ' secs');
            } else {
                nextTest();
            }
        })();
    }

    /** The function makeGuess() runs when a shape has been clicked on.*/
    function makeGuess() {
        correct = guessArr[count].split(" ");
        if (event.target.classList.contains(correct[0])
            && event.target.classList.contains(correct[1])) {
            guessClick[count].style.opacity = "0.5";
            score++;
            count++;
            if (count === 10) {
                nextTest();
            }
        } else {
            guessClick[count].style.opacity = "0.5";
            count++;
            if (count === 10) {
                nextTest();
            }
        }
    }

    /** The function nextTest() displays the final score and the next-test button.*/
    function nextTest() {
        clearTimeout(initial);
        countDiv.innerHTML = "";
        testDiv.innerHTML = `Your score was ${score} out of 10.`;
        nextBtn.style.pointerEvents = "auto";
        nextBtn.innerHTML = "NEXT";
        nextBtn.style.display = "block";
    }

    /** gameFour object includes the functions that will be
        available outside the module due to return.*/
    let gameFour = {
        init: function(testDiv) {
            clearTimeout(initial);
            testDiv.innerHTML =
            "You have 15 seconds to click on the right shape in the order of the list.";
            testDiv.appendChild(readyBtn);
            readyBtn.addEventListener("click", function() {
                testDiv.innerHTML = "";
                readyBtn.style.display = "none";
                drawShapes();
            });
        },
        getScore: function() {
            return score;
        },
        reset: function() {
            clearTimeout(initial);
            testDiv.innerHTML = "";
            countDiv.innerHTML = "";
            readyBtn.style.display = "block";
            nextBtn.style.display = "none";
            score = 0;
            count = 0;
            s = 16;
            for (let i = 0; i < guessClick.length; i++) {
                guessClick[i].style.opacity = "1";
            }
        }
    };

    return gameFour;
})();
