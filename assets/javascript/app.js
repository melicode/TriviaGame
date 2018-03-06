$("#startGame").on("click", function(event) {
    $("#startGame").hide();
    clock();
    generateHTML();

});

$("body").on("click", ".answer", function(event) {
    event.preventDefault();
    selectedAnswer = $(this).text();
    if (selectedAnswer === correctArray[counter]) {
        clearInterval(time);
        correctAnswer();
    } else {
        clearInterval(time);
        wrongAnswer();
    }
});


function clock() {
    time = setInterval(thirty, 1000);

    function thirty() {
        if (timerCounter === 0) {
            clearInterval(time);
            questionTimeout();
        }
        if (timerCounter > 0) {
            timerCounter--;
        }
        $(".timer").html(timerCounter);
    }
}

function generateHTML() {
    gameHTML = "<h2 class='text-center timer-p'>Time Remaining: <span class='timer'>" +
        timerCounter + "</span></h2><h3 class='text-center'>" + questionsArray[counter] +
        "</h3><h3 class='answer'>A. " + answersArray[counter][0] +
        "</h3><h3 class='answer'>B. " + answersArray[counter][1] + "</h3><h3 class='answer'>C. " +
        answersArray[counter][2] + "</h3><h3 class='answer'>D. " + answersArray[counter][3] + "</h3>";
    $(".gameDiv").html(gameHTML);
};

function correctAnswer() {
    correctNum++;
    gameHTML = "<h3 class='text-center'>Correct! The answer is: " +
        correctArray[counter] + "</h3>";
    $(".gameDiv").html(gameHTML);
     setTimeout(wait, 2000);
}

function wrongAnswer() {
    incorrectNum++;
    gameHTML = "<h3 class='text-center'>Incorrect! The answer is: " +
        correctArray[counter] + "</h3>";
    $(".gameDiv").html(gameHTML);
    setTimeout(wait, 2000);
}

function questionTimeout() {
    notAnsweredNum++;
    gameHTML = "<h2 class='text-center timer-p'>Time Remaining: <span class='timer'>" +
        timerCounter + "</span></h2><h3 class='text-center'>out of time</h3>" +
        "<h3>The correct answer is: " + correctArray[counter] + "</h3>";
    $(".gameDiv").html(gameHTML);
    setTimeout(wait, 2000);
}

function end() {
    gameHTML = "<h3 class='text-center'>All done, here's how you did!</h3>" +
        "<h3 class='summary-correct'>Correct Answers: " + correctNum +
        "</h3><h3>Wrong Answers: " + incorrectNum + "</h3><h3>Unanswered: " +
        notAnsweredNum + "</h3>";
    $(".gameDiv").html(gameHTML);
}

function wait() {
    if (counter < 1) {
        counter++;
        generateHTML();
        timerCounter = 31;
        clock();
    } else {
        end();
    }
}

function resetGame() {
    generateHTML();
    clock();
}

var questionsArray = [
    "What is the name of the main character in the Witcher?",
    "What character is bald, wears a red tie and is an assasin."
];
var answersArray = [
    ["Scorpion", "Severus Snape", "Geralt", "Kratos"],
    ["Agent 47", "Agent 007", "Nathan Drake", "Mileena"]
];
var correctArray = [
    "C. Geralt",
    "A. Agent 47"
];

var correctNum = 0;
var incorrectNum = 0;
var notAnsweredNum = 0;
var counter = 0;
var time = 0;
var timerCounter = 30;