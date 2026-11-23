:root {
    --bg-dark: #07070a;
    --bg-card: #111116;
    --bg-glass: rgba(20, 20, 27, 0.82);
    --border-glass: rgba(255, 255, 255, 0.09);
    --text-main: #f8fafc;
    --text-muted: #94a3b8;
    --accent: #e11d48;
    --accent-glow: rgba(225, 29, 72, 0.45);
    --accent-secondary: #fb7185;
    --success: #10b981;
    --success-glow: rgba(16, 185, 129, 0.35);
    --error: #ef4444;
    --error-glow: rgba(239, 68, 68, 0.35);
    --gold: #f59e0b;
}

/* Temas Dinâmicos por Faixa */
[data-belt="white"] {
    --accent: #94a3b8;
    --accent-glow: rgba(248, 250, 252, 0.35);
    --accent-secondary: #f8fafc;
}
[data-belt="blue"] {
    --accent: #2563eb;
    --accent-glow: rgba(37, 99, 235, 0.45);
    --accent-secondary: #60a5fa;
}
[data-belt="purple"] {
    --accent: #7c3aed;
    --accent-glow: rgba(124, 58, 237, 0.45);
    --accent-secondary: #a78bfa;
}
[data-belt="brown"] {
    --accent: #92400e;
    --accent-glow: rgba(146, 64, 14, 0.45);
    --accent-secondary: #d97706;
}
[data-belt="black"] {
    --accent: #e11d48;
    --accent-glow: rgba(225, 29, 72, 0.45);
    --accent-secondary: #fb7185;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: transparent;
}

body {
    font-family: 'Inter', sans-serif;
    background-color: var(--bg-dark);
    color: var(--text-main);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 16px;
    background-image: 
        radial-gradient(circle at 10% 15%, var(--accent-glow), transparent 42%),
        radial-gradient(circle at 90% 85%, rgba(56, 189, 248, 0.08), transparent 45%),
        linear-gradient(to bottom, #07070a, #0d0d12);
    transition: background 0.5s ease;
    overflow-x: hidden;
}

h1, h2, h3, h4, .brand-font {
    font-family: 'Montserrat', sans-serif;
}

/* Canvas de Confete / Partículas */
#fx-canvas {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 999;
}

/* Barra Superior de Controle */
.top-bar {
    width: 100%;
    max-width: 780px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 14px;
    gap: 12px;
    flex-wrap: wrap;
}

.brand-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 900;
    font-size: 1.05rem;
    letter-spacing: 0.5px;
}

.brand-logo .pro-tag {
    background: linear-gradient(135deg, var(--accent), var(--accent-secondary));
    color: #fff;
    font-size: 0.65rem;
    padding: 3px 7px;
    border-radius: 6px;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.controls-group {
    display: flex;
    align-items: center;
    gap: 10px;
}

.belt-selector {
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--bg-glass);
    padding: 6px 14px;
    border-radius: 99px;
    border: 1px solid var(--border-glass);
    backdrop-filter: blur(12px);
}

.belt-selector span {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: var(--text-muted);
    font-weight: 700;
}

.belt-dot {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid transparent;
    transition: transform 0.2s, border-color 0.2s;
}

.belt-dot:hover { transform: scale(1.2); }
.belt-dot.active { border-color: #fff; transform: scale(1.15); }
.belt-dot[data-theme="white"] { background: linear-gradient(135deg, #f8fafc 65%, #09090b 65%); }
.belt-dot[data-theme="blue"] { background: #2563eb; }
.belt-dot[data-theme="purple"] { background: #7c3aed; }
.belt-dot[data-theme="brown"] { background: #78350f; }
.belt-dot[data-theme="black"] { background: linear-gradient(135deg, #18181b 55%, #e11d48 55%); }

[data-belt="white"] .btn-primary,
[data-belt="white"] .next-btn,
[data-belt="white"] .hero-tag,
[data-belt="white"] .pro-tag {
    color: #09090b;
}

.sound-toggle {
    background: var(--bg-glass);
    border: 1px solid var(--border-glass);
    color: var(--text-main);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    backdrop-filter: blur(12px);
    transition: all 0.2s;
    font-size: 1rem;
}

.sound-toggle:hover {
    border-color: var(--accent-secondary);
    transform: scale(1.08);
}

/* Container Principal */
.app-container {
    width: 100%;
    max-width: 780px;
    background: var(--bg-glass);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid var(--border-glass);
    border-radius: 28px;
    box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.85), inset 0 1px 0 rgba(255,255,255,0.08);
    overflow: hidden;
    position: relative;
    animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(18px); }
    to { opacity: 1; transform: translateY(0); }
}

/* TELA INICIAL */
.start-screen {
    padding: 32px;
}

.hero-banner {
    width: 100%;
    height: 230px;
    border-radius: 20px;
    overflow: hidden;
    position: relative;
    margin-bottom: 24px;
    box-shadow: 0 16px 35px rgba(0,0,0,0.6);
    border: 1px solid var(--border-glass);
}

.hero-banner img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s ease;
}

.hero-banner:hover img { transform: scale(1.04); }

.hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(7,7,10,0.96) 12%, rgba(7,7,10,0.25) 100%);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 24px;
}

.hero-badges {
    display: flex;
    gap: 8px;
    margin-bottom: 10px;
    flex-wrap: wrap;
}

.hero-tag {
    background: var(--accent);
    color: #fff;
    font-size: 0.68rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    padding: 4px 10px;
    border-radius: 6px;
}

.record-tag {
    background: rgba(245, 158, 11, 0.2);
    border: 1px solid rgba(245, 158, 11, 0.4);
    color: var(--gold);
    font-size: 0.68rem;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 6px;
}

.hero-overlay h1 {
    font-size: 1.95rem;
    font-weight: 900;
    line-height: 1.15;
    color: #fff;
}

/* Input de Nome + Seleção de Modo */
.setup-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 18px;
    margin-bottom: 24px;
}

.input-group label {
    display: block;
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: var(--text-muted);
    margin-bottom: 8px;
}

.player-input {
    width: 100%;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid var(--border-glass);
    border-radius: 14px;
    padding: 14px 16px;
    color: #fff;
    font-size: 1rem;
    font-family: 'Inter', sans-serif;
    outline: none;
    transition: border-color 0.25s, box-shadow 0.25s;
}

.player-input:focus {
    border-color: var(--accent-secondary);
    box-shadow: 0 0 0 3px var(--accent-glow);
}

.modes-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
}

.mode-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--border-glass);
    border-radius: 16px;
    padding: 16px 14px;
    cursor: pointer;
    transition: all 0.25s ease;
    text-align: left;
    position: relative;
}

.mode-card:hover {
    background: rgba(255, 255, 255, 0.06);
    transform: translateY(-2px);
}

.mode-card.selected {
    background: rgba(255, 255, 255, 0.07);
    border-color: var(--accent);
    box-shadow: 0 8px 24px -6px var(--accent-glow);
}

.mode-icon {
    font-size: 1.5rem;
    margin-bottom: 8px;
    display: block;
}

.mode-card h3 {
    font-size: 0.95rem;
    font-weight: 800;
    margin-bottom: 4px;
    color: #fff;
}

.mode-card p {
    font-size: 0.78rem;
    color: var(--text-muted);
    line-height: 1.4;
}

.btn-primary {
    width: 100%;
    background: linear-gradient(135deg, var(--accent), var(--accent-secondary));
    color: #fff;
    border: none;
    padding: 17px 32px;
    font-size: 1.05rem;
    font-weight: 800;
    font-family: 'Montserrat', sans-serif;
    border-radius: 16px;
    cursor: pointer;
    box-shadow: 0 10px 28px var(--accent-glow);
    transition: all 0.25s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    letter-spacing: 0.5px;
}

.btn-primary:hover {
    transform: translateY(-2px);
    filter: brightness(1.08);
    box-shadow: 0 14px 34px var(--accent-glow);
}

/* TELA DO QUIZ */
.quiz-screen { display: none; }

.top-hud {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px;
    border-bottom: 1px solid var(--border-glass);
    background: rgba(0, 0, 0, 0.3);
    flex-wrap: wrap;
    gap: 10px;
}

.hud-left, .hud-right {
    display: flex;
    align-items: center;
    gap: 14px;
}

.hud-pill {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.85rem;
    font-weight: 700;
    background: rgba(255,255,255,0.04);
    padding: 6px 12px;
    border-radius: 10px;
    border: 1px solid var(--border-glass);
}

.lives-display {
    letter-spacing: 2px;
    font-size: 0.95rem;
}

.combo-badge {
    background: rgba(245, 158, 11, 0.15);
    color: var(--gold);
    border: 1px solid rgba(245, 158, 11, 0.35);
    padding: 5px 12px;
    border-radius: 99px;
    font-size: 0.78rem;
    font-weight: 800;
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.combo-badge.pulse { transform: scale(1.22); }

.progress-track {
    width: 100%;
    height: 5px;
    background: rgba(255, 255, 255, 0.06);
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--accent), var(--accent-secondary));
    width: 0%;
    transition: width 0.45s cubic-bezier(0.4, 0, 0.2, 1);
}

.question-content { padding: 24px; }

.media-wrapper {
    position: relative;
    width: 100%;
    height: 225px;
    border-radius: 18px;
    overflow: hidden;
    margin-bottom: 20px;
    border: 1px solid var(--border-glass);
    background: #09090d;
}

.media-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 0.4s ease, transform 0.6s ease;
}

.category-pill {
    position: absolute;
    top: 14px;
    left: 14px;
    background: rgba(7, 7, 10, 0.82);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: #fff;
    font-size: 0.72rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 6px 12px;
    border-radius: 10px;
}

.timer-pill {
    position: absolute;
    top: 14px;
    right: 14px;
    background: rgba(7, 7, 10, 0.85);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: #fff;
    font-size: 0.82rem;
    font-weight: 800;
    padding: 6px 12px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 5px;
}

.timer-pill.warning {
    color: var(--error);
    border-color: var(--error);
    animation: shake 0.4s infinite;
}

.question-title {
    font-size: 1.22rem;
    font-weight: 700;
    line-height: 1.48;
    margin-bottom: 20px;
    color: #fff;
}

.options-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
}

.option-card {
    background: rgba(255, 255, 255, 0.035);
    border: 1px solid var(--border-glass);
    border-radius: 15px;
    padding: 15px 18px;
    color: var(--text-main);
    font-size: 0.98rem;
    font-weight: 500;
    text-align: left;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 14px;
    transition: all 0.2s ease;
}

.option-card:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.08);
    border-color: var(--accent-secondary);
    transform: translateX(5px);
}

.option-card.eliminated {
    opacity: 0.25;
    pointer-events: none;
    text-decoration: line-through;
}

.option-letter {
    width: 32px;
    height: 32px;
    border-radius: 9px;
    background: rgba(255, 255, 255, 0.07);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 0.85rem;
    font-family: 'Montserrat', sans-serif;
    flex-shrink: 0;
    transition: background 0.2s, color 0.2s;
}

.option-card:hover:not(:disabled) .option-letter {
    background: var(--accent);
    color: #fff;
}

.option-card.correct {
    background: rgba(16, 185, 129, 0.18);
    border-color: var(--success);
    box-shadow: 0 0 22px var(--success-glow);
}

.option-card.correct .option-letter {
    background: var(--success);
    color: #fff;
}

.option-card.wrong {
    background: rgba(239, 68, 68, 0.18);
    border-color: var(--error);
    box-shadow: 0 0 22px var(--error-glow);
    animation: shake 0.35s ease;
}

.option-card.wrong .option-letter {
    background: var(--error);
    color: #fff;
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-6px); }
    75% { transform: translateX(6px); }
}

/* Explicação Técnica */
.feedback-box {
    margin-top: 18px;
    padding: 16px 18px;
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.045);
    border-left: 4px solid var(--accent);
    display: none;
    animation: slideDown 0.3s ease;
}

@keyframes slideDown {
    from { opacity: 0; transform: translateY(-8px); }
    to { opacity: 1; transform: translateY(0); }
}

.feedback-box h4 {
    font-size: 0.92rem;
    margin-bottom: 4px;
    color: #fff;
}

.feedback-box p {
    font-size: 0.88rem;
    color: var(--text-muted);
    line-height: 1.55;
}

.quiz-actions {
    margin-top: 22px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
}

.lifelines {
    display: flex;
    gap: 8px;
}

.lifeline-btn {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid var(--border-glass);
    color: var(--text-main);
    padding: 10px 14px;
    border-radius: 12px;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 6px;
}

.lifeline-btn:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.1);
    border-color: var(--accent-secondary);
}

.lifeline-btn:disabled {
    opacity: 0.35;
    cursor: not-allowed;
}

.next-btn {
    background: linear-gradient(135deg, var(--accent), var(--accent-secondary));
    color: #fff;
    border: none;
    padding: 13px 26px;
    border-radius: 12px;
    font-weight: 800;
    font-family: 'Montserrat', sans-serif;
    cursor: pointer;
    display: none;
    box-shadow: 0 6px 22px var(--accent-glow);
    transition: transform 0.2s;
    margin-left: auto;
}

.next-btn:hover { transform: translateY(-2px); }

/* TELA DE RESULTADOS & CERTIFICADO */
.result-screen {
    display: none;
    padding: 32px 28px;
    text-align: center;
}

.certificate-card {
    background: linear-gradient(145deg, #16161e, #0d0d12);
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 22px;
    padding: 28px 22px;
    margin-bottom: 24px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 20px 45px rgba(0,0,0,0.65);
}

.certificate-card::before {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--accent), var(--gold), var(--accent-secondary));
}

.cert-header {
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    color: var(--gold);
    font-weight: 800;
    margin-bottom: 8px;
}

.cert-player {
    font-size: 1.65rem;
    font-weight: 900;
    color: #fff;
    margin-bottom: 14px;
}

.belt-award {
    width: 100%;
    max-width: 340px;
    height: 36px;
    margin: 0 auto 18px;
    border-radius: 6px;
    position: relative;
    box-shadow: 0 10px 25px rgba(0,0,0,0.65);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 18px;
    border: 1px solid rgba(255,255,255,0.12);
}

.belt-tip {
    width: 72px;
    height: 100%;
    background: #09090b;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 0 6px;
}

.stripe {
    width: 5px;
    height: 100%;
    background: #fff;
}

.result-rank-title {
    font-size: 1.55rem;
    font-weight: 900;
    margin-bottom: 6px;
    color: #fff;
}

.result-subtitle {
    color: var(--text-muted);
    font-size: 0.92rem;
    max-width: 500px;
    margin: 0 auto 22px;
    line-height: 1.5;
}

.score-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
}

.score-card {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid var(--border-glass);
    padding: 14px 8px;
    border-radius: 14px;
}

.score-card span {
    display: block;
    font-size: 0.7rem;
    color: var(--text-muted);
    margin-bottom: 4px;
    text-transform: uppercase;
    font-weight: 700;
}

.score-card strong {
    font-size: 1.3rem;
    font-family: 'Montserrat', sans-serif;
    color: #fff;
}

.result-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
}

.btn-secondary {
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid var(--border-glass);
    color: #fff;
    padding: 16px 20px;
    border-radius: 16px;
    font-weight: 700;
    font-family: 'Montserrat', sans-serif;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.btn-secondary:hover {
    background: rgba(255, 255, 255, 0.12);
    transform: translateY(-2px);
}

/* Toast de Notificação */
.toast {
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%) translateY(100px);
    background: #18181b;
    border: 1px solid var(--accent-secondary);
    color: #fff;
    padding: 12px 22px;
    border-radius: 99px;
    font-size: 0.88rem;
    font-weight: 600;
    box-shadow: 0 15px 35px rgba(0,0,0,0.7);
    z-index: 1000;
    transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.toast.show { transform: translateX(-50%) translateY(0); }

/* Responsividade Mobile */
@media (max-width: 600px) {
    .modes-grid { grid-template-columns: 1fr; }
    .result-buttons { grid-template-columns: 1fr; }
    .hero-overlay h1 { font-size: 1.55rem; }
    .media-wrapper { height: 185px; }
}