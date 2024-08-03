const images = [
    { src: 'assets/hard/enma-ai.jpg', name: 'enma ai' },
    { src: 'assets/hard/haikyuu.jpg', name: 'haikyuu' },
    { src: 'assets/hard/mizutani.jpg', name: 'mizutani' },
    { src: 'assets/hard/panda.jpg', name: 'panda' },
    { src: 'assets/regular/chihiro.jpg', name: 'chihiro' },
    { src: 'assets/regular/kiki.jpg', name: 'kiki' },
    { src: 'assets/regular/violet2.jpg', name: 'violet evergarden' },
    { src: 'assets/regular/mumei.jpg', name: 'mumei' },
    { src: 'assets/easy/gojo.jpg', name: 'gojo' },
    { src: 'assets/easy/hori.jpg', name: 'hori' },
    { src: 'assets/easy/marin.jpg', name: 'marin' },
    { src: 'assets/easy/frieren.jpg', name: 'frieren' }
];

const timeSettings = [40, 40, 40, 30, 30, 15, 15, 15, 10, 10, 10, 10];
let currentImageIndex = 0;
let score = 0;
let timer;
let remainingTime;

const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const imageElement = document.getElementById('character-image');
const answerInput = document.getElementById('answer-input');
const submitButton = document.getElementById('submit-btn');
const playButton = document.getElementById('play-btn');
const gameContainer = document.getElementById('game-container');
const finalScoreContainer = document.getElementById('final-score');
const finalScoreValue = document.getElementById('final-score-value');

function startGame() {
    gameContainer.style.display = 'block';
    playButton.style.display = 'none';
    loadNextImage();
}

function loadNextImage() {
    if (currentImageIndex < images.length) {
        imageElement.src = images[currentImageIndex].src;
        answerInput.value = '';
        submitButton.disabled = false;
        remainingTime = timeSettings[currentImageIndex];
        startTimer();
    } else {
        endGame();
    }
}

function startTimer() {
    timerDisplay.textContent = `Tempo: ${remainingTime}s`;
    timer = setInterval(() => {
        remainingTime--;
        timerDisplay.textContent = `Tempo: ${remainingTime}s`;
        if (remainingTime <= 0) {
            clearInterval(timer);
            nextImage();
        }
    }, 1000);
}

function validateAnswer() {
    const userAnswer = answerInput.value.trim().toLowerCase();
    const correctAnswer = images[currentImageIndex].name.toLowerCase();
        if (userAnswer === correctAnswer) {
            const points = currentImageIndex < 3 ? 10 : currentImageIndex < 5 ? 10 : currentImageIndex < 8 ? 15 : 20;
            score += points;
            scoreDisplay.textContent = `Pontuação: ${score}`;
            nextImage();
        }else{
            answerInput.classList.add('shake', 'error')
            setTimeout(()=>{
            answerInput.classList.remove('shake', 'error');
            answerInput.value='';
        },300);
    }
}

function nextImage() {
    clearInterval(timer);
    currentImageIndex++;
    loadNextImage();
}

function endGame() {
    clearInterval(timer);
    gameContainer.style.display = 'none';
    finalScoreContainer.style.display = 'block';
    finalScoreValue.textContent = score;
}

submitButton.addEventListener('click', () => {
    if (answerInput.value.trim() !== '') {
        validateAnswer();
    } else {
        alert('Por favor, insira uma resposta antes de enviar!');
    }
});

answerInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        submitButton.click();
    }
});

playButton.addEventListener('click', startGame);
