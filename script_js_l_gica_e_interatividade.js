// =========================================================
// 1. MOTOR DE ÁUDIO SINTETIZADO (Web Audio API)
// =========================================================
let soundEnabled = true;
let audioCtx = null;

function getAudioContext() {
    if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
            audioCtx = new AudioContextClass();
        }
    }
    return audioCtx;
}

function playTone(freq, type, duration, delay = 0) {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);

    gain.gain.setValueAtTime(0.12, ctx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + duration);
}

const sfx = {
    click: () => playTone(520, 'sine', 0.08),
    correct: () => {
        playTone(523.25, 'triangle', 0.14, 0);
        playTone(659.25, 'triangle', 0.14, 0.09);
        playTone(783.99, 'triangle', 0.25, 0.18);
    },
    wrong: () => {
        playTone(220, 'sawtooth', 0.18, 0);
        playTone(165, 'sawtooth', 0.28, 0.14);
    },
    victory: () => {
        [523.25, 659.25, 783.99, 1046.50].forEach((f, i) => playTone(f, 'triangle', 0.28, i * 0.11));
    }
};

function toggleSound() {
    soundEnabled = !soundEnabled;
    document.getElementById('sound-btn').textContent = soundEnabled ? '🔊' : '🔇';
    showToast(soundEnabled ? 'Efeitos sonoros ativados' : 'Som silenciado');
}

// =========================================================
// 2. BANCO DE PERGUNTAS OFICIAL IBJJF / BJJ
// =========================================================
const quizData = [
    {
        category: "Pontuação IBJJF",
        image: "https://images.unsplash.com/photo-1564415315949-7a0c4c73aab4?auto=format&fit=crop&w=900&q=80",
        question: "De acordo com o livro de regras da IBJJF, quantos pontos são atribuídos a um atleta que estabiliza a montada ou a pegada pelas costas por 3 segundos?",
        options: ["2 pontos", "3 pontos", "4 pontos", "1 vantagem"],
        correct: 2,
        hint: "É a pontuação máxima concedida por domínio posicional no Jiu-Jitsu.",
        rationale: "A montada e a pegada pelas costas com os dois ganchos valem 4 pontos cada, representando o maior domínio técnico antes da finalização."
    },
    {
        category: "Graduação Oficial",
        image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80",
        question: "Qual é a ordem correta das faixas no sistema oficial de graduação para atletas adultos (a partir de 16 anos) até a faixa preta?",
        options: [
            "Branca, Amarela, Azul, Roxa e Preta",
            "Branca, Azul, Roxa, Marrom e Preta",
            "Branca, Verde, Azul, Marrom e Preta",
            "Branca, Azul, Verde, Roxa e Preta"
        ],
        correct: 1,
        hint: "Faixas como amarela, laranja e verde pertencem exclusivamente ao sistema infantil/juvenil.",
        rationale: "No sistema adulto da IBJJF, a progressão oficial segue rigorosamente: Branca → Azul → Roxa → Marrom → Preta."
    },
    {
        category: "Técnica de Guarda",
        image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=900&q=80",
        question: "Em uma luta no solo, o atleta que está por baixo usando a guarda consegue desequilibrar o oponente e inverter a posição, ficando por cima. Como essa técnica é chamada?",
        options: ["Passagem de guarda", "Raspagem", "Queda de quadril", "Esgrima"],
        correct: 1,
        hint: "Essa movimentação parte sempre da guarda e rende 2 pontos no placar.",
        rationale: "A raspagem ocorre quando o lutador que está fazendo guarda inverte a posição para ficar por cima, garantindo 2 pontos após estabilizar por 3 segundos."
    },
    {
        category: "História da Arte Suave",
        image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&w=900&q=80",
        question: "Quem foi o mestre japonês (conhecido como Conde Koma) que ensinou Jiu-Jitsu a Carlos Gracie em Belém do Pará, dando origem ao BJJ?",
        options: ["Jigoro Kano", "Mitsuyo Maeda", "Masahiko Kimura", "Kyuzo Mifune"],
        correct: 1,
        hint: "Ele foi um dos principais discípulos de Jigoro Kano e viajou o mundo realizando lutas desafio.",
        rationale: "Mitsuyo Maeda (Conde Koma) chegou ao Brasil em 1914 e ensinou os fundamentos do Kodokan Judô / Jiu-Jitsu a Carlos Gracie em Belém."
    },
    {
        category: "Finalizações",
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80",
        question: "Qual finalização consiste em envolver o pescoço do adversário pelas costas utilizando um braço ao redor da garganta e o outro apoiado atrás da cabeça?",
        options: ["Guilhotina", "Triângulo de mão", "Mata-leão", "Ezequiel"],
        correct: 2,
        hint: "É um estrangulamento sem uso do kimono aplicado após conquistar as costas do oponente.",
        rationale: "O Mata-leão (Rear Naked Choke) é o estrangulamento clássico aplicado pelas costas sem depender das lapelas do kimono."
    },
    {
        category: "Regras & Segurança",
        image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=900&q=80",
        question: "Segundo as regras da IBJJF, qual das seguintes técnicas é estritamente proibida para atletas da faixa branca em competições?",
        options: ["Chave de braço (Armlock)", "Triângulo", "Chave de joelho e chave de calcanhar", "Estrangulamento cruzado"],
        correct: 2,
        hint: "Golpes que aplicam torção ou hiperextensão nos membros inferiores têm restrições severas nas faixas iniciais.",
        rationale: "Chaves de joelho (leg locks) e chaves de calcanhar (heel hooks) são proibidas na faixa branca pelo alto risco de lesão ligamentar."
    },
    {
        category: "Tempo de Luta",
        image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=900&q=80",
        question: "Qual é o tempo regulamentar de duração de uma luta na categoria Adulto na faixa preta segundo a IBJJF?",
        options: ["5 minutos", "6 minutos", "8 minutos", "10 minutos"],
        correct: 3,
        hint: "O tempo aumenta progressivamente conforme a graduação: Branca (5m), Azul (6m), Roxa (7m), Marrom (8m)...",
        rationale: "Na categoria Adulto Faixa Preta, os combates oficiais da IBJJF têm duração de 10 minutos."
    },
    {
        category: "Filosofia Técnica",
        image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=900&q=80",
        question: "Qual adaptação técnica foi fundamental para Hélio Gracie desenvolver o estilo brasileiro de Jiu-Jitsu?",
        options: [
            "Foco exclusivo em quedas de alto impacto",
            "Uso de alavancas e tempo de reação para compensar menor força física",
            "Eliminação total da luta de guarda",
            "Uso de golpes traumáticos em pé"
        ],
        correct: 1,
        hint: "Hélio Gracie tinha estrutura física franzina e adaptou os movimentos para exigir o mínimo de força bruta.",
        rationale: "Hélio Gracie aperfeiçoou o uso de alavancas biomecânicas e defesa pessoal a partir da guarda, permitindo que um lutador menor vencesse oponentes mais pesados."
    },
    {
        category: "Pontuação IBJJF",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=80",
        question: "O que acontece no placar quando um atleta posiciona um joelho sobre o abdômen ou tórax do oponente de costas no chão por 3 segundos?",
        options: ["Ganha 2 pontos por joelho na barriga", "Ganha 3 pontos por passagem", "Ganha 4 pontos por montada", "Recebe punição por falta de combatividade"],
        correct: 0,
        hint: "Tem o mesmo valor numérico de uma queda ou raspagem.",
        rationale: "A técnica de Joelho na Barriga estabilizada por 3 segundos com o outro pé apoiado no tatame vale 2 pontos."
    },
    {
        category: "Mestres & Graus",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80",
        question: "A partir de qual grau na faixa preta o praticante de Jiu-Jitsu passa a utilizar a faixa coral (vermelha e preta)?",
        options: ["5º grau", "6º grau", "7º grau", "9º grau"],
        correct: 2,
        hint: "São necessários no mínimo 31 anos de faixa preta ativa para alcançar esse patamar.",
        rationale: "Ao atingir o 7º grau (após 31 anos como faixa preta), o mestre recebe a faixa coral vermelha e preta."
    }
];

// =========================================================
// 3. CONTROLE DE ESTADO E FLUXO DO JOGO
// =========================================================
let selectedMode = 'classic';
let playerName = 'Atleta Guerreiro';
let currentIdx = 0;
let score = 0;
let hits = 0;
let combo = 0;
let maxCombo = 0;
let lives = 3;
let timerInterval;
let timeLeft = 25;
let isAnswered = false;
let used5050 = false;
let usedHint = false;

// Carregar Recorde Salvo no LocalStorage
let bestXP = parseInt(localStorage.getItem('bjj_best_xp') || '0', 10);
document.getElementById('best-record-badge').textContent = `🏆 Recorde: ${bestXP} XP`;

function setBeltTheme(theme, el) {
    sfx.click();
    document.body.setAttribute('data-belt', theme);
    document.querySelectorAll('.belt-dot').forEach(dot => dot.classList.remove('active'));
    el.classList.add('active');
}

function selectMode(mode, cardEl) {
    sfx.click();
    selectedMode = mode;
    document.querySelectorAll('.mode-card').forEach(c => c.classList.remove('selected'));
    cardEl.classList.add('selected');
}

function startQuiz() {
    sfx.click();
    const inputName = document.getElementById('player-name').value.trim();
    playerName = inputName || 'Atleta Guerreiro';

    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('result-screen').style.display = 'none';
    document.getElementById('quiz-screen').style.display = 'block';

    currentIdx = 0;
    score = 0;
    hits = 0;
    combo = 0;
    maxCombo = 0;
    lives = selectedMode === 'sudden' ? 1 : 3;
    used5050 = false;
    usedHint = false;

    document.getElementById('btn-5050').disabled = false;
    document.getElementById('btn-hint').disabled = false;

    updateHUD();
    renderQuestion();
}

function renderQuestion() {
    isAnswered = false;
    const q = quizData[currentIdx];

    document.getElementById('question-counter').textContent = `${currentIdx + 1}/${quizData.length}`;
    document.getElementById('progress-fill').style.width = `${(currentIdx / quizData.length) * 100}%`;

    const imgEl = document.getElementById('q-image');
    imgEl.style.opacity = '0.25';
    imgEl.src = q.image;
    imgEl.onload = () => { imgEl.style.opacity = '1'; };

    document.getElementById('q-category').textContent = q.category;
    document.getElementById('q-text').textContent = q.question;

    document.getElementById('feedback-box').style.display = 'none';
    document.getElementById('next-btn').style.display = 'none';

    if (!used5050) document.getElementById('btn-5050').disabled = false;
    if (!usedHint) document.getElementById('btn-hint').disabled = false;

    const optionsGrid = document.getElementById('options-grid');
    optionsGrid.innerHTML = '';

    const letters = ['A', 'B', 'C', 'D'];
    q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-card';
        btn.innerHTML = `
            <span class="option-letter">${letters[idx]}</span>
            <span>${opt}</span>
        `;
        btn.onclick = () => selectAnswer(idx, btn);
        optionsGrid.appendChild(btn);
    });

    startTimer();
}

function startTimer() {
    clearInterval(timerInterval);
    timeLeft = selectedMode === 'blitz' ? 12 : 25;
    const timerText = document.getElementById('timer-text');
    const timerPill = document.getElementById('timer-pill');
    timerPill.classList.remove('warning');
    timerText.textContent = timeLeft;

    timerInterval = setInterval(() => {
        timeLeft--;
        timerText.textContent = timeLeft;
        if (timeLeft <= 5) timerPill.classList.add('warning');
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleWrongOrTimeout(true);
        }
    }, 1000);
}

function handleWrongOrTimeout(isTimeout, btnElement = null) {
    if (isAnswered) return;
    isAnswered = true;
    clearInterval(timerInterval);
    sfx.wrong();

    const q = quizData[currentIdx];
    const cards = document.querySelectorAll('.option-card');
    cards.forEach((card, i) => {
        card.disabled = true;
        if (i === q.correct) card.classList.add('correct');
    });

    if (btnElement) btnElement.classList.add('wrong');

    combo = 0;
    lives--;
    updateHUD();

    const title = isTimeout ? "⏱️ Tempo Esgotado!" : "❌ Posição Perdida!";
    showFeedback(title, q.rationale);

    document.getElementById('btn-5050').disabled = true;
    document.getElementById('btn-hint').disabled = true;

    const nextBtn = document.getElementById('next-btn');
    nextBtn.style.display = 'inline-block';
    nextBtn.textContent = lives <= 0 ? 'Ver Resultado Final →' : 'Próximo Round →';
}

function selectAnswer(selectedIdx, btnElement) {
    if (isAnswered) return;
    const q = quizData[currentIdx];

    if (selectedIdx === q.correct) {
        isAnswered = true;
        clearInterval(timerInterval);
        sfx.correct();

        const cards = document.querySelectorAll('.option-card');
        cards.forEach(c => c.disabled = true);
        btnElement.classList.add('correct');

        hits++;
        combo++;
        if (combo > maxCombo) maxCombo = combo;

        const modeMultiplier = selectedMode === 'blitz' ? 2 : (selectedMode === 'sudden' ? 1.5 : 1);
        const roundPoints = Math.round((100 + timeLeft * 5) * combo * modeMultiplier);
        score += roundPoints;

        const badge = document.getElementById('combo-badge');
        badge.classList.add('pulse');
        setTimeout(() => badge.classList.remove('pulse'), 300);

        updateHUD();
        showFeedback(`✅ Finalização Perfeita! (+${roundPoints} XP)`, q.rationale);

        document.getElementById('btn-5050').disabled = true;
        document.getElementById('btn-hint').disabled = true;
        const nextBtn = document.getElementById('next-btn');
        nextBtn.style.display = 'inline-block';
        nextBtn.textContent = currentIdx + 1 === quizData.length ? 'Receber Graduação 🏆' : 'Próximo Round →';
    } else {
        handleWrongOrTimeout(false, btnElement);
    }
}

function useFiftyFifty() {
    if (used5050 || isAnswered) return;
    sfx.click();
    used5050 = true;
    document.getElementById('btn-5050').disabled = true;

    const q = quizData[currentIdx];
    const cards = Array.from(document.querySelectorAll('.option-card'));
    const wrongIndices = [0, 1, 2, 3].filter(i => i !== q.correct);
    wrongIndices.sort(() => Math.random() - 0.5);

    cards[wrongIndices[0]].classList.add('eliminated');
    cards[wrongIndices[1]].classList.add('eliminated');
    showToast('✂️ Duas alternativas incorretas eliminadas!');
}

function useHint() {
    if (usedHint || isAnswered) return;
    sfx.click();
    usedHint = true;
    document.getElementById('btn-hint').disabled = true;

    const q = quizData[currentIdx];
    showFeedback('💡 Orientação do Corner', q.hint);
}

function showFeedback(title, text) {
    const box = document.getElementById('feedback-box');
    document.getElementById('feedback-title').textContent = title;
    document.getElementById('feedback-text').textContent = text;
    box.style.display = 'block';
}

function updateHUD() {
    document.getElementById('score-display').textContent = score;
    document.getElementById('combo-badge').textContent = `🔥 Combo ${combo}x`;
    const hearts = lives > 0 ? '❤️'.repeat(lives) : '💔';
    document.getElementById('lives-display').textContent = hearts;
}

function nextQuestion() {
    sfx.click();
    if (lives <= 0 || currentIdx + 1 >= quizData.length) {
        showResults();
    } else {
        currentIdx++;
        renderQuestion();
    }
}

// =========================================================
// 4. TELA DE CERTIFICADO E EFEITOS VISUAIS
// =========================================================
function showResults() {
    clearInterval(timerInterval);
    document.getElementById('quiz-screen').style.display = 'none';
    document.getElementById('result-screen').style.display = 'block';

    if (score > bestXP) {
        bestXP = score;
        localStorage.setItem('bjj_best_xp', bestXP);
        document.getElementById('best-record-badge').textContent = `🏆 Recorde: ${bestXP} XP`;
    }

    document.getElementById('cert-player-name').textContent = playerName;
    document.getElementById('final-hits').textContent = `${hits}/${quizData.length}`;
    document.getElementById('final-xp').textContent = `${score} XP`;
    document.getElementById('final-combo').textContent = `${maxCombo}x`;

    const beltEl = document.getElementById('award-belt');
    const tipEl = document.getElementById('award-tip');
    const rankTitle = document.getElementById('result-rank');
    const rankDesc = document.getElementById('result-desc');

    if (hits >= 9) {
        beltEl.style.background = '#18181b';
        tipEl.style.background = '#e11d48';
        rankTitle.textContent = "Faixa Preta 4º Grau 🥋";
        rankDesc.textContent = "Domínio absoluto! Você possui conhecimento técnico e histórico digno de um mestre no tatame.";
        sfx.victory();
        launchConfetti();
    } else if (hits >= 7) {
        beltEl.style.background = '#78350f';
        tipEl.style.background = '#09090b';
        rankTitle.textContent = "Faixa Marrom Técnica";
        rankDesc.textContent = "Excelente leitura de luta e regras! Você está a um passo da faixa preta.";
        sfx.victory();
        launchConfetti();
    } else if (hits >= 5) {
        beltEl.style.background = '#6d28d9';
        tipEl.style.background = '#09090b';
        rankTitle.textContent = "Faixa Roxa Competidor";
        rankDesc.textContent = "Bom desempenho! Você domina bem os fundamentos e regras principais da IBJJF.";
    } else if (hits >= 3) {
        beltEl.style.background = '#2563eb';
        tipEl.style.background = '#09090b';
        rankTitle.textContent = "Faixa Azul Guerreiro";
        rankDesc.textContent = "Bom início no tatame! Continue treinando para dominar as regras e posições avançadas.";
    } else {
        beltEl.style.background = '#f8fafc';
        tipEl.style.background = '#09090b';
        rankTitle.textContent = "Faixa Branca Iniciante";
        rankDesc.textContent = "Todo faixa preta é um faixa branca que nunca desistiu. Volte ao tatame e supere seu recorde!";
    }
}

function shareResult() {
    const rank = document.getElementById('result-rank').textContent;
    const text = `🥋 BJJ MASTER PRO — Certificado Oficial\nAtleta: ${playerName}\nGraduação Alcançada: ${rank}\nPrecisão: ${hits}/${quizData.length} | Pontuação: ${score} XP | Combo Máx: ${maxCombo}x\nOss!`;

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('📋 Certificado copiado! Cole para compartilhar.');
        }).catch(() => fallbackCopy(text));
    } else {
        fallbackCopy(text);
    }
}

function fallbackCopy(text) {
    const tempInput = document.createElement('textarea');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast('📋 Certificado copiado! Cole para compartilhar.');
}

function restartQuiz() {
    sfx.click();
    document.getElementById('result-screen').style.display = 'none';
    document.getElementById('start-screen').style.display = 'block';
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2800);
}

function launchConfetti() {
    const canvas = document.getElementById('fx-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#e11d48', '#f59e0b', '#10b981', '#3b82f6', '#ffffff'];
    const particles = Array.from({ length: 90 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 6 + 3,
        d: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 10 - 5
    }));

    let frame = 0;
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            ctx.beginPath();
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x, p.y, p.r * 1.4, p.r);
            p.y += p.d;
            p.x += Math.sin(frame * 0.05 + p.tilt) * 1.5;
        });
        frame++;
        if (frame < 160) requestAnimationFrame(draw);
        else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    draw();
}