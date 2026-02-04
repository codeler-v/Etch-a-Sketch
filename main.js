const container = document.getElementById('grid-container');
const btnDraw = document.getElementById('draw-btn');
const btnRainbow = document.getElementById('rainbow-btn');
const btnErase = document.getElementById('erase-btn');
const btnNewGrid = document.getElementById('setgrid-btn');
const btnClear = document.getElementById('clear-btn');
let currentMode = 'draw';
let isDrawing = false;

window.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    isDrawing = true;
});

window.addEventListener('pointerup', (e) => {
    e.preventDefault();
    isDrawing = false;
});

function setGridSize(size){
    container.innerHTML = '';
    const percentage = 100/size;
    for(let i=0; i< size * size; i++){
        const div = document.createElement('div');
        div.classList.add('grid-box');
        div.style.flex = `0 0 ${percentage}%`;
        div.style.height = `${percentage}%`;
        div.dataset.ligthness = '100';
        div.addEventListener('pointerenter', () => {
            if(isDrawing){
                if(currentMode === 'draw'){
                    let currentLightness = parseInt(div.dataset.ligthness);
                    if(currentLightness > 0 ){
                        currentLightness -= 5;
                        div.dataset.ligthness = currentLightness.toString();
                    }
                    div.style.backgroundColor = `hsl(227, 69%, ${currentLightness}%)`;
                }else if(currentMode=== 'rainbow'){
                    if (!div.dataset.hue) {
                        div.dataset.hue = Math.floor(Math.random() * 360);
                        div.dataset.lightness = "100";
                    }
                    let currentLightness = parseInt(div.dataset.lightness);

                    if (currentLightness > 0) {
                        currentLightness -= 5;
                        div.dataset.lightness = currentLightness;
                        // Use the SAVED hue, not a new random one
                        div.style.backgroundColor = `hsl(${div.dataset.hue}, 100%, ${currentLightness}%)`;
                    }
                }else if (currentMode ==='erase'){
                    div.style.backgroundColor = 'white';
                    div.dataset.ligthness = '100';
                }
            }
        });
        container.appendChild(div);
    };
};

btnDraw.addEventListener("click",() =>{
    currentMode = 'draw';
    btnDraw.classList.add('active');
    btnErase.classList.remove('active');
    btnRainbow.classList.remove('active');
});

btnRainbow.addEventListener("click",() =>{
    currentMode = 'rainbow';
    btnRainbow.classList.add('active')
    btnDraw.classList.remove('active');
    btnErase.classList.remove('active');
});
btnErase.addEventListener("click",() =>{
    currentMode = 'erase';
    btnErase.classList.add('active');
    btnDraw.classList.remove('active');
    btnRainbow.classList.remove('active');
});
btnClear.addEventListener("click",() =>{
    const allBoxes = document.querySelectorAll('.grid-box')
    allBoxes.forEach(box => {
        box.style.backgroundColor = 'white';
        box.dataset.ligthness = '100';
    });
});
btnNewGrid.addEventListener("click", () =>{
    let userInput = prompt("Enter number of squares per side (max 100):");
    let newSize = parseInt(userInput);

    if (!isNaN(newSize) && newSize > 0 && newSize <= 100) {
        setGridSize(newSize);
    } else {
        alert("Please enter a valid number between 1 and 100.");
    }
});

setGridSize(16);