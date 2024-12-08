const questions = [
    {
        question: "When we add 2 and 2, the answer will be:",
        answers: [
            { text: "5", correct: false },
            { text: "4", correct: true },
            { text: "7", correct: false },
            { text: "2", correct: false }
        ]
    },
    {
        question: "When we add 2 and 3, the answer will be:",
        answers: [
            { text: "5", correct: true },
            { text: "4", correct: false },
            { text: "7", correct: false },
            { text: "2", correct: false }
        ]
    },
    {
        question: "When we add 2 and 5, the answer will be:",
        answers: [
            { text: "5", correct: false },
            { text: "4", correct: false },
            { text: "7", correct: true },
            { text: "2", correct: false }
        ]
    },
    {
        question: "When we add 2 and (-2), the answer will be:",
        answers: [
            { text: "5", correct: false },
            { text: "0", correct: true },
            { text: "7", correct: false },
            { text: "2", correct: false }
        ]
    }
];

const questionElement = document.getElementById("heading2");
const answerButton = document.querySelector(".answer-button");
const nextButton = document.getElementById("next-btn")
// console.log(answerButton);

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo+". "+currentQuestion.question;
    
    currentQuestion.answers.forEach(answer =>{
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);

    if(answer.correct){
        button.dataset.correct = answer.correct;
    }
    button.addEventListener("click",selectAnswer);
});
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct ==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button =>{
        if (button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
    }

    function showScore(){
        resetState();
            questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
            nextButton.innerHTML = "Play Again";
            nextButton.style.display = "block";
        }
    
    function handleNextButton(){
        currentQuestionIndex++;
        if(currentQuestionIndex < questions.length){
            showQuestion();

        }
        else{
            showScore();
        }
    }

    nextButton.addEventListener("click",()=>{
       if(currentQuestionIndex < questions.length){
        handleNextButton();
       } 
       else{
        startQuiz();
       }
    })
startQuiz();

