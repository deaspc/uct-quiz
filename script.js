// constant to store all the questions and answers
const questions = {
  question0: {
    question: "The places you would choose to live?",
    image: "asset/ticket.png",
    option0: {
      type: "string",
      content: "Deep under the sea",
      personality: "Immortaljellyfish",
    },
    option1: {
      type: "string",
      content: "Where exciting things can happen all the time",
      personality: "Vogelkop",
    },
    option2: {
      type: "string",
      content: "Anywhere on Earth",
      personality: "Axolotol",
    },
    option3: {
      type: "string",
      content: "Just as long as there's warm sunlight",
      personality: "Sunfish",
    },
  },
  question1: {
    question: "If someone were to harm you, what would you do?",
    image: "asset/ticket.png",
    option0: {
      type: "string",
      content: "Get hurt before realizing it",
      personality: "Immortaljellyfish",
    },
    option1: {
      type: "string",
      content: "Try to escape according to instinct",
      personality: "Vogelkop",
    },
    option2: {
      type: "string",
      content: "Not afraid, there's nothing that can harm me",
      personality: "Axolotol",
    },
    option3: {
      type: "string",
      content: "want to escape, but the body won't move as desired",
      personality: "Sunfish",
    },
  },
  question2: {
    question: "Are you usually good at approaching others?",
    image: "asset/cer.png",
    option0: {
      type: "string",
      content: "Approaching others when the situation leads",
      personality: "Immortaljellyfish",
    },
    option1: {
      type: "string",
      content: "People come to me all the time",
      personality: "Sunfish",
    },
    option2: {
      type: "string",
      content: "Extremely skilled",
      personality: "Vogelkop",
    },
    option3: {
      type: "string",
      content: "Able to approach others, anything is fine",
      personality: "Axolotol",
    },
  },
  question3: {
    question: "Which extraordinary powers you desire?",
    image: "asset/cer.png",
    option0: {
      type: "string",
      content: "Healing factor",
      personality: "Axolotol",
    },
    option1: {
      type: "string",
      content: "Charisma, captivating anyone who sees",
      personality: "Vogelkop",
    },
    option2: {
      type: "string",
      content: "High endurance body",
      personality: "Sunfish",
    },
    option3: {
      type: "string",
      content: "Eternal life",
      personality: "Immortaljellyfish",
    },
  },
  question4: {
    question: "Which sentence do you like the most?",
    image: "asset/cer.png",
    option0: {
      type: "string",
      content: "If it's not a big deal, everything can be fixed.",
      personality: "Immortaljellyfish",
    },
    option1: {
      type: "string",
      content: "When the time is right, I'll get started right away",
      personality: "Vogelkop",
    },
    option2: {
      type: "string",
      content: "When you can't do something, just let it go.",
      personality: "Sunfish",
    },
    option3: {
      type: "string",
      content: "No matter what happens, I can move forward",
      personality: "Axolotol",
    },
  },
};

// constant to store the description for each type of traveller
const result = {
  Immortaljellyfish: [
    "<h1>Immortal jellyfish</h1>",
    "<img src='asset/cer.png' id='imageToSave'/>",
    "Here is your result",
  ],
  Axolotol: [
    "<h1>Axolotol</h1>",
    "<img src='asset/cer.png' id='imageToSave'/>",
    "Here is your result",
  ],
  Vogelkop: [
    "<h1>Vogelkop superb bird-of-paradise</h1>",
    "<img src='asset/cer.png' id='imageToSave'/>",
    "Here is your result",
  ],
  Sunfish: [
    "<h1>Sunfish</h1>",
    "<img src='asset/cer.png' id='imageToSave'/>",
    "Here is your result",
  ],
};

// for keeping track of the score
var score = {
  Immortaljellyfish: 0,
  Axolotol: 0,
  Vogelkop: 0,
  Sunfish: 0,
};

// for keep track of the current question
var currentQn = 0;

// for setting up each of the questions
function setupQuestion() {
  // find out the current percentage of completion and updates the css
  var progress = 20 + currentQn * 20;
  var progressbar = document.getElementById("progress");
  progressbar.style.width = progress + "%";
  progressbar.innerText = currentQn + 1 + "/5";

  // get the current questions content
  var qn = questions["question" + currentQn];
  var qnText = document.getElementById("question");
  qnText.innerText = qn.question;
  var imgElement = document.getElementById("question-img");
  imgElement.src = qn.image;

  // updates each of the options for the current question
  for (var i = 0; i < 4; i++) {
    var option = document.getElementById("option" + i);
    var content = option.getElementsByClassName("content")[0];
    var qnOption = qn["option" + i];
    if (qnOption.type == "image") {
      var htmlStr = "<img src='" + qnOption.content + "'>";
      content.innerHTML = htmlStr;
    } else {
      var htmlStr = "<p>" + qnOption.content + "</p>";
      content.innerHTML = htmlStr;
    }
  }
}

// to unselect all of the options
function resetOptions() {
  var btn = document.getElementsByTagName("input");
  btn[0].checked = false;
  btn[1].checked = false;
  btn[2].checked = false;
  btn[3].checked = false;
}

// to select the option that is clicked
function select(element) {
  var btn = element.getElementsByTagName("input")[0];
  btn.checked = true;
  next();
}

// get the next questions, or display result if all questions were answered
function next() {
  // get the current select option
  var ans = $("input[name=answer]:checked").val();
  var qn = questions["question" + currentQn];
  // get the personality type for the option selected
  var personality = qn["option" + ans].personality;
  // increase the score of the personality by one
  score[personality]++;
  // increase the question count by 1
  currentQn = currentQn + 1;
  // unselect all options
  resetOptions();
  // check if quiz is completed
  if (currentQn < 5) {
    // if quiz not completed, setup the next question
    setupQuestion();
  } else {
    // else quiz is completed
    // assume that the highest score is the Immortaljellyfish personality
    // and go through each of the personality type, and update the highest score and personality
    var highestScore = score["Immortaljellyfish"];
    var highestPersonality = "Immortaljellyfish";
    if (highestScore < score["Vogelkop"]) {
      highestScore = score["Vogelkop"];
      highestPersonality = "Vogelkop";
    }
    if (highestScore < score["Axolotol"]) {
      highestScore = score["Axolotol"];
      highestPersonality = "Axolotol";
    }
    if (highestScore < score["Sunfish"]) {
      highestScore = score["Sunfish"];
      highestPersonality = "Sunfish";
    }

    // get the description of the personality and update the result page
    var personalityResult = result[highestPersonality];
    document.getElementById("personality-type").innerHTML =
      personalityResult[0];
    document.getElementById("personality-part-2").innerHTML =
      personalityResult[1];
    document.getElementById("personality-recommended").innerHTML =
      personalityResult[2];
    // set question count to 0 so that when the user wishes to retry, the quiz is on the right question count
    currentQn = 0;
    showPage(1);
  }
}

// bring the particular page into view.
// page 0: start page
// page 1: result page
// page 2: quiz
function showPage(num) {
  var pages = document.getElementsByClassName("container");
  pages[0].style.display = "none";
  pages[1].style.display = "none";
  pages[2].style.display = "none";
  pages[num].style.display = "block";
}

function saveImage() {
  // var imgElement = document.getElementById("imageToSave");
  // var imgSrc = imgElement.src;

  // var link = document.createElement("a");
  // link.href = imgSrc;
  // link.download = "image.jpg"; // Set the desired file name here
  // link.click();

  var imgElement = document.getElementById("imageToSave");
  var imgSrc = imgElement.src;

  var xhr = new XMLHttpRequest();
  xhr.open("GET", imgSrc, true);
  xhr.responseType = "blob";
  xhr.onload = function () {
    var urlCreator = window.URL || window.webkitURL;
    var imageUrl = urlCreator.createObjectURL(this.response);

    var link = document.createElement("a");
    link.href = imageUrl;
    link.download = "image.jpg"; // Set the desired file name here
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  xhr.send();
}
