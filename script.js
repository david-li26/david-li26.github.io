document.addEventListener("DOMContentLoaded", () => {
    let unitSelect = document.querySelector("#unit");
    let weightInput = document.querySelector("#weight");
    let heightInput = document.querySelector("#height");

    function update() {
        let unit = unitSelect.value;
        let weight = parseFloat(weightInput.value);
        let height = parseFloat(heightInput.value);

        if (isNaN(weight) || isNaN(height) || height === 0) {
            document.querySelector("#bmi-results-value").innerHTML = "Invalid Input";
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
        document.querySelector("#bmi-results-value").innerHTML = Math.round(bmi); // Round to one decimal place
    }

    weightInput.addEventListener("input", update);
    heightInput.addEventListener("input", update);
    unitSelect.addEventListener("change", update);
});