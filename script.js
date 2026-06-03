const questions = [
  {
    q: "Qual sigla representa o índice usado por satélites para medir a saúde e densidade da vegetação?",
    opts: ["NDVI", "NASA", "INPE", "GPS"],
    correct: 0,
    explain: "NDVI (Normalized Difference Vegetation Index) é calculado com base na reflexão da luz vermelha e infravermelha, indicando vitalidade da vegetação."
  },
  {
    q: "Qual é o principal órgão brasileiro responsável pelo monitoramento de queimadas por satélite?",
    opts: ["IBAMA", "INPE", "EMBRAPA", "ANA"],
    correct: 1,
    explain: "O INPE (Instituto Nacional de Pesquisas Espaciais) opera o sistema PRODES/DETER e disponibiliza dados de focos de calor para todo o território nacional."
  },
  {
    q: "Queimadas contribuem para qual dos seguintes problemas ambientais globais?",
    opts: ["Aumento da biodiversidade", "Redução do efeito estufa", "Emissão de CO₂ e agravamento das mudanças climáticas", "Aumento da umidade do ar"],
    correct: 2,
    explain: "Queimadas liberam grandes quantidades de CO₂, metano e outros gases de efeito estufa armazenados na biomassa vegetal, agravando o aquecimento global."
  },
  {
    q: "O que é sensoriamento remoto orbital?",
    opts: [
      "Técnica de medir temperatura com termômetros em campo",
      "Coleta de dados ambientais a partir de satélites e aeronaves sem contato físico com a superfície",
      "Sistema de GPS para navegação em florestas",
      "Rede de sensores terrestres conectados via satélite"
    ],
    correct: 1,
    explain: "Sensoriamento remoto é a tecnologia de obter informações sobre a superfície terrestre a partir de plataformas orbitais, sem necessidade de contato físico."
  },
  {
    q: "Qual bioma brasileiro concentra historicamente o maior número de focos de incêndio por ano?",
    opts: ["Mata Atlântica", "Pampa", "Cerrado", "Caatinga"],
    correct: 2,
    explain: "O Cerrado é o bioma mais afetado por queimadas no Brasil, tanto por fatores naturais (seca sazonal) quanto por ação humana para abertura de pastagens."
  },
  {
    q: "O que significa um NDVI com valor próximo de zero ou negativo em uma área?",
    opts: [
      "Vegetação muito densa e saudável",
      "Presença de corpos d'água ou solo exposto/vegetação morta",
      "Alta umidade do solo",
      "Neve ou cobertura de gelo"
    ],
    correct: 1,
    explain: "Valores de NDVI próximos de zero indicam ausência de vegetação viva — podendo corresponder a solo exposto, áreas urbanas, água ou vegetação morta/seca."
  },
  {
    q: "Por que sistemas de detecção REATIVOS de queimadas têm limitações graves?",
    opts: [
      "Porque são muito caros",
      "Porque dependem de internet",
      "Porque detectam o fogo apenas quando ele já está ativo, limitando a capacidade de contenção",
      "Porque funcionam apenas durante o dia"
    ],
    correct: 2,
    explain: "Sistemas reativos alertam quando o foco já existe, muitas vezes tarde demais para ação preventiva eficaz. Sistemas preditivos permitem mobilização antes do início do incêndio."
  },
  {
    q: "Qual satélite da NASA é amplamente usado para monitoramento de temperatura superficial e focos de calor no Brasil?",
    opts: ["Hubble", "TERRA/AQUA com sensor MODIS", "James Webb", "ISS"],
    correct: 1,
    explain: "Os satélites TERRA e AQUA da NASA, equipados com o sensor MODIS, detectam focos de calor com resolução de 1km e cobertura global diária."
  },
  {
    q: "Qual combinação de fatores aumenta MAIS o risco de queimada numa região?",
    opts: [
      "Chuva recente + temperatura baixa + vento calmo",
      "NDVI alto + solo úmido + nuvens",
      "Estiagem prolongada + temperatura elevada + vento forte + vegetação seca",
      "Alta umidade + solo saturado + floresta densa"
    ],
    correct: 2,
    explain: "A combinação de ausência de chuva, calor, vento e vegetação seca cria as condições ideais para início e propagação rápida de incêndios florestais."
  },
  {
    q: "O que é uma 'janela de risco de 72h' em sistemas preditivos de queimadas?",
    opts: [
      "O tempo máximo para apagar um incêndio",
      "Um alerta emitido quando já há 72 focos ativos",
      "A previsão de probabilidade de condição crítica de incêndio para as próximas 72 horas",
      "O período após a queimada em que o solo fica exposto"
    ],
    correct: 2,
    explain: "A janela de risco de 72h é a previsão antecipada que permite ação preventiva antes que o incêndio comece — o principal diferencial de sistemas preditivos modernos."
  }
];

let current = 0, score = 0, answered = false;

function renderQuestion() {
  const q = questions[current];
  document.getElementById('questionLabel').textContent = `Pergunta ${current + 1} de ${questions.length}`;
  document.getElementById('scoreDisplay').textContent = `Pontos: ${score}`;
  document.getElementById('progressBar').style.width = `${((current + 1) / questions.length) * 100}%`;
  document.getElementById('questionText').textContent = q.q;
  const container = document.getElementById('optionsContainer');
  container.innerHTML = '';
  const letters = ['A','B','C','D'];
  q.opts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.innerHTML = `<span class="option-letter">${letters[i]}</span>${opt}`;
    btn.onclick = () => selectAnswer(i);
    container.appendChild(btn);
  });
  document.getElementById('quizFeedback').className = 'quiz-feedback';
  document.getElementById('quizFeedback').textContent = '';
  document.getElementById('nextBtn').className = 'quiz-next';
  answered = false;
}

function selectAnswer(idx) {
  if (answered) return;
  answered = true;
  const q = questions[current];
  const btns = document.querySelectorAll('.quiz-option');
  btns.forEach(b => b.disabled = true);
  const fb = document.getElementById('quizFeedback');
  if (idx === q.correct) {
    score++;
    btns[idx].classList.add('correct');
    fb.className = 'quiz-feedback correct show';
    fb.textContent = '✓ Correto! ' + q.explain;
  } else {
    btns[idx].classList.add('wrong');
    btns[q.correct].classList.add('correct');
    fb.className = 'quiz-feedback wrong show';
    fb.textContent = '✗ Incorreto. ' + q.explain;
  }
  document.getElementById('scoreDisplay').textContent = `Pontos: ${score}`;
  const nextBtn = document.getElementById('nextBtn');
  nextBtn.className = 'quiz-next show';
  nextBtn.textContent = current < questions.length - 1 ? 'Próxima Pergunta →' : 'Ver Resultado →';
}

function nextQuestion() {
  current++;
  if (current >= questions.length) showResult();
  else renderQuestion();
}

function showResult() {
  document.getElementById('questionScreen').style.display = 'none';
  const rs = document.getElementById('resultScreen');
  rs.className = 'quiz-result show';
  document.getElementById('resultNum').textContent = score;
  // Animate ring
  const deg = (score / 10) * 360;
  document.getElementById('resultRing').style.background = `conic-gradient(var(--green) ${deg}deg, rgba(34,197,94,.1) ${deg}deg)`;
  let title, msg, badgeClass, badgeText;
  if (score <= 4) {
    title = 'Você está começando!'; badgeClass = 'badge-beginner'; badgeText = '🌱 Iniciante';
    msg = 'Ainda há muito a descobrir sobre monitoramento ambiental. Explore o conteúdo desta página e volte para tentar de novo!';
  } else if (score <= 7) {
    title = 'Bom conhecimento!'; badgeClass = 'badge-mid'; badgeText = '🔥 Intermediário';
    msg = 'Você já sabe bastante sobre queimadas e sensoriamento remoto. Com mais estudo, chegará ao nível expert!';
  } else {
    title = 'Expert em Queimadas!'; badgeClass = 'badge-expert'; badgeText = '🛰️ Expert';
    msg = 'Impressionante! Você domina os conceitos de monitoramento orbital e prevenção de incêndios. Bem-vindo ao time FireWatcher!';
  }
  document.getElementById('resultTitle').textContent = title;
  document.getElementById('resultMsg').textContent = msg;
  const badge = document.getElementById('resultBadge');
  badge.className = `result-badge ${badgeClass}`;
  badge.textContent = badgeText;
}

function restartQuiz() {
  current = 0; score = 0; answered = false;
  document.getElementById('questionScreen').style.display = 'block';
  document.getElementById('resultScreen').className = 'quiz-result';
  renderQuestion();
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));


window.addEventListener('scroll', () => {
  const nb = document.getElementById('navbar');
  nb.style.background = window.scrollY > 50
    ? 'rgba(10,14,23,0.97)'
    : 'rgba(10,14,23,0.85)';
});


function toggleMenu() {
  const links = document.querySelector('.nav-links');
  const cta = document.querySelector('.nav-cta');
  const open = links.style.display === 'flex';
  links.style.cssText = open ? '' : 'display:flex;flex-direction:column;position:fixed;top:60px;left:0;right:0;background:rgba(10,14,23,0.98);padding:1.5rem;gap:.5rem;border-bottom:1px solid rgba(255,255,255,.08)';
  if (!open && cta) cta.style.display = 'none';
}


renderQuestion();