const gameArea = document.getElementById('gameArea');
const pacman = document.getElementById('pacman');
const scoreDisplay = document.getElementById('score');
const messageDisplay = document.getElementById('message');
let score = 0;
let enemies = [];

// ドットを配置する関数
function createDots() {
    for (let i = 0; i < 20; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.style.position = 'absolute';
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

// 敵を生成する関数
function createEnemy() {
    const enemy = document.createElement('div');
    enemy.className = 'enemy';
    enemy.style.position = 'absolute';
    enemy.style.left = Math.floor(Math.random() * (gameArea.clientWidth - 30)) + 'px';
    enemy.style.top = Math.floor(Math.random() * (gameArea.clientHeight - 30)) + 'px';
    gameArea.appendChild(enemy);
    enemies.push(enemy);
}

// 敵を動かす関数
function moveEnemies() {
    enemies.forEach((enemy) => {
        const enemyX = Math.random() < 0.5 ? -1 : 1;
        const enemyY = Math.random() < 0.5 ? -1 : 1;
        enemy.style.left = (enemy.offsetLeft + enemyX * 2) + 'px';
        enemy.style.top = (enemy.offsetTop + enemyY * 2) + 'px';

        // ゲームオーバーのチェック
        checkCollision(enemy);
    });
}

// ゲームオーバーのチェック関数
function checkCollision(enemy) {
    const pacmanRect = pacman.getBoundingClientRect();
    const enemyRect = enemy.getBoundingClientRect();

    if (
        pacmanRect.left < enemyRect.right &&
        pacmanRect.right > enemyRect.left &&
        pacmanRect.top < enemyRect.bottom &&
        pacmanRect.bottom > enemyRect.top
    ) {
        endGame('敵に捕まった！ゲームオーバー');
    }
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

// ゲームオーバー処理
function endGame(message) {
    messageDisplay.textContent = message;
    clearInterval(enemyMovementInterval);
}

// 敵の動きのインターバルを設定
const enemyMovementInterval = setInterval(() => {
    moveEnemies();
}, 100);

// ドットを生成し、敵を生成
createDots();
for (let i = 0; i < 5; i++) {
    createEnemy();
}
