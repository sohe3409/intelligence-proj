window.part3 = (function () {
    "use strict";
    let nextBtn = document.getElementById("next"),
        testDiv = document.getElementById("test"),
        score = 0,
        count = 0,
        correct = "",
        readyBtn = document.createElement("BUTTON"),
        memDiv = document.createElement("div"),
        flagsDiv = document.createElement("div"),
        guessList = document.createElement("div"),
        guessArr = [
            "Sweden", "Guinea", "Japan",
            "Sweden", "Japan", "Guinea",
            "Guinea", "Japan", "Sweden"
        ];

    readyBtn.innerHTML = "START";
    memDiv.className = "memory";
    flagsDiv.className = "flags";
    guessList.className = "guess";

    /** Creating the object for the flags.*/
    let flag = {
        country: "",
        init: function(cou) {
            this.country = cou;
        },
        draw: function() {
            return `<div class="flag ${this.country}">
                        <div class="part1"></div>
                        <div class="part2"></div>
                        <div class="hide"></div>
                    </div>`;
        }
    };

    let sweFlag = Object.create(flag);
    let japFlag = Object.create(flag);
    let guiFlag = Object.create(flag);

    sweFlag.init("swe");
    japFlag.init("jap");
    guiFlag.init("gui");

    let countries = [
        sweFlag, japFlag, guiFlag,
        guiFlag, sweFlag, japFlag,
        sweFlag, guiFlag, japFlag
    ];

    for (let i = 0; i < 9; i++) {
        flagsDiv.innerHTML += countries[i].draw();
        guessList.innerHTML += "<p>" + (i + 1)+ ". " + guessArr[i] + "</p>";
    }

    /** The function hideFlags() runs 5 seconds
        after the test has been initiated to hide the flags.*/
    function hideFlags()  {
        let all = document.getElementsByClassName("hide");

        for (let i = 0; i < all.length; i++) {
            all[i].style.background = "#9932cc";
            all[i].addEventListener("click", makeGuess);
            all[i].style.pointerEvents = "auto";
        }
        memDiv.append(guessList);
    }

    /** The function drawFlags() runs when the test has been initiated and append the flagsDiv*/
    function drawFlags() {
        testDiv.innerHTML = "";
        testDiv.appendChild(memDiv);
        memDiv.append(flagsDiv);
        let all = document.getElementsByClassName("hide");

        for (let i = 0; i < all.length; i++) {
            all[i].style.background = ("none");
            all[i].style.opacity = ("1");
        }
        setTimeout(hideFlags, 5000);
    }

    /** The function makeGuess() runs when a flag has been clicked on.*/
    function makeGuess() {
        correct = guessArr[count].toLowerCase().slice(0, 3);
        let all = document.getElementsByClassName("hide");

        if (event.target.parentElement.classList.contains(correct)) {
            event.target.style.background = "none";
            event.target.style.pointerEvents = "none";
            score++;
            count++;
            if (count === 9) {
                nextTest();
            }
        } else {
            setTimeout(nextTest, 1000);
            for (let i = 0; i < all.length; i++) {
                all[i].style.background = ("#ff4500");
                all[i].style.opacity = ("0.5");
            }
        }
    }

    /** The function nextTest() displays the final score and the next-test button.*/
    function nextTest() {
        testDiv.innerHTML = `Your score was ${score} out of 9.`;
        nextBtn.style.pointerEvents = "auto";
        nextBtn.innerHTML = "NEXT";
        nextBtn.style.display = "block";
    }

    /** gameThree object includes the functions that will be
        available outside the module due to return.*/
    let gameThree = {
        init: function(testDiv) {
            testDiv.innerHTML = `You have 5 seconds to memorize the flags.
            Click on the right flag in the order of the list.`;
            testDiv.appendChild(readyBtn);
            readyBtn.addEventListener("click", function() {
                drawFlags();
                readyBtn.style.display = "none";
            });
        },
        getScore: function() {
            return score;
        },
        reset: function() {
            memDiv.innerHTML = "";
            readyBtn.style.display = "block";
            nextBtn.style.display = "none";
            score = 0;
            count = 0;
        }
    };

    return gameThree;
})();
