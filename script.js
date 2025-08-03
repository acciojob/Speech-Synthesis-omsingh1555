// Your script here.
// Your script here.
const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

msg.text = document.querySelector('[name="text"]').value;

// Populate voices when they are loaded
function populateVoices() {
  voices = speechSynthesis.getVoices();
  voicesDropdown.innerHTML = voices
    .map(voice => ⁠ <option value="${voice.name}">${voice.name} (${voice.lang})</option> ⁠)
    .join('');
}

// Set the voice from dropdown
function setVoice() {
  msg.voice = voices.find(voice => voice.name === this.value);
  toggle();
}

// Toggle speaking
function toggle(startOver = true) {
  speechSynthesis.cancel();
  if (startOver) {
    speechSynthesis.speak(msg);
  }
}

// Update rate, pitch, or text
function setOption() {
  msg[this.name] = this.value;
}

// Event Listeners
speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', () => toggle(true));
stopButton.addEventListener('click', () => toggle(false));