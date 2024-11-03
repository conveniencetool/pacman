const gameArea = document.getElementById('gameArea');
const scoreDisplay = document.getElementById('score');
let score = 0;
let snake = [{ x: 10, y: 10 }]; // スネークの初期位置
let food = {};
let direction = { x: 0, y: 0 }; // 初期の移動方向
let gameInterval;

function init() {
    createFood();
    gameInterval = setInterval(gameLoop, 100); // ゲームループの間隔を設定
}

function createFood() {
    food.x = Math.floor(Math.random() * 20) * 20;
    food.y = Math.floor(Math.random() * 20) * 20;
    if (isFoodOnSnake()) {
        createFood(); // スネークの上に食べ物が出ないように再生成
    } else {
        drawFood();
    }
}

function isFoodOnSnake() {
    return snake.some(segment => segment.x === food.x && segment.y === food.y);
}

function drawFood() {
    const foodElement = document.createElement('div');
    foodElement.className = 'food';
    foodElement.style.width = '20px';
    foodElement.style.height = '20px';
    foodElement.style.left = food.x + 'px';
    foodElement.style.top = food.y + 'px';
    gameArea.appendChild(foodElement);
}

function gameLoop() {
    moveSnake();
    if (checkCollision()) {
        endGame();
        return;
    }
    if (checkFoodCollision()) {
        score++;
        scoreDisplay.textContent = score;
        createFood();
    } else {
        removeTail(); // スネークの尻尾を消す
    }
    drawSnake();
}

function moveSnake() {
    const newHead = {
        x: snake[0].x + direction.x * 20,
        y: snake[0].y + direction.y * 20,
    };
    snake.unshift(newHead); // 新しい頭を追加
}

function checkCollision() {
    const head = snake[0];
    // 壁との衝突
    if (head.x < 0 || head.x >= 400 || head.y < 0 || head.y >= 400) {
        return true;
    }
    // 自分自身との衝突
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

function checkFoodCollision() {
    const head = snake[0];
    return head.x === food.x && head.y === food.y;
}

function removeTail() {
    snake.pop(); // スネークの尻尾を取り除く
}

function drawSnake() {
    gameArea.innerHTML = ''; // スネークを描く前に全ての要素を消去
    snake.forEach(segment => {
        const segmentElement = document.createElement('div');
        segmentElement.className = 'snake';
        segmentElement.style.width = '20px';
        segmentElement.style.height = '20px';
        segmentElement.style.left = segment.x + 'px';
        segmentElement.style.top = segment.y + 'px';
        gameArea.appendChild(segmentElement);
    });
    drawFood(); // 食べ物を再描画
}

function endGame() {
    clearInterval(gameInterval);
    alert(`ゲームオーバー！スコア: ${score}`);
    resetGame();
}

function resetGame() {
    score = 0;
    scoreDisplay.textContent = score;
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    gameArea.innerHTML = '';
    createFood();
    init();
}

// キーボード操作
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
});

// ゲーム開始
init();
