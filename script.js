<script>
// AI & Security Quiz with Animated Bingo Call

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

let questions = [];
let current = 0;
let score = 0;
const total = QUESTIONS.length;

// Fixed anonymous player
const playerName = "Anonymous";
const FLOW_URL = ""; // optional

// Shuffle helper
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Init listeners
function init() {
  document.getElementById('startBtn').addEventListener('click', startGame);
  document.getElementById('btnReal').addEventListener('click', () => answer('Real'));
  document.getElementById('btnNot').addEventListener('click', () => answer('Not'));
  document.getElementById('nextBtn').addEventListener('click', nextQ);
  document.getElementById('playAgainBtn').addEventListener('click', startGame);
}

// Start game (FIXED)
function startGame() {
  questions = shuffle([...QUESTIONS]);   // ✅ FIX
  current = 0;
  score = 0;

  document.getElementById('qTotal').textContent = total;
  document.getElementById('startScreen').classList.add('hidden');
  document.getElementById('endScreen').classList.add('hidden');
  document.getElementById('questionScreen').classList.remove('hidden');

  showQ();
}

// Show question
function showQ() {
  const q = questions[current];
  document.getElementById('qNum').textContent = current + 1;
  document.getElementById('messageBox').textContent = q.text;

  const explanation = document.getElementById('explanation');
  explanation.classList.add('hidden');
  explanation.textContent = "";

  const nextBtn = document.getElementById('nextBtn');
  nextBtn.disabled = true;
  nextBtn.style.display = "none";

  enableButtons(true);
}

// Answer
function answer(choice) {
  enableButtons(false);

  const q = questions[current];
  const correct = choice === q.answer;
  if (correct) score++;

  const explanation = document.getElementById('explanation');
  explanation.innerHTML =
    `<strong>${correct ? 'Correct!' : 'Not quite.'}</strong> ${q.explanation}`;
  explanation.classList.remove('hidden');

  const nextBtn = document.getElementById('nextBtn');
  nextBtn.disabled = false;
  nextBtn.style.display = "inline-block";
}

// Next
function nextQ() {
  current++;
  current >= total ? endGame() : showQ();
}

// End
function endGame() {
  document.getElementById('questionScreen').classList.add('hidden');
  const end = document.getElementById('endScreen');

  document.getElementById('scoreTitle').textContent =
    `You scored ${score}/${total}`;

  document.getElementById('scoreMsg').textContent = "Nice work!";
  end.classList.remove('hidden');

  if (FLOW_URL) {
    fetch(FLOW_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        playerName,
        score,
        timestamp: new Date().toISOString()
      })
    });
  }

  setTimeout(showBingoCall, 1000);
}

// Bingo
function showBingoCall() {
  const end = document.getElementById('endScreen');
  document.getElementById('bingoCall')?.remove();

  const bingo = document.createElement('div');
  bingo.id = "bingoCall";
  bingo.style.fontSize = "2em";
  bingo.style.fontWeight = "bold";
  bingo.style.textAlign = "center";
  bingo.style.marginTop = "20px";

  const text = "BINGO CALL";
  let i = 0;
  const interval = setInterval(() => {
    if (i < text.length) {
      bingo.textContent += text[i++];
    } else {
      clearInterval(interval);
    }
  }, 200);

  end.appendChild(bingo);
}

// Enable buttons
function enableButtons(ok) {
  document.getElementById('btnReal').disabled = !ok;
  document.getElementById('btnNot').disabled = !ok;
}

document.addEventListener('DOMContentLoaded', init);
</script>

  
