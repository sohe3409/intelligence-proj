window.Test = (function () {
    let nextBtn = document.getElementById("next"),
        testDiv = document.getElementById("test"),
        allGames = [window.part1, window.part2, window.part3, window.part4, window.part5],
        counter = -1,
        totalScore = 0;

    nextBtn.addEventListener("click", function() {
        testDiv.innerHTML = "";
        nextBtn.style.display = "none";
        event.target.style.pointerEvents = "none";
        counter += 1;
        if (counter < 5) {
            allGames[counter].init(testDiv);
        } else {
            for ( let i = 0; i < allGames.length; i++) {
                totalScore += allGames[i].getScore();
            }
            testDiv.innerHTML = `Your final score is ${totalScore} out of 42.`;
        }
    });

    return {
        reset: function() {
            allGames[counter].reset();
            console.log("reset");
            allGames[counter].init(testDiv);
        }
    };
})();
