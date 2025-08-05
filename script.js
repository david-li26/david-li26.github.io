document.addEventListener("DOMContentLoaded", () => {
    let unitSelect = document.querySelector("#unit");
    let weightInput = document.querySelector("#weight");
    let heightInput = document.querySelector("#height");
    let bmiResultsValue = document.querySelector("#bmi-results-value");
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

        if (isNaN(weight) || isNaN(height) || height === 0) {
            document.querySelector("#bmi-results-value").innerHTML = "Invalid Input";
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
        bmiResultsValue.textContent = Math.round(bmi); // Round to one decimal place
        bmiResultsValue.style.fontSize = 110 / String(Math.round(bmi)).length + "px";
    }

    weightInput.addEventListener("input", update);
    heightInput.addEventListener("input", update);
    unitSelect.addEventListener("change", update);
});