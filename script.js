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
    generatePoetry(input);
  } else {
    console.log("No result received.");
  }
}

// Function to fetch poetic content based on the last word spoken
function generatePoetry(text) {
  const lastWord = text.split(" ").pop(); // Extract the last word from the input
  const apiUrl = `https://api.datamuse.com/words?rel_rhy=${lastWord}&max=5`; // Datamuse API to find rhyming words

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        const rhymes = data.map(word => word.word).join(", ");
        document.getElementById('response').innerHTML += `<br>Poetic rhymes for '${lastWord}': ${rhymes}.`;
      } else {
        document.getElementById('response').innerHTML += `<br>No rhymes found for '${lastWord}'.`;
      }
    })
    .catch(error => {
      console.error('Error fetching poetic content:', error);
      document.getElementById('response').innerHTML += `<br>Error fetching poetic content.`;
    });
}

// Make sure the p5.js setup function is only declared once
setup();
