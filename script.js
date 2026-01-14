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
let total = QUESTIONS.length;
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
  // Make sure all elements exist
  const startBtn = document.getElementById('startBtn');
  const btnReal = document.getElementById('btnReal');
  const btnNot = document.getElementById('btnNot');
  const nextBtn = document.getElementById('nextBtn');
  const playAgainBtn = document.getElementById('playAgainBtn');

  if (!startBtn || !btnReal || !btnNot || !nextBtn || !playAgainBtn) return;

  startBtn.addEventListener('click', startGame);
  btnReal.addEventListener('click', () => answer('Real'));
  btnNot.addEventListener('click', () => answer('Not'));
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
  if (!q) return;

  document.getElementById('qNum').textContent = current + 1;
  document.getElementById('messageBox').textContent = q.text;

  const explanation = document.getElementById('explanation');
  explanation.classList.add('hidden');
  explanation.textContent = '';

  const nextBtn = document.getElementById('nextBtn');
  nextBtn.disabled = true;
  nextBtn.style.display = 'none';

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
  nextBtn.style.display = 'inline-block';
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

  setTimeout(showBingoCall, 1000);
}

// ================= BINGO CALL =================
function showBingoCall() {
  const end = document.getElementById('endScreen');
  const old = document.getElementById('bingoCall');
  if (old) end.removeChild(old);

  const bingo = document.createElement('div');
  bingo.id = 'bingoCall';
  bingo.style.fontSize = '2em';
  bingo.style.fontWeight = 'bold';
  bingo.style.textAlign = 'center';
  bingo.style.marginTop = '20px';

  const text = 'BINGO CALL';
  let i = 0;
  const interval = setInterval(function() {
    if (i < text.length) bingo.textContent += text[i++];
    else clearInterval(interval);
  }, 200);

  end.appendChild(bingo);
}

// ================= ENABLE BUTTONS =================
function enableButtons(ok) {
  document.getElementById('btnReal').disabled = !ok;
  document.getElementById('btnNot').disabled = !ok;
}

// ================= LOAD =================
document.addEventListener('DOMContentLoaded', init);
</script>

