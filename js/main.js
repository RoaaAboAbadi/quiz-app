import { qustions } from "./qustions.js";
const btn = document.getElementById("btn");
const container = document.getElementById("container");
const con = document.getElementById("con");
const theQuestion = document.getElementById("the-question");
let numberOfQuestion = document.getElementById("number-of-question");
const options = document.querySelectorAll(".options > button");
const next = document.getElementById("next");
const scorePage = document.getElementById("score-page");
const contentScore = document.getElementById("content-score");
let currentIndex = 0;
let score = 0;
let currentQuestion = qustions[currentIndex];
let currentAnswer = null;


btn.addEventListener("click", (e) => {
    container.style.display = "none"
    con.style.display = "flex"
})


const changeQuestion = () => {
    // Make sure there is a answer for the current Question
    if (currentAnswer === null) {
        return;
    }

    // handling the score
    if (currentQuestion.answer == currentAnswer) {
        score++
        console.log(currentAnswer, "currentAnswer")
    }
    console.log(score, "score");

    // displaying the next Question in the UI
    currentIndex++;
    currentQuestion = qustions[currentIndex];

    if (currentIndex <= qustions.length - 1) {
        // there is more Questions
        theQuestion.innerHTML = currentQuestion.qustion;

        let index = 0;
        currentQuestion.options.forEach((option) => {
            options[index].innerHTML = option
            index++;
        })
        numberOfQuestion.textContent++
    } else {
        // the Questions are ended 
        scorePage.style.display = "flex"
        showScorePage();
    }
}

const clearOptionsSelection = () => {
    options.forEach((option) => {
        option.classList.remove("colored")
    })
}

options.forEach((option) => {
    option.addEventListener("click", (event) => {
        clearOptionsSelection()

        option.classList.add("colored")
        clicked(event)
    })
})

const clicked = (e) => {
    let clickedOption = e.target.textContent;
    console.log(currentQuestion.answer, "currentQuestion.answer")

    currentAnswer = clickedOption;
    console.log(currentAnswer, "currentAnswer")

}

const showScorePage = () => {
    con.style.display = "none"
    let imgScoreElement = document.createElement("img");
    imgScoreElement.classList.add("imageScore");
    contentScore.appendChild(imgScoreElement);

    let textScoreElement = document.createElement("div");
    textScoreElement.classList.add("textScore");
    contentScore.appendChild(textScoreElement);

    let finalScoreElement = document.createElement("span")
    console.log(finalScoreElement, "finalScoreElement");
    finalScoreElement.classList.add("finalScore");
    contentScore.appendChild(finalScoreElement)

    localStorage.setItem("score", score);


    if (score >= 6) {
        imgScoreElement.src = "./images/medal.png"
        textScoreElement.textContent = "Congrats! You've scored a high goal! Your Score Is"
        finalScoreElement.textContent = score;
    }
    else if (score < 6 && score > 3) {
        imgScoreElement.src = "./images/positive-vote.png"
        textScoreElement.textContent = "Well Done!Your Score Is"
        finalScoreElement.textContent = score;

    }
    else {
        imgScoreElement.src = "./images/sad-face.png"
        textScoreElement.textContent = "Your Level Is Not Good! Your Score Is"
        finalScoreElement.textContent = score;
    }

}


next.addEventListener("click", () => {
    changeQuestion()

    // rest the user answer
    currentAnswer = null
    clearOptionsSelection()
})


window.onload = () => {
    const savedScore = localStorage.getItem("score")
    console.log(savedScore);
}
