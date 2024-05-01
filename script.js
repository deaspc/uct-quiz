// constant to store all the questions and answers
const questions = {
  question0: {
    question: "Which of these images appeal to you?",
    image: "asset/ticket.png",
    option0: {
      type: "string",
      content: "Bungee Jumping in New Zealand",
      personality: "Adventurous",
    },
    option1: {
      type: "string",
      content: "Seeing the Louvre",
      personality: "Intellectual",
    },
    option2: {
      type: "string",
      content: "Tasting your way through Italy",
      personality: "Immersed",
    },
    option3: {
      type: "string",
      content: "Being serenaded whilst sitting in a gondola",
      personality: "Dreamy",
    },
  },
  question1: {
    question: "Pick 1 item for your bucket list",
    image: "asset/ticket.png",
    option0: {
      type: "string",
      content: "Bungee Jumping in New Zealand",
      personality: "Adventurous",
    },
    option1: {
      type: "string",
      content: "Seeing the Louvre",
      personality: "Intellectual",
    },
    option2: {
      type: "string",
      content: "Tasting your way through Italy",
      personality: "Immersed",
    },
    option3: {
      type: "string",
      content: "Being serenaded whilst sitting in a gondola",
      personality: "Dreamy",
    },
  },
  question2: {
    question: "What do you never leave your house without?",
    image: "asset/cer.png",
    option0: {
      type: "string",
      content: "Sneakers",
      personality: "Adventurous",
    },
    option1: {
      type: "string",
      content: "Earphones and a charger",
      personality: "Dreamy",
    },
    option2: {
      type: "string",
      content: "A book",
      personality: "Intellectual",
    },
    option3: {
      type: "string",
      content: "A camera",
      personality: "Immersed",
    },
  },
  question3: {
    question:
      "You've arrived at your destination. What's the first thing you do?",
    image: "asset/cer.png",
    option0: {
      type: "string",
      content:
        "Take public transportation into the city. It's the cheapest city tour possible!",
      personality: "Immersed",
    },
    option1: {
      type: "string",
      content:
        "Stop by the oldest bookstore in the city on the way to the hotel.",
      personality: "Intellectual",
    },
    option2: {
      type: "string",
      content: "Head for the hotel spa and then enjoy the view from my room",
      personality: "Dreamy",
    },
    option3: {
      type: "string",
      content:
        "Dump my bags and find some physical activity that will get my adrenaline pumping. Best way to shake off the jet lag.",
      personality: "Adventurous",
    },
  },
  question4: {
    question:
      "If you were to go on a first date, which activity would be your top pick?",
    image: "asset/cer.png",
    option0: {
      type: "string",
      content: "Checking out an escape room",
      personality: "Adventurous",
    },
    option1: {
      type: "string",
      content: "Going to the museum",
      personality: "Intellectual",
    },
    option2: {
      type: "string",
      content: "Taking a walk through central park",
      personality: "Dreamy",
    },
    option3: {
      type: "string",
      content: "Hitting the flea market",
      personality: "Immersed",
    },
  },
};

// constant to store the description for each type of traveller
const result = {
  Adventurous: [
    "<h1>Test</h1>",
    "<img src='asset/cer.png' id='imageToSave'/>",
    "Here is your result",
  ],
  Immersed: [
    "<h1>Test2</h1>",
    "<img src='asset/cer.png' id='imageToSave'/>",
    "Here is your result",
  ],
  Intellectual: [
    "<h1>Test3</h1>",
    "<img src='asset/cer.png' id='imageToSave'/>",
    "Here is your result",
  ],
  Dreamy: [
    "<h1>Test4</h1>",
    "<img src='asset/cer.png' id='imageToSave'/>",
    "Here is your result",
  ],
};

// for keeping track of the score
var score = {
  Adventurous: 0,
  Immersed: 0,
  Intellectual: 0,
  Dreamy: 0,
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
    // assume that the highest score is the adventurous personality
    // and go through each of the personality type, and update the highest score and personality
    var highestScore = score["Adventurous"];
    var highestPersonality = "Adventurous";
    if (highestScore < score["Intellectual"]) {
      highestScore = score["Intellectual"];
      highestPersonality = "Intellectual";
    }
    if (highestScore < score["Immersed"]) {
      highestScore = score["Immersed"];
      highestPersonality = "Immersed";
    }
    if (highestScore < score["Dreamy"]) {
      highestScore = score["Dreamy"];
      highestPersonality = "Dreamy";
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
