let colora = document.querySelector(`#color-a`).value;
let colorb = document.querySelector(`#color-b`).value;
let deg = document.querySelector(`#deg_range`).value + 'deg';
let linearGradient;
const label = document.querySelector('#label-deg_range');
const degDisplay = label.querySelector('span');
const copyBtn = document.getElementById('copyBtn');
const randomBtn = document.getElementById('randomBtn');

function changeColor(choice){
    const input = document.querySelector(`#color-${choice}`);
    const newColor = input.value;
    const inputBlock = input.parentElement;
    inputBlock.style.background = newColor;
    if (choice === 'a') {
        colora = newColor;
    } else if (choice === 'b') {
        colorb = newColor;
    }
    const labelColor = document.querySelector(`#label-color-${choice}`);
    labelColor.innerText = newColor;
          // Changer la couleur du texte en fonction de la luminosité du background
    if (getBrightness(newColor) > 128) {
        labelColor.style.color = 'black'; // fond clair, texte noir
    } else {
        labelColor.style.color = 'white'; // fond sombre, texte blanc
    }
    changeLinear();
}
function changeDeg(){
    const input = document.querySelector('#deg_range');
    degDisplay.innerText = input.value + '°';
    deg = input.value + 'deg';
    changeLinear();
}

function changeLinear(){
    linearGradient = `linear-gradient(${deg}, ${colora}, ${colorb})`;
    document.querySelector('body').style.background = linearGradient;
}

function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}
function getBrightness(hexColor) {
    var r = parseInt(hexColor.substr(1, 2), 16);
    var g = parseInt(hexColor.substr(3, 2), 16);
    var b = parseInt(hexColor.substr(5, 2), 16);
    return (0.2126 * r + 0.7152 * g + 0.0722 * b);
  }
  
changeColor('a');
changeColor('b');

document.querySelector(`#color-a`).addEventListener("input", function() {
    changeColor('a');
});
document.querySelector(`#color-b`).addEventListener("input", function() {
    changeColor('b');
});
document.querySelector(`#deg_range`).addEventListener("input", function() {
    changeDeg();
});
copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(linearGradient);
    const toast = document.createElement('div');
    toast.classList = 'toast';
    toast.innerText = 'Copié !';
    document.querySelector('.toast__block').appendChild(toast);
    setTimeout(() => {
        document.querySelector('.toast__block').innerHTML = ""; 
    }, 700);
});
randomBtn.addEventListener("click", () => {
    document.querySelector(`#color-a`).value = getRandomColor();
    document.querySelector(`#color-b`).value = getRandomColor();
    changeColor('a');
    changeColor('b');
    const toast = document.createElement('div');
    toast.classList = 'toast';
    toast.innerText = '🎲';
    document.querySelector('.toast__block').appendChild(toast);
    setTimeout(() => {
        document.querySelector('.toast__block').innerHTML = ""; 
    }, 700);
})