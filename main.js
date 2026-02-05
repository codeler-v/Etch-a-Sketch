const container = document.getElementById('grid-container');
const btnDraw = document.getElementById('draw-btn');
const btnRainbow = document.getElementById('rainbow-btn');
const btnErase = document.getElementById('erase-btn');
const btnNewGrid = document.getElementById('setgrid-btn');
const btnClear = document.getElementById('clear-btn');

let currentMode = 'draw';
let isDrawing = false;

container.addEventListener('pointerdown', (e) => {
    isDrawing = true;
    handleDrawing(e);

    // if (e.target.hasPointerCapture(e.pointerId)) {
    //    e.target.releasePointerCapture(e.pointerId);
    // }
});

window.addEventListener('pointerup', () => {
    isDrawing = false;
});

container.addEventListener('pointermove', (e) => {
    if(!isDrawing) return;
    handleDrawing(e);
})

function handleDrawing(e){
    const target = document.elementFromPoint(e.clientX, e.clientY);

    if(!target || !target.classList ||!target.classList.contains('grid-box')) {
        return;
    }

    if(currentMode === 'draw'){
        let currentLightness = parseInt(target.dataset.ligthness);
        if(currentLightness > 0 ){
            currentLightness -= 10;
            target.dataset.ligthness = currentLightness.toString();
        }
        target.style.backgroundColor = `hsl(227, 69%, ${currentLightness}%)`;
    }else if(currentMode=== 'rainbow'){
        if (!target.dataset.hue) {
            target.dataset.hue = Math.floor(Math.random() * 360);
            target.dataset.lightness = "100";
        }
        let currentLightness = parseInt(target.dataset.lightness);

        if (currentLightness > 0) {
            currentLightness -= 10;
            target.dataset.lightness = currentLightness;
            // Use the SAVED hue, not a new random one
            target.style.backgroundColor = `hsl(${target.dataset.hue}, 100%, ${currentLightness}%)`;
        }
    }else if (currentMode ==='erase'){
        target.style.backgroundColor = 'white';
        target.dataset.ligthness = '100';
        target.dataset.hue = "";
    }
}

function setGridSize(size){
    container.innerHTML = '';
    const percentage = 100/size;
    for(let i=0; i< size * size; i++){
        const div = document.createElement('div');
        div.classList.add('grid-box');
        div.style.flex = `0 0 ${percentage}%`;
        div.style.height = `${percentage}%`;

        div.dataset.ligthness = '100';
        container.appendChild(div);
    };
};

function setActiveButton(activeBtn){
    [btnDraw, btnRainbow, btnErase].forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active')
}

btnDraw.addEventListener("click",() =>{
    currentMode = 'draw';
    setActiveButton(btnDraw);
});

btnRainbow.addEventListener("click",() =>{
    currentMode = 'rainbow';
    setActiveButton(btnRainbow);
});
btnErase.addEventListener("click",() =>{
    currentMode = 'erase';
    setActiveButton(btnErase);
});
btnClear.addEventListener("click",() =>{
    const allBoxes = document.querySelectorAll('.grid-box')
    allBoxes.forEach(box => {
        box.style.backgroundColor = 'white';
        box.dataset.ligthness = '100';
        box.dataset.hue = "";
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