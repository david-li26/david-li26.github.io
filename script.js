document.addEventListener("DOMContentLoaded", () => {
    let unitSelect = document.querySelector("#unit");
    let weightInput = document.querySelector("#weight");
    let heightInput = document.querySelector("#height");
    let bmiResultsValue = document.querySelector("#bmi-results-value");
    let weightIdentifier = document.querySelector("#weight-identifier");
    unitSelect.addEventListener("change", () => {
        if (unitSelect.value === 'metric') {
            weightInput.placeholder = "Weight (kg)";
            heightInput.placeholder = "Height (cm)";
        } else if (unitSelect.value === 'imperial') {
            weightInput.placeholder = "Weight (lbs)";
            heightInput.placeholder = "Height (in)";
        }
    });

    function update() {
        let unit = unitSelect.value;
        let weight = parseFloat(weightInput.value);
        let height = parseFloat(heightInput.value);
        let roundedBmi;

        if (isNaN(weight) || isNaN(height) || height === 0) {
            bmiResultsValue.textContent = "Invalid Input";
            bmiResultsValue.style.fontSize = "21px";
            return;
        }

        let bmi;
        if (unit === 'metric') {
            height = height / 100; // convert cm to meters
            bmi = weight / (height * height);
        } else if (unit === 'imperial') {
            weight = weight * 0.453592; // Convert pounds to kg
            height = height * 0.0254; // Convert inches to meters
            bmi = weight / (height * height);
        }
        roundedBmi = Math.round(bmi * 10) / 10; // Round to one decimal place
        bmiResultsValue.textContent = roundedBmi;
        bmiResultsValue.style.fontSize = 110 / String(roundedBmi).length + "px";
        if (bmi < 18.5) {
            weightIdentifier.style.color = "#c38902ff";
            weightIdentifier.textContent = "underweight.";
        } else if (bmi >= 18.5 && bmi < 24.9) {
            weightIdentifier.style.color = "#00a600";
            weightIdentifier.textContent = "healthy.";
        } else if (bmi >= 25 && bmi < 29.9) {
            weightIdentifier.style.color = "#a70101ff";
            weightIdentifier.textContent = "overweight.";
        } else if (bmi >= 30) {
            weightIdentifier.style.color = "#ff0000ff";
            weightIdentifier.textContent = "obese.";
        }
    }

    function changeUnit() {
        update();
        if (unitSelect.value === 'metric') {
            weightInput.value = '';
            heightInput.value = '';
            bmiResultsValue.textContent = "Waiting for Input";
            weightIdentifier.textContent = "...";
        } else if (unitSelect.value === 'imperial') {
            weightInput.value = '';
            heightInput.value = '';
            bmiResultsValue.textContent = "Waiting for Input";
            weightIdentifier.textContent = "...";
        }
    }

    weightInput.addEventListener("input", update);
    heightInput.addEventListener("input", update);
    unitSelect.addEventListener("change", changeUnit);

    let disclaimer = document.querySelector("#disclaimer");
    setTimeout(() => {
        disclaimer.style.transform = "translateY(0px)";
    }, 200);
    setTimeout(() => {
        disclaimer.style.transform = "translateY(-95px)";
    }, 5000);
    disclaimer.addEventListener("click", () => {
         disclaimer.style.transform = "translateY(-95px)";
    })
});