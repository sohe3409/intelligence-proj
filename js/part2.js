window.part2 =(function () {
    "use strict";

    let nextBtn = document.getElementById("next"),
        score = 0,
        correct = "",
        quizDiv = document.createElement("div"),
        ask = document.createElement("div"),
        optionOne = document.createElement("div"),
        optionTwo = document.createElement("div"),
        optionThree = document.createElement("div"),
        optionFour = document.createElement("div"),
        options = [optionOne, optionTwo, optionThree, optionFour];

    quizDiv.className = "quiz";

    /** Adding click-events to the questions options.*/
    for (let i = 0; i < options.length; i++) {
        options[i].addEventListener("click", makeGuess);
    }

    /** The function getRandomInt returns a random integear between the number min and max.*/
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    /**The function question() displays the fizzbuzz series and the options.*/
    function question() {
        let start = getRandomInt(10, 30);
        let stop = start + 5;
        let series =  fizzBuzz(start, stop);

        correct = series.slice(-1);
        ask.innerHTML = series.slice(0, -1).join(" , ") + " , ?";
        optionOne.innerHTML = "Fizz";
        optionTwo.innerHTML = "Buzz";
        optionThree.innerHTML = "Fizz Buzz";
        optionFour.innerHTML = stop;
    }

    /** The function fizzBuzz() creates and returns a
        fizzbuzz series of the numbers between start and stop.*/
    function fizzBuzz(start, stop) {
        let series = [];

        for (let i = start; i <= stop; i++) {
            if (i%3 === 0 && i%15 != 0) {
                series.push("Fizz");
            } else if (i%5 === 0 && i%15 != 0) {
                series.push("Buzz");
            } else if (i%15 === 0) {
                series.push("Fizz Buzz");
            } else {
                series.push(i);
            }
        }
        return series;
    }

    /** The function makeGuess() runs when an option has been clicked on.*/
    function makeGuess() {
        setTimeout(nextTest, 2000);
        if (event.target.innerHTML === correct.join()) {
            score += 3;
        }

        for (let i = 0; i < options.length; i++) {
            if (options[i].innerHTML === correct.join()) {
                options[i].style.outline = "3px solid #00b200";
            } else {
                options[i].style.outline = "3px solid #ff4500";
            }
        }

        /** The function nextTest() displays the final score and the next-test button.*/
        function nextTest() {
            for (let i = 0; i < options.length; i++) {
                options[i].style.outline = "none";
            }
            quizDiv.innerHTML = `Your score was ${score} out of 3.`;
            nextBtn.style.pointerEvents = "auto";
            nextBtn.innerHTML = "NEXT";
            nextBtn.style.display = "block";
        }
    }

    /** gameTwo object includes the functions that will
        be available outside the module due to return.*/
    let gameTwo = {
        init: function(testDiv) {
            question();
            testDiv.appendChild(quizDiv);
            quizDiv.appendChild(ask);
            quizDiv.appendChild(optionOne);
            quizDiv.appendChild(optionTwo);
            quizDiv.appendChild(optionThree);
            quizDiv.appendChild(optionFour);
        },

        getScore: function() {
            return score;
        },

        reset: function() {
            quizDiv.innerHTML = "";
            nextBtn.style.display = "none";
            score = 0;
        }
    };

    return gameTwo;
})();
