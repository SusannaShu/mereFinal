// Initialize speech recognition and speech synthesis objects
let speechRec;
let speech;
let listening = false;

function setup() {
  noCanvas(); // No canvas needed

  // Create a new speech recognition object
  speechRec = new p5.SpeechRec('en-US', gotSpeech);
  speechRec.continuous = true; // Allow continuous recognition
  speechRec.interimResults = false; // Only final results are considered

  // Create a new speech synthesis object
  speech = new p5.Speech();

  // Setup the buttons and response area from the DOM
  let startButton = document.getElementById('startButton');
  let stopButton = document.getElementById('stopButton');
  let response = document.getElementById('response');

  // Attach event listeners to buttons
  startButton.addEventListener('click', function() {
    if (!listening) {
      console.log("Starting speech recognition...");
      speechRec.start();  // Start listening
      response.innerHTML = "Listening...";
      listening = true;
    }
  });

  stopButton.addEventListener('click', function() {
    if (listening) {
      console.log("Stopping speech recognition...");
      speechRec.stop(); // Stop listening
      response.innerHTML = "Stopped listening. Press 'Start Listening' to interact again.";
      listening = false;
    }
  });
}

// Function to handle speech received
function gotSpeech() {
  if (speechRec.resultValue) {
    let input = speechRec.resultString;
    document.getElementById('response').innerHTML = "Robot heard: " + input; // Display what the robot heard
  } else {
    console.log("No result received.");
  }
}

// Make sure the p5.js setup function is only declared once
setup();
