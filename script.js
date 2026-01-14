<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Phish-or-Real Game</title>
<style>
.hidden { display: none; }
button { margin: 5px; padding: 10px 20px; font-size: 16px; }
#messageBox { margin: 20px 0; font-size: 18px; }
#explanation { margin-top: 10px; font-style: italic; }
</style>
</head>
<body>

<!-- START SCREEN -->
<div id="startScreen">
  <h1>Phish-or-Real Game</h1>
  <button id="startBtn">Start Game</button>
</div>

<!-- QUESTION SCREEN -->
<div id="questionScreen" class="hidden">
  <div>Question <span id="qNum"></span> / <span id="qTotal"></span></div>
  <div id="messageBox"></div>
  <button id="btnPhish">Phish</button>
  <button id="btnReal">Real</button>
  <button id="nextBtn" class="hidden">Next</button>
  <div id="explanation"></div>
</div>

<!-- END SCREEN -->
<div id="endScreen" class="hidden">
  <h2 id="scoreTitle"></h2>
  <div id="scoreMsg"></div>
  <div id="bingoCall"></div>
  <button id="playAgainBtn">Play Again</button>
</div>

<script>
// ================= QUESTIONS =================
const QUESTIONS = [
  {text: 'AI can fully replace human creativity in art.', answer: 'Not', explanation: 'AI can generate art, but human creativity involves emotions and context.'},
  {text: 'Phishing emails often contain urgent language and suspicious links.', answer: 'Real', explanation: 'Urgency and fake links are classic phishing traits.'},
  {text: "Using '123456' is a strong password.", answer: 'Not', explanation: 'Simple, common passwords are very weak.'},
  {text: 'Smart contracts on blockchain can run without human intervention.', answer: 'Real', explanation: 'Smart contracts execute automatically according to code.'},
  {text: 'AI systems can always perfectly detect deepfakes.', answer: 'Not', explanation: 'Deepfake detection is improving, but not 100% accurate.'},
  {text: 'Two-factor authentication improves account security.', answer: 'Real', explanation: 'Adding a second factor makes accounts harder to compromise.'},
  {text: 'Sharing your crypto wallet seed phrase is safe with friends.', answer: 'Not', explanation: 'Never share private keys or seed phrases.'},
  {text: 'Most social engineering attacks exploit human psychology.', answer: 'Real', explanation: 'Attackers manipulate trust and urgency.'},
  {text: 'AI chatbots can sometimes give incorrect answers.', answer: 'Real', explanation: 'AI can generate incorrect output.'},
  {text: 'A browser lock icon guarantees a website is safe.', answer: 'Not', explanation: 'HTTPS does not guarantee trust.'}
];

// ================= GAME STATE =================
let questions = [];
let current = 0;
let score = 0;
const total = QUESTIONS.length;
const playerName = "Anonymous"; // always anonymous
const FLOW_URL = ""; // optional

// ================= HELPERS =================
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ================= INIT =================
function init() {
  const startBtn = document.getElementById('startBtn');
  const btnPhish = document.getElementById('btnPhish');
  const btnReal = document.getElementById('btnReal');
  const nextBtn = document.getElementById('nextBtn');
  const playAgainBtn = document.getElementById('playAgainBtn');

  startBtn.addEventListener('click', startGame);
  btnPhish.addEventListener('click', () => answer('Phish'));
  btnReal.addEventListener('click', () => answer('Real'));
  nextBtn.addEventListener('click', nextQ);
  playAgainBtn.addEventListener('click', startGame);
}

// ================= START GAME =================
function startGame() {
  questions = shuffle([...QUESTIONS]);
  current = 0;
  score = 0;

  document.getElementById('qTotal').textContent = total;
  document.getElementById('startScreen').classList.add('hidden');
  document.getElementById('endScreen').classList.add('hidden');
  document.getElementById('questionScreen').classList.remove('hidden');

  showQ();
}

// ================= SHOW QUESTION =================
function showQ() {
  const q = questions[current];
  document.getElementById('qNum').textContent = current + 1;
  document.getElementById('messageBox').textContent = q.text;

  const explanation = document.getElementById('explanation');
  explanation.classList.add('hidden');
  explanation.textContent = '';

  const nextBtn = document.getElementById('nextBtn');
  nextBtn.disabled = true;
  nextBtn.classList.add('hidden');

  enableButtons(true);
}

// ================= ANSWER =================
function answer(choice) {
  enableButtons(false);

  const q = questions[current];
  const correct = choice === q.answer;
  if (correct) score++;

  const explanation = document.getElementById('explanation');
  explanation.innerHTML = `<strong>${correct ? 'Correct!' : 'Not quite.'}</strong> ${q.explanation}`;
  explanation.classList.remove('hidden');

  const nextBtn = document.getElementById('nextBtn');
  nextBtn.disabled = false;
  nextBtn.classList.remove('hidden');
}

// ================= NEXT =================
function nextQ() {
  current++;
  if (current >= total) endGame();
  else showQ();
}

// ================= END GAME =================
function endGame() {
  document.getElementById('questionScreen').classList.add('hidden');

  const end = document.getElementById('endScreen');
  document.getElementById('scoreTitle').textContent = `You scored ${score}/${total}`;

  let msg = 'Nice work!';
  if (score === total) msg = 'Perfect! Excellent!';
  else if (score >= Math.ceil(total * 0.8)) msg = 'Great job!';
  else if (score >= Math.ceil(total * 0.5)) msg = 'Not bad — keep practicing!';
  else msg = 'Watch out — more training recommended.';

  document.getElementById('scoreMsg').textContent = msg;
  end.classList.remove('hidden');

  if (FLOW_URL) {
    fetch(FLOW_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({playerName, score, timestamp: new Date().toISOString()})
    }).catch(err => console.warn('Flow error:', err));
  }

  setTimeout(showBingoCall, 500);
}

// ================= BINGO CALL =================
function showBingoCall() {
  const bingoDiv = document.getElementById('bingoCall');
  bingoDiv.textContent = 'BINGO CALL';
  bingoDiv.style.fontSize = '2em';
  bingoDiv.style.fontWeight = 'bold';
  bingoDiv.style.textAlign = 'center';
  bingoDiv.style.marginTop = '20px';
}

// ================= ENABLE BUTTONS =================
function enableButtons(ok) {
  document.getElementById('btnPhish').disabled = !ok;
  document.getElementById('btnReal').disabled = !ok;
}

// ================= LOAD =================
document.addEventListener('DOMContentLoaded', init);
</script>


