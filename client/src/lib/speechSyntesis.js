var synth = window.speechSynthesis;

// var inputForm = document.querySelector('form');
// var inputTxt = document.querySelector('.txt');
// var voiceSelect = document.querySelector("select");

// var pitch = document.querySelector('#pitch');
// var pitchValue = document.querySelector('.pitch-value');
// var rate = document.querySelector('#rate');
// var rateValue = document.querySelector('.rate-value');

var defaultPitchValue = 1;
var defaultRateValue = 1;

var voices = [];

function populateVoiceList() {
  voices = synth.getVoices().sort(function(a, b) {
    const aname = a.name.toUpperCase(),
      bname = b.name.toUpperCase();
    if (aname < bname) return -1;
    else if (aname === bname) return 0;
    else return +1;
  });
}
//   var selectedIndex =
//     voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
//   voiceSelect.innerHTML = "";
//   for (let i = 0; i < voices.length; i++) {
//     var option = document.createElement("option");
//     option.textContent = voices[i].name + " (" + voices[i].lang + ")";

//     if (voices[i].default) {
//       option.textContent += " -- DEFAULT";
//     }

//     option.setAttribute("data-lang", voices[i].lang);
//     option.setAttribute("data-name", voices[i].name);
//     voiceSelect.appendChild(option);
//   }
//   voiceSelect.selectedIndex = selectedIndex;
// }

populateVoiceList();

// if (speechSynthesis.onvoiceschanged !== undefined) {
//   speechSynthesis.onvoiceschanged = populateVoiceList;
// }

export const speak = text => {
  if (synth.speaking) {
    console.error("speechSynthesis.speaking");
    return;
  }

  var utterThis = new SpeechSynthesisUtterance(text);
  utterThis.onend = function(event) {
    // console.log("SpeechSynthesisUtterance.onend");
  };
  utterThis.onerror = function(event) {
    console.error("SpeechSynthesisUtterance.onerror");
  };
  //   var selectedOption = voiceSelect.selectedOptions[0].getAttribute("data-name");
  //   for (let i = 0; i < voices.length; i++) {
  //     if (voices[i].name === selectedOption) {
  //       utterThis.voice = voices[i];
  //     }
  //   }
  utterThis.voice = voices[10];
  utterThis.pitch = defaultPitchValue;
  utterThis.rate = defaultRateValue;
  synth.speak(utterThis);
};

// voiceSelect.onchange = function() {
//   speak();
// };
