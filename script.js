const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealItems.forEach(item => observer.observe(item));

document.querySelectorAll(".reason-card").forEach(card => {
  card.addEventListener("click", () => {
    const open = card.classList.toggle("open");
    card.setAttribute("aria-expanded", String(open));
  });
});

const envelope = document.getElementById("envelope");
const openLetter = document.getElementById("openLetter");
const letterInstruction = document.getElementById("letterInstruction");
openLetter.addEventListener("click", () => {
  const opened = envelope.classList.toggle("opened");
  openLetter.setAttribute("aria-expanded", String(opened));
  letterInstruction.textContent = opened ? "Take your time, chechi. This one is from my heart. ♡" : "A tiny letter, with a lot of love inside.";
  if (opened) sprinkle(18);
});

document.getElementById("wishButton").addEventListener("click", () => {
  const messages = [
    "I hope this year is kinder, brighter, and full of your favourite things. ♡",
    "May every quiet wish in your heart find its way to you. ✨",
    "One more year of you being wonderfully, beautifully YOU. ❤️"
  ];
  document.getElementById("wishResult").textContent = messages[Math.floor(Math.random() * messages.length)];
  sprinkle(30);
});

function sprinkle(count) {
  const layer = document.getElementById("confettiLayer");
  const symbols = ["♡", "✦", "✿", "♥", "✨"];
  for (let i = 0; i < count; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    piece.style.left = Math.random() * 100 + "%";
    piece.style.setProperty("--duration", (2.1 + Math.random() * 2.2) + "s");
    piece.style.setProperty("--size", (12 + Math.random() * 16) + "px");
    piece.style.animationDelay = (Math.random() * .5) + "s";
    piece.style.color = ["#c87986", "#e2a7ad", "#d6ad7c", "#9f7780"][Math.floor(Math.random() * 4)];
    layer.appendChild(piece);
    setTimeout(() => piece.remove(), 5200);
  }
}

// Optional gentle sound: browser autoplay is restricted, so sound starts only after a tap.
let audioContext = null;
let soundOn = false;
const musicToggle = document.getElementById("musicToggle");
musicToggle.addEventListener("click", () => {
  soundOn = !soundOn;
  musicToggle.setAttribute("aria-pressed", String(soundOn));
  musicToggle.querySelector("span").textContent = soundOn ? "Sound on" : "Sound off";
  if (soundOn) {
    try {
      audioContext = audioContext || new (window.AudioContext || window.webkitAudioContext)();
      playGentleTone();
    } catch (e) {
      musicToggle.querySelector("span").textContent = "Sound unavailable";
      soundOn = false;
    }
  } else if (audioContext) {
    audioContext.suspend();
  }
});
function playGentleTone() {
  if (!soundOn || !audioContext) return;
  audioContext.resume();
  const now = audioContext.currentTime;
  [523.25, 659.25, 783.99].forEach((frequency, i) => {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.type = "sine";
    osc.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, now + i * 0.35);
    gain.gain.exponentialRampToValueAtTime(0.035, now + i * 0.35 + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.35 + 0.6);
    osc.connect(gain); gain.connect(audioContext.destination);
    osc.start(now + i * 0.35); osc.stop(now + i * 0.35 + 0.65);
  });
  setTimeout(() => { if (soundOn) playGentleTone(); }, 4200);
}
