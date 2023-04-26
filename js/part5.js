window.part5 = (function () {
    "use strict";

    let nextBtn = document.getElementById("next"),
        testDiv = document.getElementById("test"),
        score = 0,
        s = 0,
        initial,
        readyBtn = document.createElement("BUTTON"),
        shapesDiv = document.createElement("div");

    readyBtn.innerHTML = "START";
    shapesDiv.className = "shapes";

    /** One element in guessArr will be the classlist
        for the object on display depending on sec in countdown.*/
    let guessArr = [
        "empty",
        "red square",
        "empty",
        "green circle",
        "empty",
        "yellow square",
        "empty",
        "purple circle",
        "empty",
        "blue square",
        "empty",
        "green square",
        "empty",
        "yellow circle",
        "empty",
        "purple square",
        "empty",
        "red circle",
        "empty",
        "blue circle"
    ];

    /** The function drawShapes() runs when the test has been initiated
        and append the tests divs and starts the countdown.*/
    function drawShapes() {
        testDiv.innerHTML = "";
        testDiv.appendChild(shapesDiv);
        countdown();
    }

    /** The function countdown() displays a shape every other second for 20 seconds.*/
    function countdown() {
        let sec = s;

        (function timer() {
            if (sec < 20) {
                sec++;
                initial = setTimeout(timer, 1000);
                shapesDiv.innerHTML = `<div class="${guessArr[sec]}"></div>`;
                shapesDiv.children[0].addEventListener("click", makeGuess);
            } else {
                nextTest();
            }
        })();
    }

    /** The function makeGuess() runs when a shape has been clicked on.*/
    function makeGuess() {
        event.target.style.pointerEvents = "none";
        let correct = ["red", "square"];
        let correct2 = ["yellow", "circle"];
        let correct3 = ["green", "circle"];
        let correct4 = ["purple", "circle"];
        let correct5 = ["blue", "circle"];

        if ((event.target.classList.contains(correct[0]) &&
            event.target.classList.contains(correct[1]))
        || (event.target.classList.contains(correct2[0]) &&
            event.target.classList.contains(correct2[1]))
        || (event.target.classList.contains(correct3[0]) &&
            event.target.classList.contains(correct3[1]))
        || (event.target.classList.contains(correct4[0]) &&
            event.target.classList.contains(correct4[1]))
        || (event.target.classList.contains(correct5[0]) &&
            event.target.classList.contains(correct5[1]))
        ) {
            score++;
        }
    }

    /** The function nextTest() displays the final score and the next-test button.*/
    function nextTest() {
        clearTimeout(initial);
        testDiv.innerHTML = `Your score was ${score} out of 5.`;
        nextBtn.style.pointerEvents = "auto";
        nextBtn.innerHTML = "FINISH";
        nextBtn.style.display = "block";
    }

    /** gameFive object includes the functions that will be
        available outside the module due to return.*/
    let gameFive = {
        init: function(testDiv) {
            let intro = [
                "Click on the following objects:",
                "<br>", "<br>",
                "Red square, ",
                "Not a square, ",
                "Other color than red."
            ];

            for (let i = 0; i < intro.length; i++) {
                testDiv.innerHTML +=  intro[i];
            }

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
            testDiv.innerHTML = "";
            readyBtn.style.display = "block";
            nextBtn.style.display = "none";
            score = 0;
            s = 0;
            clearTimeout(initial);
        }
    };

    return gameFive;
})();
