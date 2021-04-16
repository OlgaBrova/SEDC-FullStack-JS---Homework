const API_URL = 'http://localhost:3000';

const getQuizBtn = document.querySelector("#getQuizBtn");
const form = document.querySelector("#questionsForm");
const result = document.querySelector(".result");
const quizContainer = document.getElementById("quizContainer");
const submitBtn = document.getElementById("submitBtn");

getQuizBtn.addEventListener('click', () => {
    
    getQuestions();
    quizContainer.classList.remove('d-none');
});

const getQuestions = () => {
    fetch(`${API_URL}/moana`)
        .then((response) => response.json())
        .then((result) => {
            
            renderQuestions(result);
        })
}


const renderQuestions = (questions) => {
    let inner = '';
    
    questions.forEach(question => {
        inner += `
        <div class="my-5">
            <p class="lead font-weight-normal text-light">${question.question}</p>
            <div class="form-check my-2 text-light">
                <input type="radio" class="radio" name="q${question.id}" value="A">
                <label class="form-check-label">${question.answer1}</label>
            </div>
            <div class="form-check my-2 text-light">
                <input type="radio" class="radio" name="q${question.id}" value="B">
                <label class="form-check-label">${question.answer2}</label>
            </div>
            <div class="form-check my-2 text-light">
                <input type="radio" class="radio" name="q${question.id}" value="C">
                <label class="form-check-label">${question.answer3}</label>
            </div>
            <div class="form-check my-2 text-light">
                <input type="radio" class="radio" name="q${question.id}" value="D">
                <label class="form-check-label">${question.answer4}</label>
            </div>
        </div>
        `;
    });
    
    inner += `<div class="text-center">
                <input type="submit" class="btn btn-light" id="submitBtn">
            </div>`;
    form.innerHTML += inner;
}

const addAnswerToDb = (newAnswer) => {
    fetch(`${API_URL}/moana`, {
        method: 'POST',
        headers: {
            "Content-Type": "text/plain"
        },
        body: JSON.stringify(newAnswer)
    })
    .then((response) => response.json())
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    })  
}

const addToJson = (answers) => {
    let newAnswer = {
        answers
    };
   
    return addAnswerToDb(newAnswer);
}



let correctAnswers = ['A', 'D', 'C', 'A', 'C', 'B', 'C', 'B', 'A', 'C'];

form.addEventListener('submit', e => {
    e.preventDefault();

    let score = 0;
    let userAnswers = [form.q1.value, form.q2.value, form.q3.value, form.q4.value, form.q5.value, form.q6.value, form.q7.value, form.q8.value, form.q9.value, form.q10.value];
    
    addToJson(userAnswers); 

    userAnswers.forEach((answer, i) => {

        if (answer === correctAnswers[i]) {
            score += 10;
        }
    });

    window.scrollTo(0, 0);
    result.classList.remove('d-none');

    let output = 0;
    let timer = setInterval(() => {

        result.querySelector('span').textContent = `${output}%`;
        output++;
        
        if (output === score) {
            clearInterval(timer);
        }else {
            output++;
        }

    }, 10);

});




    