const TILE_LIST = [
  "ae",
  "ee",
  "ie",
  "oe",
  "ue",
  "a",
  "e",
  "i",
  "o",
  "u",
  "oo",
  "ʊʊ",
  "au",
  "aw",
  "ou",
  "ow",
  "oi",
  "oy",
  "ar",
  "or",
  "er",
  "ir",
  "ur",
];

const AUDIO = {
  ae: new Audio("assets/audio/ae.mp3"),
  ee: new Audio("assets/audio/ee.mp3"),
  ie: new Audio("assets/audio/ie.mp3"),
  ue: new Audio("assets/audio/ue.mp3"),
  oe: new Audio("assets/audio/oe.mp3"),
  a: new Audio("assets/audio/a.m4a"),
  e: new Audio("assets/audio/e.mp3"),
  i: new Audio("assets/audio/i.mp3"),
  o: new Audio("assets/audio/o.mp3"),
  u: new Audio("assets/audio/u.mp3"),
  oo: new Audio("assets/audio/oo.mp3"),
  ʊʊ: new Audio("assets/audio/short-oo.mp3"),
  au: new Audio("assets/audio/au.mp3"),
  aw: new Audio("assets/audio/aw.mp3"),
  ou: new Audio("assets/audio/ou.mp3"),
  ow: new Audio("assets/audio/ow.mp3"),
  oi: new Audio("assets/audio/oi.mp3"),
  oy: new Audio("assets/audio/oy.mp3"),
  ar: new Audio("assets/audio/ar.mp3"),
  or: new Audio("assets/audio/or.mp3"),
  er: new Audio("assets/audio/er.mp3"),
  ir: new Audio("assets/audio/ir.mp3"),
  ur: new Audio("assets/audio/ur.mp3"),
  correct: new Audio("assets/audio/pop.mp3"),
  incorrect: new Audio("assets/audio/wrong-sound.mp3"),
  win: new Audio("assets/audio/winning-sound.mp3"),
};

Object.values(AUDIO).forEach((audio) => {
  audio.preload = "auto";
  audio.load();
});

let audioUnlocked = false;

function unlockAudio() {
  if (audioUnlocked) return;

  audioUnlocked = true;

  Object.values(AUDIO).forEach((audio) => {
    const volume = audio.volume;

    audio.volume = 0;

    audio
      .play()
      .then(() => {
        audio.pause();
        audio.currentTime = 0;
        audio.volume = volume;
      })
      .catch(() => {
        audio.volume = volume;
      });
  });
}

const SPEECH_TEXT = {
  ae: "A",
  ee: "E",
  ie: "I",
  oe: "O",
  ue: "U",
  a: "a",
  e: "e",
  i: "i",
  o: "o",
  u: "u",
  oo: "oo",
  ʊʊ: "oo as in book",
  au: "au",
  aw: "aw",
  ou: "ou",
  ow: "ow",
  oi: "oi",
  oy: "oy",
  ar: "ar",
  or: "or",
  er: "er",
  ir: "ir",
  ur: "ur",
};

const TARGETS = [
  { left: 30.5, top: 8.8, answers: ["ee"] },
  { left: 22.1, top: 17.1, answers: ["i"] },
  { left: 19.0, top: 25.4, answers: ["e"] },
  { left: 25.3, top: 38.5, answers: ["a"] },
  { left: 45.8, top: 40.9, answers: ["u"] },
  { left: 45.8, top: 48.7, answers: ["o"] },

  { left: 52.2, top: 8.8, answers: ["oo"] },
  { left: 62.65, top: 8.8, answers: ["ue"] },
  { left: 70.3, top: 17.1, answers: ["ʊʊ"] },
  { left: 72.7, top: 25.4, answers: ["oe"] },
  { left: 60.75, top: 38.5, answers: ["au"] },
  { left: 71.1, top: 38.5, answers: ["aw"] },

  { left: 22.1, top: 57.3, answers: ["ae"] },
  { left: 22.1, top: 66.1, answers: ["ie"] },
  { left: 11.9, top: 75.4, answers: ["ou"] },
  { left: 22.1, top: 75.4, answers: ["ow"] },
  { left: 11.9, top: 84.1, answers: ["oi"] },
  { left: 22.1, top: 84.1, answers: ["oy"] },

  { left: 81.9, top: 58.3, answers: ["ar"] },
  { left: 81.9, top: 65.1, answers: ["or"] },
  { left: 81.9, top: 72.2, answers: ["er"] },
  { left: 81.9, top: 79.3, answers: ["ir"] },
  { left: 81.9, top: 85.9, answers: ["ur"] },
];

const jumpFrames = [
  "assets/images/poppi-jump-1.png",
  "assets/images/poppi-jump-2.png",
  "assets/images/poppi-jump-3.png",
  "assets/images/poppi-jump-4.png",
  "assets/images/poppi-jump-5.png",
  "assets/images/poppi-jump-6.png",
  "assets/images/poppi-jump-7.png",
  "assets/images/poppi-jump-8.png",
  "assets/images/poppi-jump-9.png",
  "assets/images/poppi-jump-10.png",
  "assets/images/poppi-jump-9.png",
  "assets/images/poppi-jump-8.png",
  "assets/images/poppi-jump-7.png",
  "assets/images/poppi-jump-6.png",
  "assets/images/poppi-jump-5.png",
  "assets/images/poppi-jump-3.png",
  "assets/images/poppi-jump-2.png",
  // "assets/images/poppi-jump-1.png",
];
const danceFrames = [
  "assets/images/poppi-dance-1.png",
  "assets/images/poppi-dance-2.png",
  "assets/images/poppi-dance-1.png",
  "assets/images/poppi-dance-2.png",
  //"assets/images/poppi-stand.png",
];

function preloadImages(images) {
  images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

preloadImages(jumpFrames);
preloadImages(danceFrames);

const tilesEl = document.getElementById("tiles");
const zonesLayer = document.getElementById("zonesLayer");
const shuffleBtn = document.getElementById("shuffleBtn");
const resetBtn = document.getElementById("resetBtn");
const toast = document.getElementById("toast");
const celebrationOverlay = document.getElementById("celebration-overlay");
const playAgainBtn = document.getElementById("playAgainBtn");
const closeBtn = document.getElementById("closeBtn");

/* let draggedTile = null;
let draggedValue = null; */
let placeholder = null;

const dragState = {
  tile: null,
  value: null,
  startLeft: 0,
  startTop: 0,
  offsetX: 0,
  offsetY: 0,
  moved: false,
  startX: 0,
  startY: 0,
  placeholder: null,
};

let toastTimer = null;

function shuffle(array) {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 1300);
}

function getBestVoice() {
  if (!("speechSynthesis" in window)) return null;

  const voices = window.speechSynthesis.getVoices();

  return (
    voices.find((voice) => /Samantha/i.test(voice.name)) ||
    voices.find((voice) => /Google US English/i.test(voice.name)) ||
    voices.find((voice) => /Ava/i.test(voice.name)) ||
    voices.find((voice) => /Karen/i.test(voice.name)) ||
    voices.find((voice) => /Moira/i.test(voice.name)) ||
    voices.find((voice) => /^en-US/i.test(voice.lang)) ||
    voices.find((voice) => /^en/i.test(voice.lang)) ||
    voices[0] ||
    null
  );
}

function speakWithBrowserVoice(tileValue) {
  if (!("speechSynthesis" in window)) return;

  const utterance = new SpeechSynthesisUtterance(
    SPEECH_TEXT[tileValue] || tileValue,
  );
  const voice = getBestVoice();

  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang || "en-US";
  } else {
    utterance.lang = "en-US";
  }

  utterance.rate = 0.82;
  utterance.pitch = 1.02;
  utterance.volume = 1;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

let activeTileAudio = null;

function playSound(audio, volume = 1) {
  audio.pause();
  audio.currentTime = 0;
  audio.volume = volume;

  return audio.play();
}

function playTileAudio(tileValue) {
  const audio = AUDIO[tileValue];

  if (activeTileAudio) return;

  if (!audio) {
    speakWithBrowserVoice(tileValue);
    return;
  }

  activeTileAudio = audio;

  playSound(audio, 0.35)
    .catch(() => {
      speakWithBrowserVoice(tileValue);
    })
    .finally(() => {
      if (activeTileAudio === audio) {
        activeTileAudio = null;
      }
    });

  /* audio.onended = () => {
    if (activeTileAudio === audio) {
      activeTileAudio = null;
    }
  }; */
}

function playCorrectSound() {
  playSound(AUDIO.correct);
}

function playWrongSound() {
  playSound(AUDIO.incorrect);
}

function playWinningSound() {
  playSound(AUDIO.win);
}

function createSparkle(zone) {
  const sparkle = document.createElement("div");
  sparkle.className = "sparkle";

  for (let i = 0; i < 8; i += 1) {
    const piece = document.createElement("span");
    piece.style.setProperty("--angle", `${i * 45}deg`);
    sparkle.appendChild(piece);
  }

  zone.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 540);
}

function restartAnimation(element, className) {
  element.classList.remove(className);
  void element.offsetWidth;
  element.classList.add(className);
}

function createZones() {
  zonesLayer.innerHTML = "";

  TARGETS.forEach((target, index) => {
    const zone = document.createElement("div");
    zone.className = "drop-zone";
    zone.style.left = `${target.left}%`;
    zone.style.top = `${target.top}%`;
    zone.dataset.index = String(index);
    zonesLayer.appendChild(zone);
  });
}

function createTiles() {
  tilesEl.innerHTML = "";

  shuffle(TILE_LIST).forEach((value) => {
    const tile = document.createElement("button");
    tile.type = "button";
    tile.className = "tile";
    tile.textContent = value;
    //tile.draggable = true;
    tile.dataset.value = value;
    tile.setAttribute("aria-label", `${value} vowel tile`);

    tile.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      unlockAudio();
      if (dragState.tile) return;

      dragState.tile = tile;
      dragState.value = value;

      const rect = tile.getBoundingClientRect();

      dragState.startLeft = rect.left;
      dragState.startTop = rect.top;
      dragState.offsetX = event.clientX - rect.left;
      dragState.offsetY = event.clientY - rect.top;

      dragState.startX = event.clientX;
      dragState.startY = event.clientY;
      dragState.moved = false;
    });
    tilesEl.appendChild(tile);
  });
}

document.addEventListener("pointermove", handlePointerMove);
document.addEventListener("pointerup", handlePointerUp);

function handlePointerMove(event) {
  if (!dragState.tile) return;

  const dx = event.clientX - dragState.startX;
  const dy = event.clientY - dragState.startY;

  if (!dragState.moved) {
    if (Math.hypot(dx, dy) <= 8) return;

    dragState.moved = true;

    const rect = dragState.tile.getBoundingClientRect();

    dragState.tile.classList.add("is-dragging");
    dragState.tile.style.position = "fixed";
    dragState.tile.style.width = `${rect.width}px`;
    dragState.tile.style.height = `${rect.height}px`;
    dragState.tile.style.left = `${rect.left}px`;
    dragState.tile.style.top = `${rect.top}px`;

    const placeholder = document.createElement("div");
    placeholder.className = "tile-placeholder";
    placeholder.style.width = `${rect.width}px`;
    placeholder.style.height = `${rect.height}px`;

    dragState.tile.after(placeholder);
    dragState.placeholder = placeholder;
  }

  dragState.tile.style.left = `${event.clientX - dragState.offsetX}px`;
  dragState.tile.style.top = `${event.clientY - dragState.offsetY}px`;
}

function handlePointerUp(event) {
  if (!dragState.tile) return;

  if (!dragState.moved) {
    playTileAudio(dragState.value);
    resetDraggedTile();
    return;
  }

  const dropZone = findDropZone(event.clientX, event.clientY);

  if (!dropZone) {
    resetDraggedTile();
    return;
  }

  processDrop(dropZone);

  console.log(dropZone);
}

function findDropZone(x, y) {
  const zones = document.querySelectorAll(".drop-zone");

  for (const zone of zones) {
    const rect = zone.getBoundingClientRect();

    if (
      x >= rect.left &&
      x <= rect.right &&
      y >= rect.top &&
      y <= rect.bottom
    ) {
      return zone;
    }
  }

  return null;
}

function processDrop(zone) {
  zone.classList.remove("is-hover");

  const tile = dragState.tile;
  const value = dragState.value;
  const targetIndex = Number(zone.dataset.index);
  const target = TARGETS[targetIndex];

  if (!tile || !target || tile.classList.contains("is-hidden")) {
    resetDraggedTile();
    return;
  }

  if (target.answers.includes(value)) {
    zone.textContent = value;
    zone.onclick = () => playTileAudio(value);

    zone.classList.remove("is-wrong");
    zone.classList.add("is-correct");

    restartAnimation(zone, "pop");
    createSparkle(zone);
    playCorrectSound();

    tile.classList.add("is-hidden");

    resetDraggedTile();
    checkWin();
  } else {
    zone.classList.remove("is-correct");
    zone.classList.add("is-wrong");

    setTimeout(() => {
      zone.classList.remove("is-wrong");
    }, 380);

    restartAnimation(tile, "shake");

    playWrongSound();
    showToast("Try again!");

    resetDraggedTile();
    console.log(tile.style.position, tile.style.left, tile.style.top);
  }
}

function resetDraggedTile() {
  if (!dragState.tile) return;

  if (dragState.placeholder) {
    dragState.placeholder.replaceWith(dragState.tile);
    dragState.placeholder = null;
  }
  //tilesEl.insertBefore(dragState.tile, dragState.nextSibling);

  console.log(dragState.tile.parentElement);

  dragState.tile.classList.remove("is-dragging");

  dragState.tile.style.position = "";
  dragState.tile.style.left = "";
  dragState.tile.style.top = "";
  dragState.tile.style.width = "";
  dragState.tile.style.height = "";
  dragState.tile.style.margin = "";
  dragState.tile.style.zIndex = "";

  dragState.tile = null;
  dragState.value = null;
  /* dragState.placeholder?.remove();
  dragState.placeholder = null; */
}

function resetBoard() {
  createZones();
  createTiles();
}

function resetGame() {
  stopCelebrationAnimation();
  stopConfetti();
  hidePlayAgainDialog();
  hideCelebrationOverlay();
  unfreezeGame();
  resetBoard();
}
shuffleBtn.addEventListener("click", createTiles);
resetBtn.addEventListener("click", resetBoard);

if ("speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = () => {};
}

/**
 * WIN SECTION
 */

function handleGameWin() {
  //start sound
  playWinningSound();
  //freeze the game board
  freezeGame();
  //show celebration overlay
  showCelebrationOverlay();

  //start confetti
  launchConfetti();
  //start poppi celebration
  startCelebrationAnimation();
  //show "play again" button
  // showPlayAgainDialog();
}

function freezeGame() {
  zonesLayer.style.pointerEvents = "none";
  tilesEl.style.pointerEvents = "none";
  shuffleBtn.disabled = true;
  resetBtn.disabled = true;
}

function unfreezeGame() {
  zonesLayer.style.pointerEvents = "auto";
  tilesEl.style.pointerEvents = "auto";
  shuffleBtn.disabled = false;
  resetBtn.disabled = false;
}

function showCelebrationOverlay() {
  celebrationOverlay.style.display = "flex";
}

function hideCelebrationOverlay() {
  celebrationOverlay.style.display = "none";
}

function launchConfetti() {
  const container = document.getElementById("confetti-container");

  const colors = ["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93"];

  for (let i = 0; i < 150; i++) {
    const piece = document.createElement("div");

    const scale = 0.8 + Math.random() * 0.8;
    piece.style.transform = `scale(${scale})`;
    piece.className = "confetti";

    const random = Math.random();

    let shape;

    if (random < 0.5) {
      shape = "streamer"; // 50%
    } else if (random < 0.75) {
      shape = "circle"; // 25%
    } else {
      shape = "rect"; // 25%
    }

    piece.classList.add(shape);

    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.classList.add(shape);
    piece.style.setProperty("--scale", scale);
    piece.style.setProperty("--drift", `${Math.random() * 120 - 60}px`);
    piece.style.animationDuration = `${2 + Math.random() * 2}s`;
    piece.style.animationDelay = `${Math.random() * 0.5}s`;

    container.appendChild(piece);

    piece.addEventListener("animationend", () => piece.remove());
  }
}

function checkWin() {
  const correctZones = document.querySelectorAll(".drop-zone.is-correct");

  if (correctZones.length === TARGETS.length) {
    handleGameWin();
  }
}

const poppiImage = document.getElementById("poppi-celebration");
let currentJumpFrame = 0;
let currentDanceFrame = 0;
poppiImage.src = jumpFrames[0];

function playJumpAnimation(onComplete) {
  currentJumpFrame = 0;
  const jumpTimer = setInterval(() => {
    poppiImage.src = jumpFrames[currentJumpFrame];
    currentJumpFrame++;

    if (currentJumpFrame >= jumpFrames.length) {
      clearInterval(jumpTimer);
      if (typeof onComplete === "function") {
        onComplete();
      }
    }
  }, 33);
}

function playDanceAnimation(onComplete) {
  currentDanceFrame = 0;
  const danceTimer = setInterval(() => {
    poppiImage.src = danceFrames[currentDanceFrame];
    currentDanceFrame++;

    if (currentDanceFrame >= danceFrames.length) {
      clearInterval(danceTimer);
      if (typeof onComplete === "function") {
        onComplete();
      }
    }
  }, 250);
}

let celebrationAnimationRunning = false;
let celebrationTimeoutId;

function startCelebrationAnimation() {
  celebrationAnimationRunning = true;
  celebrationTimeoutId = setTimeout(() => {
    stopCelebrationAnimation();
  }, 60000);
  playCelebrationAnimation();
}

function playCelebrationAnimation() {
  playJumpAnimation(() => {
    playJumpAnimation(() => {
      playDanceAnimation(() => {
        playDanceAnimation(() => {
          if (celebrationAnimationRunning) {
            playCelebrationAnimation();
          }
        });
      });
    });
  });
}

function stopCelebrationAnimation() {
  celebrationAnimationRunning = false;
  clearTimeout(celebrationTimeoutId);
  poppiImage.src = "assets/images/poppi-stand.png";
}

function playAgain() {
  Object.values(AUDIO).forEach((audio) => {
    audio.pause();
    audio.currentTime = 0;
  });

  if (activeTileAudio) {
    activeTileAudio.pause();
    activeTileAudio.currentTime = 0;
    activeTileAudio = null;
  }

  activeTileAudio = null;

  stopCelebrationAnimation();
  hideCelebrationOverlay();
  unfreezeGame();
  resetBoard();
}

function closeCelebrationOverlay() {
  stopCelebrationAnimation();
  hideCelebrationOverlay();
  unfreezeGame();
}

playAgainBtn.addEventListener("click", playAgain);
closeBtn.addEventListener("click", closeCelebrationOverlay);

// function showPlayAgainDialog() {}

/**
 * Squiggle SVG path for confetti effect
 */
/*
const squiggle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
);

squiggle.setAttribute("viewBox", "0 0 10 30");
squiggle.classList.add("confetti", "squiggle");

const path = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
);

path.setAttribute(
    "d",
    "M5 0 C0 5 10 10 5 15 C0 20 10 25 5 30"
);

path.setAttribute("stroke", color);
path.setAttribute("stroke-width", "2.5");
path.setAttribute("fill", "none");
path.setAttribute("stroke-linecap", "round");

squiggle.appendChild(path);
*/
resetBoard();
