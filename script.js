const gameArea = document.getElementById('gameArea');
const pacman = document.getElementById('pacman');
const scoreDisplay = document.getElementById('score');
let score = 0;

// ドットを配置する関数
function createDots() {
    for (let i = 0; i < 20; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.style.position = 'absolute';
        dot.style.width = '8px';
        dot.style.height = '8px';
        dot.style.backgroundColor = 'white';
        dot.style.borderRadius = '50%';
        dot.style.left = Math.floor(Math.random() * (gameArea.clientWidth - 8)) + 'px';
        dot.style.top = Math.floor(Math.random() * (gameArea.clientHeight - 8)) + 'px';
        dot.onclick = () => eatDot(dot);
        gameArea.appendChild(dot);
    }
}

// ドットを食べる関数
function eatDot(dot) {
    dot.remove();
    score++;
    scoreDisplay.textContent = score;
}

// パックマンの動きを制御する関数
document.addEventListener('keydown', (event) => {
    const pacmanRect = pacman.getBoundingClientRect();
    const step = 5;

    switch (event.key) {
        case 'ArrowUp':
            if (pacmanRect.top > gameArea.offsetTop) {
                pacman.style.top = pacman.offsetTop - step + 'px';
            }
            break;
        case 'ArrowDown':
            if (pacmanRect.bottom < gameArea.offsetTop + gameArea.clientHeight) {
                pacman.style.top = pacman.offsetTop + step + 'px';
            }
            break;
        case 'ArrowLeft':
            if (pacmanRect.left > gameArea.offsetLeft) {
                pacman.style.left = pacman.offsetLeft - step + 'px';
            }
            break;
        case 'ArrowRight':
            if (pacmanRect.right < gameArea.offsetLeft + gameArea.clientWidth) {
                pacman.style.left = pacman.offsetLeft + step + 'px';
            }
            break;
    }
});

// ドットを生成
createDots();
