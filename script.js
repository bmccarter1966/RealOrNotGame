
let questions = [{'text': 'AI can fully replace human creativity in art.', 'answer': 'Not', 'explanation': 'AI can generate art, but human creativity involves emotions and context.'}, {'text': 'Phishing emails often contain urgent language and suspicious links.', 'answer': 'Real', 'explanation': 'Urgency and fake links are classic phishing traits.'}, {'text': "Using '123456' is a strong password.", 'answer': 'Not', 'explanation': 'Simple, common passwords are very weak.'}, {'text': 'Smart contracts on blockchain can run without human intervention.', 'answer': 'Real', 'explanation': 'Smart contracts execute automatically according to code.'}, {'text': 'AI systems can always perfectly detect deepfakes.', 'answer': 'Not', 'explanation': 'Deepfake detection is improving, but not 100% accurate.'}, {'text': 'Two-factor authentication improves account security.', 'answer': 'Real', 'explanation': 'Adding a second factor makes accounts harder to compromise.'}, {'text': 'Sharing your crypto wallet seed phrase is safe with friends.', 'answer': 'Not', 'explanation': 'Never share private keys or seed phrases; it gives full access.'}, {'text': 'Most social engineering attacks exploit human psychology.', 'answer': 'Real', 'explanation': 'Attackers manipulate trust and urgency to trick victims.'}, {'text': 'AI chatbots can sometimes give incorrect or misleading answers.', 'answer': 'Real', 'explanation': 'AI generates responses based on data; errors are possible.'}, {'text': 'A browser lock icon guarantees a website is safe.', 'answer': 'Not', 'explanation': 'HTTPS shows encryption, not trustworthiness.'}, {'text': 'Deepfake videos can be used maliciously for scams.', 'answer': 'Real', 'explanation': 'Deepfakes can impersonate people for fraud.'}, {'text': 'Clicking random links in emails is completely safe if they look professional.', 'answer': 'Not', 'explanation': 'Even professional-looking emails can be malicious.'}, {'text': 'AI can write code but may produce bugs or errors.', 'answer': 'Real', 'explanation': 'AI can assist coding but mistakes are possible.'}, {'text': 'Public Wi-Fi networks are always secure for crypto transactions.', 'answer': 'Not', 'explanation': 'Public Wi-Fi can be intercepted; avoid sensitive actions there.'}, {'text': 'Regularly updating software reduces security vulnerabilities.', 'answer': 'Real', 'explanation': 'Updates patch known vulnerabilities, improving security.'}];
let current = 0;
let score = 0;
const total = questions.length;
let playerName = "";

const FLOW_URL = "YOUR_FLOW_URL_HERE"; // Power Automate URL

function shuffle(a){ for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]] } return a }

function init(){
  const startBtn = document.getElementById('startBtn');
  const btnReal = document.getElementById('btnReal');
  const btnNot = document.getElementById('btnNot');
  const nextBtn = document.getElementById('nextBtn');
  const playAgainBtn = document.getElementById('playAgainBtn');
  startBtn.addEventListener('click', startGame);
  btnReal.addEventListener('click', ()=>answer('Real'));
  btnNot.addEventListener('click', ()=>answer('Not'));
  nextBtn.addEventListener('click', nextQ);
  playAgainBtn.addEventListener('click', startGame);
}

function startGame(){
  playerName = prompt("Enter your name for the leaderboard:","");
  if(!playerName) playerName = "Anonymous";
  questions = shuffle([...questions]).slice(0,total);
  current=0; score=0;
  document.getElementById('qTotal').textContent = total;
  document.getElementById('startScreen').classList.add('hidden');
  document.getElementById('endScreen').classList.add('hidden');
  document.getElementById('questionScreen').classList.remove('hidden');
  showQ();
}

function showQ(){
  const q = questions[current];
  document.getElementById('qNum').textContent = current+1;
  document.getElementById('messageBox').textContent = q.text;
  document.getElementById('explanation').classList.add('hidden');
  document.getElementById('nextBtn').disabled = true;
  enableButtons(true);
}

function answer(choice){
  enableButtons(false);
  const q = questions[current];
  const correct = choice===q.answer;
  if(correct) score++;
  const explanation = document.getElementById('explanation');
  explanation.innerHTML = `<strong>${correct?'Correct!':'Not quite.'}</strong> ${q.explanation}`;
  explanation.classList.remove('hidden');
  document.getElementById('nextBtn').disabled = false;
}

function nextQ(){
  current++;
  if(current>=total) endGame();
  else showQ();
}

function endGame(){
  document.getElementById('questionScreen').classList.add('hidden');
  const end = document.getElementById('endScreen');
  document.getElementById('scoreTitle').textContent = `You scored ${score}/${total}`;
  let msg = "Nice work!";
  if(score===total) msg="Perfect! Cyber Shark!";
  else if(score>=Math.ceil(total*0.8)) msg="Great job — Cyber Sharp!";
  else if(score>=Math.ceil(total*0.5)) msg="Not bad — keep practicing!";
  else msg="Watch out — more training recommended.";
  document.getElementById('scoreMsg').textContent = msg;
  end.classList.remove('hidden');
  if(FLOW_URL && FLOW_URL!=="YOUR_FLOW_URL_HERE"){
    fetch(FLOW_URL,{
      method:"POST",
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({playerName:playerName,score:score,timestamp:new Date().toISOString()})
    }).then(res=>{
      const scoreMsg=document.getElementById('scoreMsg');
      scoreMsg.textContent+=" Your score has been submitted to the leaderboard!";
    }).catch(err=>{console.warn("Could not send score:",err);});
  }
}

function enableButtons(ok){
  document.getElementById('btnReal').disabled=!ok;
  document.getElementById('btnNot').disabled=!ok;
}

document.addEventListener('DOMContentLoaded', init);
