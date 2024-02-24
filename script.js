const questions = [
    {
        question: "What does HTML stand for?",
        answers: [ 
            {text: "Hyperlink and Text Markup Language", correct: true},
            {text: "Hyper Text Markup Language", correct: false},
            {text: "High-Level Text Management Language", correct: false},
            {text: "Hyper Transfer Markup Language", correct: false},   
        ]
    },         
    {
        question: " Which keyword is used to declare variables in JavaScript?",
        answers: [ 
            {text: "var", correct: false},
            {text: "let", correct: false},
            {text: "const", correct: false},
            {text: "all of the above", correct: true},
             
        ]
    },
    {
        question: " What is the purpose of media queries in CSS for responsive design?",
        answers: [ 
            {text: "To apply animations to elements", correct: false},
            {text: "To detect the user's location", correct: false},
            {text: "To define styles based on device characteristics", correct: true},
            {text: "To create pop-up messages", correct: false},  
        ]
    },
    {
        question: "What is the primary purpose of version control systems like Git?",
        answers: [ 
            {text: "Java", correct: false},
            {text: "Node Js", correct: true},
            {text: "Python", correct: false},
            {text: "Ruby", correct: false},
        ]
    },
    {
        question: " Which of the following is a server-side JavaScript runtime?",
        answers: [ 
            {text: "Managing project dependencies", correct: false},
            {text: "Tracking changes in code over time", correct: true},
            {text: "Formatting code for consistency", correct: false},
            {text: "Creating visual designs for websites", correct: false},
        ]
    },
    {
        question: "Which protocol is commonly used to secure data transmitted over the web?",
        answers: [ 
            {text: "FTP", correct: false},
            {text: "HTTP", correct: false},
            {text: "TCP", correct: false},
            {text: "HTTPS", correct: true},
        ]
    },
    {
        question: "What does API stand for in web development?",
        answers: [ 
            {text: "Application Programming Interface", correct: true},
            {text: "Advanced Programming Interface", correct: false},
            {text: "Automated Programming Interface", correct: false},
            {text: "Associated Programming Interaction", correct: false},
        ]
    },
    {
        question: "Which popular code editor is developed by Microsoft?",
        answers: [ 
            {text: "Atom", correct: false},
            {text: "Sublime Text", correct: false},
            {text: "Visual Studio Code", correct: true},
            {text: "Eclipse", correct: false},
        ]
    },   
    {
        question: "What is a common technique for reducing image file sizes and improving web performance?",
        answers: [ 
            {text: "Image Cropping", correct: false},
            {text: "Lazy Loading", correct: true},
            {text: "Image Rotation", correct: false},
            {text: "Image Enlargement", correct: false},
        ]
    },   
    {
        question: "What is the key difference between a framework and a library in web development?",
        answers: [ 
            {text: "A framework provides specific functionality, while a library provides a set of tools", correct: false},
            {text: "Frameworks are only used in back-end development", correct: false},
            {text: " Libraries are only used in front-end development", correct: false},
            {text: "A library provides specific functionality, while a framework provides a set of tools", correct: true},
        ]
    },   
]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1 ;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;


    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });  
}
 
function resetState(){
    // nextButton.style.display = "none";
    while( answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
    function selectAnswer(e){
        const selectedBtn = e.target;
        const isCorrect = selectedBtn.dataset.correct === "true";
        if (isCorrect) {
            selectedBtn.classList.add("correct");
            score++;
        }else {
            selectedBtn.classList.add("incorrect");
        }
        Array.from(answerButtons.children).forEach(button => {
            if (button.dataset.correct === "true") {
                button.classList.add("correct");
            }
            button.disabled = true;
        });
        nextButton.style.display = "block";   
    }

    function calculatePercentage() {
        return (score / questions.length) * 100;
    }
    
    function calculateGrade(percentage) {
        if (percentage >= 90) {
            return 'A';
        } else if (percentage >= 80) {
            return 'B';
        } else if (percentage >= 70) {
            return 'C';
        } else if (percentage >= 60) {
            return 'D';
        } else {
            return 'F';
        }
    }
    
    function calculateRemarks(percentage) {
        if (percentage >= 70) {
            return 'Congratulations! You did well.';
        } else {
            return 'Keep practicing to improve your score.';
        }
    }
    
    function showScore() {
        resetState();
        const percentage = calculatePercentage();
        const grade = calculateGrade(percentage);
        const remarks = calculateRemarks(percentage);
    
        questionElement.innerHTML = `You scored ${score} out of ${questions.length}!<br>
            Percentage: ${percentage.toFixed(2)}%<br>
            Grade: ${grade}<br>
            Remarks: ${remarks}`;
    
        nextButton.innerHTML = "Play Again";
        nextButton.style.display = "block";
    }

// function showScore() {
//     resetState();
//     questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
//     nextButton.innerHTML = "Play Again";
//     nextButton.style.display = "block";
// }

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex< questions.length) {
        showQuestion();
    } else {
        showScore();
    } 
}
nextButton.addEventListener("click", ()=>{
    if (currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();
