//the list of quiz data that contains various information  for the schema refer data.json
var data;
var currentQuestion = 0;
var attended = 1;
const maxQuestions = 1;
var correctAns = 0;
const idlecolor = "lightblue",
    rightColor = "lightgreen",
    wrongColor = "#d71b3b";

//onload event will call after the initialisation of HTML elements
window.onload = async function () {

    // this is a asynchronous function that gets data through HTTP.Get() and will return a promise
    const response = await fetch('./data.json');
    //from the promise we extract the required json file 
    const jsonData = await response.json();
    //from the extracted json file we will create a object hierarchy
    data = jsonData.data;
    //selectRandom question
    currentQuestion = (Math.floor(Math.random() * data.length)) % data.length;
    showScore();
    //now we will load the first question
    loadQuestion(currentQuestion);
    document.getElementById('nextbtn').style.display="none";
}



//this function handles the loading new question
function loadQuestion(i) {
    //get the question container and assign the question content to it
    document.getElementById('question').innerHTML = '<p>' + data[i].question + '</p>';
    // Call the function to update labels
    updateLabels(data[i].option1, data[i].option2, data[i].option3, data[i].option4);
    //get the button that Checks the answer
    var submit = document.getElementById('formsubmit');
    //bind the onSubmit() method to onclick event
    submit.onclick = onSubmit;
    //change the text to CheckAnswer
    submit.value = "Check Answer";
}


//this function handles loading new question
function loadNext() {

    //increment attended questions by one
    attended = attended + 1;
    showScore();
    //move to next question
    //select random question
    currentQuestion = (currentQuestion + 1 + Math.floor(Math.random() * 2)) % data.length;
    //loads the current question
    loadQuestion(currentQuestion);
    //removes the description provided by last quiz if any
    document.getElementById("description").replaceChildren();
    document.getElementById('nextbtn').style.display = 'none';


}

function showButton()
{
    document.getElementById('nextbtn').style.display="block";
}

//this is a wrapper function that binds to onclick event of the button 
function onSubmit() {
    //show the right answer to the user 
    revealAns(document.forms["main"]["option"].value, data[currentQuestion].answer);
}



// Function to change label text
function updateLabels(option1, option2, option3, option4) {

    //get the all the containers that wraps Options
    var items = document.getElementsByClassName("choice");

    //reset their bg color to default
    for (const element of items) {
        element.style = null;
    }
    //enable button to recieve input 
    for (let i = 1; i < 5; i++) {
        const element = document.getElementById("option" + i);
        element.disabled = false;
        element.checked = false;
    }
    //get each label and assign related values for options
    var d1 = document.getElementById('label' + 1);
    d1.textContent = option1;

    var d2 = document.getElementById('label' + 2)
    d2.textContent = option2;

    var d3 = document.getElementById('label' + 3)
    d3.textContent = option3;

    var d4 = document.getElementById('label' + 4)
    d4.textContent = option4;
}

function showScore() {    //set score 
    document.getElementById("scoretext").textContent = "Your score = " + correctAns + "/" + attended;
    document.getElementById("totaltext").textContent = attended + "/" + maxQuestions;

}

//this funtion is responsible for revealing the right answer to the user and giving the description about the topic 
function revealAns(choosenAnswer, rightAnswer) {

    //get the indexes of the choosenAnswer and rightAnswer
    const a = getIndex(choosenAnswer);
    const r = getIndex(rightAnswer);
    //get all the containers of Options
    const items = document.getElementsByClassName("choice");

    //disable button to recieve input 
    for (let i = 1; i < 5; i++) {
        const element = document.getElementById("option" + i);
        element.disabled = true;
    }

    //change color according to the option choosed
    if (a !== r) {
        items[a].style.backgroundColor = wrongColor;
    }
    if (a == r)
        correctAns++;
    items[r].style.backgroundColor = rightColor;

    showScore()
    //create a paragraph element and assign description as textContent
    var doc = document.getElementById("description");
    var txt = document.createElement('p');
    txt.id = "description";
    txt.style = "font-size: 20px;"
    txt.textContent = data[currentQuestion].description;
    //delete any children if exists (created during last reveal)
    doc.replaceChildren();
    doc.append(txt);


    if (attended >= maxQuestions) {
        //get the submit button and change its onclick buttton to show next question and also change its label
        var submit = document.getElementById('formsubmit');
        submit.onclick = revealScore;
        submit.value = "Check your score";
    }
    else {
        //get the submit button and change its onclick buttton to show next question and also change its label
        var submit = document.getElementById('formsubmit');
        submit.onclick = loadNext;
        submit.value = "Load Next question";
    }

}
function revealScore() {
    var scoreHTML =
        "<div id='datacontainer'><p>Your Score = " + correctAns + " / " + attended +
        "</p>" +
        "<div id='main'>" +
        "</div><div style='margin:0 auto;width: 50%;'>" +
        "<a id='formsubmit' href='./index.html'>Play Again</a>" +
        "</div></div>";
    var d = document.getElementById("formcontainer");
    d.replaceChildren();
    d.innerHTML = scoreHTML;
    // document.getElementById('formsubmit').onclick = () => {
    //     currentQuestion = 0;
    //     correctAns = 0;
    //     attended = 1;
    //     document.open("./index.html")
    // };

}

//this funtion is a utility funtion to retrieve indexes associated with the options
function getIndex(ans) {
    switch (ans) {
        case "option1":
            return r = 0;
        case "option2":
            return r = 1;
        case "option3":
            return r = 2;
        case "option4":
            return r = 3;
        default:
            return 0;
    }
}