    const resultsElement = document.getElementById('results');

function updateBMR() {
    let formula = document.querySelector('#formula').value;
    let weight = parseFloat(document.getElementById('weight').value);
    let height = parseFloat(document.getElementById('height').value);
    let age = parseInt(document.getElementById('age').value);
    let gender = document.querySelector('#gender').value;

    if (isNaN(weight) || isNaN(height) || isNaN(age)) {
        resultsElement.textContent = 'Please enter valid numbers for age, height, and weight.';
        return;
    }

    let bmr;

    if (gender === 'Male' && formula === 'Harris-Benedict') {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else if (gender === 'Female' && formula === 'Harris-Benedict') {
        bmr = 655.1 + (9.563 * weight) + (1.85 * height) - (4.676 * age);
    } else if (gender === 'Male' && formula === 'Mifflin-St Jeor') {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else if (gender === 'Female' && formula === 'Mifflin-St Jeor') {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    } else {
        resultsElement.textContent = 'Unsupported formula or gender selection.';
        return;
    }

    resultsElement.textContent = bmr.toFixed(2) + ' kcal/day';
}

const h1 = document.querySelector('#menubar h1');
function updateMenubar() {
    if (window.innerWidth < 500) {
        h1.textContent = 'BMR Calculator';
    } else if (window.innerWidth > 500) {
        h1.textContent = 'Calcura BMR Calculator';
    }
}

updateMenubar();
window.addEventListener('resize', updateMenubar);


document.getElementById('height').addEventListener('input', updateBMR);
document.getElementById('weight').addEventListener('input', updateBMR);
document.getElementById('age').addEventListener('input', updateBMR);
document.querySelector('#gender').addEventListener('change', updateBMR);
document.querySelector('#formula').addEventListener('change', updateBMR);

const copyButton = document.getElementById('copy-button');
copyButton.addEventListener('click', () => {
    let formula = document.querySelector('#formula').value;
    const bmrValue = resultsElement.textContent;
    navigator.clipboard.writeText(`My BMR is: ${bmrValue}, calculated with the ${formula} Formula using the BMR Calculator on Calcura.`).then(() => {
        alert('BMR value copied to clipboard!');
    }).catch(err => {
        alert('Failed to copy BMR value: ' + err);
    })
});