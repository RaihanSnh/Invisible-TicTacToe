const title = document.getElementById('title');
const board = document.getElementById('board');
const buttons = document.querySelectorAll('button');
const result = document.getElementById('result');
const currentTurn = document.getElementById('turn');
const rulesButton = document.getElementById('rules-btn');
let draw = false;
let turn = 'X';
let notTurn = 'O';
let gameOver = false;
let count = 0;
let isHard = false;

if(window.location.href.indexOf('hard') != -1){
    title.innerHTML += ' HARD MODE';
    title.classList.add('hard');
    isHard = true;
}

function checkWinner() {
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (buttons[a].classList.contains(turn) && buttons[b].classList.contains(turn) && buttons[c].classList.contains(turn)) {
            return true;
        }
    }
    return false;
}

function changeTurn() {
    turn = turn === 'X' ? 'O' : 'X';
    notTurn = notTurn === 'O' ? 'X' : 'O';
}

function showResult(x) {
    result.innerHTML = `${x} Wins!`;
    currentTurn.style.display = 'none';
    gameOver = true;
    document.getElementById('replay').style.display = 'block';
    showBlock(x);
}

function showDraw(x) {
    result.innerHTML = "It's a Draw!";
    currentTurn.style.display = 'none';
    gameOver = true;
    document.getElementById('replay').style.display = 'block';
    draw = true;
    showBlock(x);
}

function showBlock(x){
    buttons.forEach(button => {
        if(draw){
            button.classList.add('lose');
        }
        else if(button.classList.contains(x)){
            button.classList.add('win');
        }
        else if(button.classList.contains(turn) && !checkWinner()){
            button.classList.add('lose');
        }
        else if(button.classList.contains(notTurn) && checkWinner()){
            button.classList.add('lose');
        }

    });
}
function showRules(){
    Swal.fire({
        title: 'Rules',
        html: '<div class="swal-text">' +
            '<p>1. The game is played on a 3x3 board.</p>' +
            '<p>2. The goal is to be the first player to get three of their symbols in a row (horizontally, vertically, or diagonally).</p>' +
            '<p>3. Players take turns placing their symbols (X or O) on an empty square.</p>' +
            '<p>4. If a player tries to place their symbol on a square that has already been filled, the square will shake as a warning.</p>' +
            '<p>5. In Hard Mode, if a player tries to place their symbol on a square that has already been filled, their opponent will automatically win.</p>' +
            '<p>6. The game ends when one player gets three in a row, or when all squares are filled.</p>' +
            '</div>',
        footer: '<div style="text-align: center; margin-top: 20px;">' +
            'Have fun playing Invisible Tic Tac Toe! ' +
            '<a class="madeby" href="https://github.com/RaihanSnh" target="_blank">Made By RaihanSnh</a>' +
            '</div>',
        confirmButtonText: "OK",
        width: 600,
        padding: '1em',
        customClass: {
            confirmButton: 'btnswal',
        }
    });
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if(button.classList.contains('rules')){
            showRules();
        }
        else if(button.classList.contains('rules')){
            showRules();
        }
        else if(!button.classList.contains('rules')){
            if (!gameOver && !button.classList.contains('X') && !button.classList.contains('O')) {
                button.classList.add(turn);
                button.classList.add('btn_' + (isHard ? 'hard' : 'classic'));
                count++;
                if (checkWinner()) {
                    showResult(turn);
                } else if (count === 9) {
                    showDraw(turn);
                } else {
                    changeTurn();
                    currentTurn.innerHTML = `${turn} turn`;
                }
            }
            else if(!gameOver && window.location.href.indexOf('hard') !== -1){
                showResult(notTurn);
            }
            else if(!gameOver){
                // Swal.fire({
                //     title: 'Already clicked',
                //     confirmButtonText: 'Ok',
                //     customClass: {
                //         confirmButton: 'btnswal',
                //     }
                // });
            }
        }
    });
});