const container = document.getElementById('container');
const blackBtn = document.getElementById('blackBtn');
const randomBtn = document.getElementById('randomBtn');
const resetBtn = document.getElementById('resetBtn');
const oneColorBtn = document.getElementById('oneColorBtn');

let currentMode = 'black';

// generate a random RGB color
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return `rgb(${r}, ${g}, ${b})`;
}

let baseHue = Math.floor(Math.random() * 360);

function getRandomShade() {
    const lightness = Math.floor(Math.random() * 40) + 40;
    return `hsl(${baseHue}, 80%, ${lightness}%)`;
}

// Create grid dynamically
function createGrid(size) {
    container.innerHTML = '';

    const totalSquares = size * size;
    const squareSize = 960 / size;

    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement('div');
        square.classList.add("grid-square");
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;

        square.addEventListener('mouseover', () => {
            if (square.style.backgroundColor && square.style.backgroundColor !== 'white') return;

            if (currentMode === 'black') {
                square.style.backgroundColor = 'black';
            } else if (currentMode === 'random') {
                square.style.backgroundColor = getRandomColor();
            } else if (currentMode === 'oneColor') {
                square.style.backgroundColor = getRandomShade();
            }
        });

        container.appendChild(square);
    }
}

// Button event listeners
blackBtn.addEventListener('click', () => currentMode = 'black');
randomBtn.addEventListener('click', () => currentMode = 'random');
oneColorBtn.addEventListener('click', () => {
    baseHue = Math.floor(Math.random() * 360);
    currentMode = 'oneColor';
});

resetBtn.addEventListener('click', () => {
    let input = prompt("Enter a new grid size (max 100):");
    
    if (input === null || input.trim() === "") {
        createGrid(16);
        return;
    }

    let newSize = parseInt(input);

    while (isNaN(newSize) || newSize > 100 || newSize <=0 ) {
        input = prompt("Invalis input. Enter a number between 1 and 100 (or leave blank for default):");

        if (input === null || input.trim() === "") {
        createGrid(16);
        return; 
    }

    newSize = parseInt(input);
    }

    createGrid(newSize);
})

// Initial 16 x 16 grid
createGrid(16);