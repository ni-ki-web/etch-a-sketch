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
let baseHue = Math.floor(Math.random() * 360);

// generate a random RGB color
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return `rgb(${r}, ${g}, ${b})`;
}

// Get one colour shades
function getRandomShade() {
    const lightness = Math.floor(Math.random() * 40) + 40;
    return `hsl(${baseHue}, 80%, ${lightness}%)`;
}

function paintSquare(square) {
    switch (currentMode) {
        case 'eraser':
            square.style.backgroundColor = 'white';
            break;
        case 'black':
            square.style.backgroundColor = 'black';
            break;
        case 'random':
            square.style.backgroundColor = getRandomColor();
            break;
        case 'oneColor':
            square.style.backgroundColor = getRandomShade();
            break;
        case 'customColor':
            square.style.backgroundColor = customColor;
            break;
    }
}

document.addEventListener('mousedown', () => isDrawing = true);
document.addEventListener('mouseup', () => isDrawing = false);

// Create grid dynamically
function createGrid(size) {
    container.innerHTML = '';
    const totalSquares = size * size;
    const percent = 100 / size;

    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement('div');
        square.classList.add("grid-square");
        square.style.flexBasis = `${percent}%`;

        square.addEventListener('mousedown', () => paintSquare(square));
        square.addEventListener('mouseover', () => {
            if (isDrawing) paintSquare(square);
        });

        container.appendChild(square);
    }
}

// Button mode toggle : active style
function setActiveButton(activeBtn) {
    const colorButtons = [blackBtn, randomBtn, oneColorBtn, eraserBtn, clearBtn];
    colorButtons.forEach(btn => btn.classList.toggle('active', btn === activeBtn));
}

// Event listeners
blackBtn.addEventListener('click', () => {
    currentMode = 'black';
    setActiveButton(blackBtn);
});

randomBtn.addEventListener('click', () => {
    currentMode = 'random';
    setActiveButton(randomBtn);
});

oneColorBtn.addEventListener('click', () => {
    baseHue = Math.floor(Math.random() * 360);
    currentMode = 'oneColor';
    setActiveButton(oneColorBtn);
});

colorPicker.addEventListener('input', (e) => {
  customColor = e.target.value;
  currentMode = 'customColor';
  colorPicker.style.backgroundColor = customColor;
  setActiveButton(null);
});

eraserBtn.addEventListener('click', () => {
    currentMode = 'eraser';
    setActiveButton(eraserBtn);
});

clearBtn.addEventListener('click', () => {
    const squaresToClear = document.querySelectorAll('.grid-square');
    squaresToClear.forEach(square => {
        square.style.backgroundColor = 'white';
    });
    setActiveButton(clearBtn);
});

resetBtn.addEventListener('click', () => {
    let input = prompt("Enter a new grid size (max 100):");
    let size = parseInt(input);
    if(!size || size < 1 || size > 100) {
        size = 16;
    }
    createGrid(size);

    currentMode = 'black';
    setActiveButton(blackBtn);
    colorPicker.style.backgroundColor = '#000000';
});

// Initial 16 x 16 grid
createGrid(16);
setActiveButton(blackBtn);