window.part1 = (function () {
    "use strict";

    let nextBtn = document.getElementById("next"),
        score = 0,
        count = 0,
        number = ["one", "two", "three", "four", "five"],
        correct = "",
        quizDiv = document.createElement("div"),
        ask = document.createElement("div"),
        optionOne = document.createElement("div"),
        optionTwo = document.createElement("div"),
        optionThree = document.createElement("div"),
        options = [optionOne, optionTwo, optionThree];

    quizDiv.className = "quiz";

    /** Adding click-events to the questions options.*/
    for (let i = 0; i < options.length; i++) {
        options[i].addEventListener("click", makeGuess);
    }

    /** Creating the object for the quiz.*/
    let question = {
        current: "",
        init: function(para) {
            this.current = para;
        },
        display: function() {
            if (this.current === "one") {
                ask.innerHTML = "Vad heter pandan som stod som modell för WWFs logga?";
                optionOne.innerHTML = "Ming Li";
                optionTwo.innerHTML = "Fo mu";
                optionThree.innerHTML = "Chi Chi";
                correct = "Chi Chi";
            } else if (this.current === "two") {
                ask.innerHTML = "Vilken bok om emigrationen" +
                    "till Amerika har Ernst Skarstedt givit ut?";
                optionOne.innerHTML = "Brev från kolonien";
                optionTwo.innerHTML = "Vagabond och redaktör";
                optionThree.innerHTML = "Nybyggarna";
                correct = "Vagabond och redaktör";
            } else if (this.current === "three") {
                ask.innerHTML = "I vilket land ligger delstaten New South Wales?";
                optionOne.innerHTML = "Kanada";
                optionTwo.innerHTML = "Storbritannien";
                optionThree.innerHTML = "Australien";
                correct = "Australien";
            } else if (this.current === "four") {
                ask.innerHTML = "Vad är ”Gräshålet” beläget i Lappland får någonting?";
                optionOne.innerHTML = "En sjö";
                optionTwo.innerHTML = "En golfbana";
                optionThree.innerHTML = "Ett slukhål";
                correct = "En sjö";
            } else if (this.current === "five") {
                ask.innerHTML = "Vem skrev låten ”The Entertainer”?";
                optionOne.innerHTML = "Scott Joplin";
                optionTwo.innerHTML = "Janis Joplin";
                optionThree.innerHTML = "Frank Nopper";
                correct = "Scott Joplin";
            }
        }
    };

    /** The function makeGuess() runs when an option has been clicked on.*/
    function makeGuess() {
        if (event.target.innerHTML === correct) {
            score += 3;
        }

        setTimeout(nextQuestion, 1000);
        for (let i = 0; i < options.length; i++) {
            options[i].style.pointerEvents = "none";
            if (options[i].innerHTML === correct) {
                options[i].style.outline = "3px solid #00b200";
            } else {
                options[i].style.outline = "3px solid #ff4500";
            }
        }

        /** The function nextQuestion() runs the question-objects
            init function with the argument for the next question.
            If the quiz is over the final score is on display with the next-test button.*/
        function nextQuestion() {
            if (count < 4) {
                count++;
                question.init(number[count]);
                question.display();
                for (let i = 0; i < options.length; i++) {
                    options[i].style.pointerEvents = "auto";
                    options[i].style.outline = "none";
                }
            } else {
                for (let i = 0; i < options.length; i++) {
                    options[i].style.pointerEvents = "auto";
                    options[i].style.outline = "none";
                }
                quizDiv.innerHTML = `Your score was ${score} out of 15.`;
                nextBtn.style.pointerEvents = "auto";
                nextBtn.innerHTML = "NEXT";
                nextBtn.style.display = "block";
            }
        }
    }

    /** gameOne object includes the functions that will
        be available outside the module due to return.*/
    let gameOne = {
        init: function(testDiv) {
            question.init("one");
            testDiv.appendChild(quizDiv);
            quizDiv.appendChild(ask);
            quizDiv.appendChild(optionOne);
            quizDiv.appendChild(optionTwo);
            quizDiv.appendChild(optionThree);
            question.display();
        },

        getScore: function() {
            return score;
        },

        reset: function() {
            quizDiv.innerHTML = "";
            nextBtn.style.display = "none";
            score = 0;
            count = 0;
        }
    };

    return gameOne;
})();
