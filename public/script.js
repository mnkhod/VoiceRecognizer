var grammar =
  "#JSGF V1.0; grammar colors; public <color> = aqua | azure | beige | bisque | black | blue | brown | chocolate | coral | crimson | cyan | fuchsia | ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki | lavender | lime | linen | magenta | maroon | moccasin | navy | olive | orange | orchid | peru | pink | plum | purple | red | salmon | sienna | silver | snow | tan | teal | thistle | tomato | turquoise | violet | white | yellow ;";

var box = [];

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent =
  SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var colors = [
  "aqua",
  "azure",
  "beige",
  "bisque",
  "black",
  "blue",
  "brown",
  "chocolate",
  "coral",
  "crimson",
  "cyan",
  "fuchsia",
  "ghostwhite",
  "gold",
  "goldenrod",
  "gray",
  "green",
  "indigo",
  "ivory",
  "khaki",
  "lavender",
  "lime",
  "linen",
  "magenta",
  "maroon",
  "moccasin",
  "navy",
  "olive",
  "orange",
  "orchid",
  "pink",
  "plum",
  "purple",
  "red",
  "silver",
  "snow",
  "tomato",
  "white",
  "yellow",
];

var ungu = {
  "улаан": "red",
  "шар": "yellow",
  "улбар шар": "orange",
  "ягаан": "pink",
  "ногоон": "green",
  "цахирмаа": "orchid",
  "лемон": "lime",
  "саарал": "gray",
  "усан ц*****":"cyan",
  "ц*****": "blue"
};
var ungu1 = [
	"улаан",
	"шар",
	"улбар шар",
	"ягаан",
	"ногоон",
	"цахирмаа",
	"лемон",
	"саарал",
	"усан цэнхэр",
	"цэнхэр"
]

for (let x in ungu) {
  box.push(x);
}

var grammar =
  "#JSGF V1.0; grammar colors; public <color> = " + box.join(" | ") + " ;";

var recognition = new SpeechRecognition() || webkitSpeechRecognition;
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = "mn";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector(".output");
var bg = document.querySelector("html");
var hints = document.querySelector(".hints");

var colorHTML = `Таны Хэлж Болох Өнгөнүүд : `;
ungu1.forEach(function (v, i, a) {
  colorHTML += ` [${v}] `;
});

$("#colors").text(colorHTML);

window.setInterval(function () {
  recognition.start();
}, 100);

recognition.onresult = function (event) {
  // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
  // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
  // It has a getter so it can be accessed like an array
  // The first [0] returns the SpeechRecognitionResult at the last position.
  // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
  // These also have getters so they can be accessed like arrays.
  // The second [0] returns the SpeechRecognitionAlternative at position 0.
  // We then return the transcript property of the SpeechRecognitionAlternative object
  var color = event.results[0][0].transcript;

  $("body").attr("style", `background-color:${colorChange(color)}`);
  $("nav").attr("style", `background-color:${colorChange(color)} !important`);
  $("header").attr(
    "style",
    `background-color:${colorChange(color)} !important`
  );
  $("footer").attr(
    "style",
    `background-color:${colorChange(color)} !important`
  );
  $("button").attr(
    "style",
    `background-color:${colorChange(color)} !important`
  );
  $("#content").text(color);

  bg.style.backgroundColor = colorChange(color);
  console.log("Confidence: " + event.results[0][0].confidence);
};

function colorChange(main) {
  for (let i in ungu) {
    if (i === main) {
      return ungu[i];
    }
  }

  return 0;
}

recognition.onspeechend = function () {
  recognition.stop();
};

recognition.onnomatch = function (event) {
  diagnostic.textContent = "I didn't recognise that color.";
};

recognition.onerror = function (event) {
  diagnostic.textContent = "Error occurred in recognition: " + event.error;
};
