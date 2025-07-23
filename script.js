const container = document.getElementById('container');
const blackBtn = document.getElementById('blackBtn');
const randomBtn = document.getElementById('randomBtn');
const resetBtn = document.getElementById('resetBtn');
const oneColorBtn = document.getElementById('oneColorBtn');
const colorPicker = document.getElementById('colorPicker');
const eraserBtn = document.getElementById('eraserBtn');
const clearBtn = document.getElementById('clearBtn');

let currentMode = 'black';
let customColor = '#000000';
let isDrawing = false;

// generate a random RGB color
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return `rgb(${r}, ${g}, ${b})`;
}

// Get one colour shades
let baseHue = Math.floor(Math.random() * 360);

function getRandomShade() {
    const lightness = Math.floor(Math.random() * 40) + 40;
    return `hsl(${baseHue}, 80%, ${lightness}%)`;
}

// track drawing state
container.addEventListener('mousedown', () => isDrawing = true);
container.addEventListener('mouseup', () => isDrawing = false);
container.addEventListener('mouseleave', () => isDrawing = false);

// Create grid dynamically
function createGrid(size) {
    container.innerHTML = '';
    const totalSquares = size * size;

    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement('div');
        square.classList.add("grid-square");

        const percent = 100 / size;
        square.style.flexBasis = `${percent}%`;

        square.addEventListener('mousedown', () => paintSquare(square));
        square.addEventListener('mouseover', () => {
            if (isDrawing) paintSquare(square);
        });

        container.appendChild(square);
    }
}

function paintSquare(square) {
    if (currentMode === 'eraser') {
        square.style.backgroundColor = 'white';
    } else if (currentMode === 'black') {
        square.style.backgroundColor = 'black';
    } else if (currentMode === 'random') {
        square.style.backgroundColor = getRandomColor();
    } else if (currentMode === 'oneColor') {
        square.style.backgroundColor = getRandomShade();
    } else if (currentMode === 'customColor') {
        square.style.backgroundColor = customColor;
    }
}

// Button event listeners
blackBtn.addEventListener('click', () => currentMode = 'black');

randomBtn.addEventListener('click', () => currentMode = 'random');

oneColorBtn.addEventListener('click', () => {
    baseHue = Math.floor(Math.random() * 360);
    currentMode = 'oneColor';
});

colorPicker.addEventListener('input', (e) => {
  customColor = e.target.value;
  currentMode = 'customColor';
});

eraserBtn.addEventListener('click', () => currentMode = 'eraser');

clearBtn.addEventListener('click', () => {
    const squaresToClear = document.querySelectorAll('.grid-square');
    squaresToClear.forEach(square => {
        square.style.backgroundColor = 'white';
    });
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