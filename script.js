// ======================
// DOM Elements
// ======================
const containerGrid = document.querySelector("#globalGrid");
const form = document.querySelector("#gridForm");
const gridSizeInput = document.getElementById("gridSize");


// ======================
// State variables
// ======================
let isDraw = false;


// ======================
// Event Listeners
// ======================
form.addEventListener('submit', handleFormSubmit);
containerGrid.addEventListener('mousedown', handleMouseDown);
containerGrid.addEventListener('mouseover', handleMouseOver);
containerGrid.addEventListener('mouseup', handleMouseUp);

function handleFormSubmit(event) {
    event.preventDefault();
    // Get the size of the squares
    const gridSize = parseInt(gridSizeInput.value);
    makeGrid(gridSize, containerGrid);
    gridSizeInput.value = gridSize;
}

function handleMouseDown (event) {
    // Some browsers might interpret mousedown as the start of a drag event, which can interfere with mouseover firing properly
    event.preventDefault();
    isDraw = true;
    // Color the first box as well. Without this line, the process of coloring will start from the next box
    fillSquare(event.target, randomColor(180));
}

function handleMouseOver (event) {
    // 1) to draw? 2) Not coloring the container grid itself, only boxes inside
    if (isDraw && event.target !== containerGrid) {
        fillSquare(event.target, randomColor(180));
    }
}

function handleMouseUp (event) {
    isDraw = false;
}


// ======================
// Helper Functions
// ======================

// Generate a random RGB color
function randomColor(maxColorValue) {
    // Use rgb(). So it's gonna be 3 random values
    // random from 0 to 180
    const randomValue = () => Math.floor(Math.random() * maxColorValue);
    return `rgb(${randomValue()},${randomValue()},${randomValue()})`;
}

// Fill a grid square with a color
function fillSquare (target, color) {
    target.style.backgroundColor = color;
}


// Create a grid of the specified size
function makeGrid(gridSize, containerElement) {
    // Clear the container
    containerElement.innerHTML = '';

    // Create the grid
    for (let i = 0; i < gridSize * gridSize; i++) {
        const div = document.createElement('div');
        containerElement.appendChild(div);
    }

    // Set CSS grid properties
    containerElement.style.gridTemplateColumns = `repeat(${gridSize}, min-content)`
}

// ======================
// Initial Setup
// ======================

// Default Grid Size (16x16)
makeGrid(16, containerGrid);