const localStorage = window.localStorage;
let tabStatus = 'bmr';
let usingSchofield = false;
let toggleSettingsValue = false;
const settingsBlock = document.getElementById('globalsettings');
const wrap = document.getElementById('wrap');
const settingsLogo = document.getElementById('settings-logo');
const bmrWeight = document.getElementById('bmr-weight');
const bmrHeight = document.getElementById('bmr-height');
const bmrAge = document.getElementById('bmr-age');
const bmrResults = document.getElementById('results-text');
const formulaElement = document.getElementById('bmr-formula');
const unitElement = document.getElementById('unit-setting');
const mUnitElement = document.getElementById('measure-unit-setting');
const genderElement = document.getElementById('bmr-gender');
const disclaimer = document.getElementById('disclaimer')

function reset(all) {
    bmrHeight.value = '';
    bmrWeight.value = '';
    bmrResults.textContent = 'VAR unit/day';
    bmrWeight.style.border = '';
    bmrAge.style.border = '';
    bmrHeight.style.border = '';
    all ? bmrAge.value == '' : null;
}

function showBanner() {
    setTimeout(() => {
        disclaimer.classList.add('show');
    }, 1000);
    setTimeout(() => {
        disclaimer.classList.remove('show');
    }, 5000);
};
disclaimer.addEventListener("click", () => {
    disclaimer.classList.remove('show');
});

if (window.innerWidth < 500) {
    showBanner()
}

function updateSettings() {
    toggleSettingsValue = !toggleSettingsValue
    settingsBlock.classList.toggle('active', toggleSettingsValue)
    wrap.style.filter = toggleSettingsValue ? 'blur(1px)':'blur(0px)'
    settingsLogo.classList.add('rotate')
    settingsLogo.addEventListener('transitionend', () => {
        settingsLogo.style.transition = 'none'
        settingsLogo.classList.remove('rotate');
        setTimeout(() => {
            settingsLogo.style.transition = 'transform 0.4s ease-out'
        }, 20)
    }, { once: true });
};

// Rewriting the code to be concise and reusable
const height_conditional_object = document.getElementById('height-conditional')

function validateInput() {
    let failCount = 0;

    function validateMetric() {
        if (usingSchofield) {
            if (bmrWeight.value < 20 || bmrWeight.value > 120) {
                bmrWeight.style.border = 'solid 2.5px #da0000';
                failCount++;
            } else {
                bmrWeight.style.border = '';
            }
        } else {
            if (bmrWeight.value < 5 || bmrWeight.value > 120) {
                bmrWeight.style.border = 'solid 2.5px #da0000';
                failCount++;
            } else {
                bmrWeight.style.border = '';
            }
        }

        if (bmrHeight.value < 50 || bmrHeight.value > 240) {
            if (!height_conditional_object.classList.contains('disabled-add-caution')) {
                bmrHeight.style.border = 'solid 2.5px #da0000';
                failCount++;
            } else {
                bmrHeight.style.border = '';
            }
        } else {
            bmrHeight.style.border = '';
        };
    };

    function validateImperial() {
        if (usingSchofield) {
            if (bmrWeight.value < 44.1 || bmrWeight.value > 264.6) {
                bmrWeight.style.border = 'solid 2.5px #da0000';
                failCount++;
            } else {
                bmrWeight.style.border = '';
            }
        } else {
            if (bmrWeight.value < 44.1 || bmrWeight.value > 264.6) {
                bmrWeight.style.border = 'solid 2.5px #da0000';
                failCount++;
            } else {
                bmrWeight.style.border = '';
            }
        }

        if (bmrHeight.value < 19.7 || bmrHeight.value > 94.5) {
            if (!height_conditional_object.classList.contains('disabled-add-caution')) {
                bmrHeight.style.border = 'solid 2.5px #da0000';
                failCount++;
            } else {
                bmrHeight.style.border = '';
            }
        } else {
            bmrHeight.style.border = '';
        };
    };
    if (usingSchofield) {
        if (bmrAge.value < 3 || bmrAge.value > 60) {
            bmrAge.style.border = 'solid 2.5px #da0000';
            failCount++;
        } else {
            bmrAge.style.border = '';
        }
    } else {
        if (bmrAge.value < 18 || bmrAge.value > 80) {
            bmrAge.style.border = 'solid 2.5px #da0000';
            failCount++;
        } else {
        bmrAge.style.border = '';
        }
    };

    mUnitElement.value === 'metric' ? validateMetric() : validateImperial();
    return failCount === 0;
};

function modifySchofield(boolean) {
    height_conditional_object.classList.toggle('disabled-add-caution', boolean);
    bmrHeight.disabled = boolean;
};

function calculateBMR() {
    let weight = mUnitElement.value === 'metric' ? bmrWeight.value : Number((bmrWeight.value / 2.2046226218).toFixed(2));
    let height = mUnitElement.value === 'metric' ? bmrHeight.value : Number((bmrHeight.value * 2.54).toFixed(2));
    let bmr;
    if (!validateInput()) return null;
    let formula = document.getElementById('bmr-formula').value;
    let gender = document.getElementById('bmr-gender').value;
    if (usingSchofield !== true) {
        if (formula == 'mifflinstjeor') {
            bmr = gender === 'male' ? (10 * weight) + (6.25 * height) - (5 * bmrAge.value) + 5 : (10 * weight) + (6.25 * height) - (5 * bmrAge.value) - 161;
        } else if (formula == 'harrisbenedict') {
            bmr = gender === 'male' ? 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * bmrAge.value) : 655.1 + (9.563 * weight) + (1.85 * height) - (4.676 * bmrAge.value);
        } else throw new Error('Formula is invalid. Got: ' + formula)
    } else {
        let age = bmrAge.value;
        let weight = bmrWeight.value;
        if (gender == 'male') {
            if (age >= 3 && age < 10) {
                bmr = 22.706 * weight + 504.3;
            } else if (age >= 10 && age < 18) {
                bmr = 17.686 * weight + 658.2;
            } else if (age >= 18 && age < 30) {
                bmr = 15.057 * weight + 692.2;
            } else if (age >= 30 && age < 60) {
                bmr = 11.472 * weight + 873.1;
            } else if (age >= 60) {
                bmr = 11.711 * weight + 587.7;
            };
        } else {
            if (age >= 3 && age < 10) {
                bmr = 20.315 * weight + 485.9;
            } else if (age >= 10 && age < 18) {
                bmr = 13.384 * weight + 692.6;
            } else if (age >= 18 && age < 30) {
                bmr = 14.818 * weight + 486.6;
            } else if (age >= 30 && age < 60) {
                bmr = 8.126 * weight + 845.6;
            } else if (age >= 60) {
                bmr = 9.082 * weight + 658.5;
            }
        }
    };
    return unitElement.value == 'kcal' ? bmr : Number((bmr * 4.184).toFixed(2));
};

function calculateTDEE() {
    let energy = document.getElementById('tdee-energy').value;
    let multipliers = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        very: 1.725,
        extra: 1.9
    };
    let multiplier = multipliers[energy] || 1.2;
    return calculateBMR() * multiplier;
};

const gainWeightBMR = document.getElementById('bmr-gw-text')
const loseWeightBMR = document.getElementById('bmr-lw-text')
let percentdisplay = document.getElementById('suggestions-percentage-bmr')

function changeBMRSuggestions(bmr) {
    if (bmr === null) {
        bmrResults.textContent = 'Something looks wrong! Check your details.'
    }
    let unit = document.getElementById('unit-setting').value;
    let percentage = document.getElementById('bmr-offset-range-suggestions').value / 100;
    percentdisplay.textContent = percentage * 100 + '%';
    gainWeightBMR.textContent = (bmr + bmr * percentage).toFixed(2) + ' kcal/day';
    loseWeightBMR.textContent = (bmr - bmr * percentage).toFixed(2) + ' kcal/day';
}

document.getElementById('bmr-offset-range-suggestions').addEventListener('input', () => {
    if (tabStatus == 'bmr') {
        changeBMRSuggestions(calculateBMR());
    } else if (tabStatus == 'rmr') {
        changeBMRSuggestions(calculateRMR());
    } else if (tabStatus == 'tdee') {
        changeBMRSuggestions(calculateTDEE());  
    };
})


function updateBMR() {
    let bmr = calculateBMR();
    let rmr = calculateRMR();
    let tdee = calculateTDEE();
    let unit = document.getElementById('unit-setting').value;
    if (bmr === null) {
        bmrResults.textContent = 'Something looks wrong! Check your details.'
    } else if (tabStatus == 'bmr') init(); else if (tabStatus == 'rmr') initRMR(); else if (tabStatus == 'tdee') initTDEE();
    function init() {
        bmrResults.textContent = unitElement.value == 'kcal' ? bmr.toFixed(2) + ' kcal/day' : bmr.toFixed(2) + ' kJ/day';
        changeBMRSuggestions(bmr)
    }
    function initRMR() {
        bmrResults.textContent = unitElement.value == 'kcal' ? bmr.toFixed(2) + ' kcal/day' : bmr.toFixed(2) + ' kJ/day';
        changeBMRSuggestions(rmr)
    }
    function initTDEE() {
        bmrResults.textContent = unitElement.value == 'kcal' ? bmr.toFixed(2) + ' kcal/day' : bmr.toFixed(2) + ' kJ/day';
        changeBMRSuggestions(tdee)
    }
}

function calculateRMR() {
    return calculateBMR() * 11 / 10
}

bmrWeight.addEventListener('input', updateBMR)
bmrHeight.addEventListener('input', updateBMR)
bmrAge.addEventListener('input', updateBMR)
unitElement.addEventListener('change', updateBMR)
genderElement.addEventListener('change', updateBMR)
formulaElement.addEventListener('change', updateBMR)

let settings;

if (localStorage.getItem('settings')) {
    settings = JSON.parse(localStorage.getItem('settings'));
} else {
    settings = { energy_unit: "kcal", measurement_unit: "metric" };
    localStorage.setItem('settings', JSON.stringify(settings));
}


function changeUnit() {
    if (settings.energy_unit == 'kcal') {
        unitElement.value = 'kcal';
        //unitElement.dispatchEvent(new Event('change'))
    } else if (settings.energy_unit == 'kj') {
        unitElement.value = 'kj';
        //unitElement.dispatchEvent(new Event('change'))
    } else {
        settings.energy_unit = "kcal";
        localStorage.setItem('settings', JSON.stringify(settings))
    };
    if (settings.measurement_unit == 'metric') {
        mUnitElement.value = 'metric';
        //unitElement.dispatchEvent(new Event('change'))
    } else if (settings.measurement_unit == 'imperial') {
        mUnitElement.value = 'imperial';
        //unitElement.dispatchEvent(new Event('change'))
    } else {
        settings.measurement_unit = "metric";
        localStorage.setItem('settings', JSON.stringify(settings))
    };
    if (mUnitElement.value === 'metric') {
        bmrWeight.placeholder = 'Weight 20kg – 120kg';
        bmrHeight.placeholder = 'Height 50cm – 240cm';
    } else {
        bmrWeight.placeholder = 'Weight 44.1 lbs – 264.6 lbs';
        bmrHeight.placeholder = 'Height 19.7 in – 94.5 in';
    };
}

changeUnit()

unitElement.addEventListener('change', () => {
    settings.energy_unit = unitElement.value
    const newjson = JSON.stringify(settings)
    localStorage.setItem('settings', newjson)
    changeUnit()
})

mUnitElement.addEventListener('change', () => {
    settings.measurement_unit = mUnitElement.value
    const newjson = JSON.stringify(settings)
    localStorage.setItem('settings', newjson)
    if (mUnitElement.value === 'metric') {
        bmrWeight.placeholder = 'Weight 20kg – 120kg';
        bmrHeight.placeholder = 'Height 50cm – 240cm';
    } else {
        bmrWeight.placeholder = 'Weight 44.1 lbs – 264.6 lbs';
        bmrHeight.placeholder = 'Height 19.7 in – 94.5 in';
    }
    reset(false)
    changeUnit()
})


const bmrObjects = document.getElementsByClassName('bmr');
const rmrObjects = document.getElementsByClassName('rmr');
const tdeeObjects = document.getElementsByClassName('tdee');
const bmrTab = document.getElementById('bmrTab');
const rmrTab = document.getElementById('rmrTab');
const tdeeTab = document.getElementById('tdeeTab');
const tabs = [bmrTab, rmrTab, tdeeTab];

// 0: bmr 1: rmr 2: tdee
function changeTabStyle(tab) {
    let tabs = [bmrTab, rmrTab, tdeeTab];
    tabs.forEach((cTab, index) => {
        cTab.classList.toggle('active-tab', index === tab);
    });
};

function switchToRMR() {
    for (i = 0; i < bmrObjects.length; i++) {
        bmrObjects[i].id == 'bmr-input' ? null : bmrObjects[i].style.display = 'none';
        tabStatus = 'rmr';
    }   
    for (i = 0; i < rmrObjects.length; i++) {
        rmrObjects[i].style.display = '';
    }
    for (i = 0; i < tdeeObjects.length; i++) {
        tdeeObjects[i].style.display = 'none';
    }
    changeTabStyle(1)
}

function switchToBMR() {
    for (i = 0; i < rmrObjects.length; i++) {
        rmrObjects[i].style.display = 'none';
        tabStatus = 'bmr';
    };   
    for (i = 0; i < bmrObjects.length; i++) {
        bmrObjects[i].style.display = '';
    }
    for (i = 0; i < tdeeObjects.length; i++) {
        tdeeObjects[i].style.display = 'none';
    }
    changeTabStyle(0)
};

function switchToTDEE() {
    for (i = 0; i < bmrObjects.length; i++) {
        bmrObjects[i].id == 'bmr-input' ? null : bmrObjects[i].style.display = 'none';
        tabStatus = 'tdee';
    };   
    for (i = 0; i < rmrObjects.length; i++) {
        rmrObjects[i].style.display = 'none';
    }
    for (i = 0; i < tdeeObjects.length; i++) {
        tdeeObjects[i].style.display = '';
    }
    changeTabStyle(2)
};

switchToBMR()

tabs.forEach((tab) => {
    tab.addEventListener('click', updateBMR);
});

bmrTab.addEventListener('click', switchToBMR);
tdeeTab.addEventListener('click', switchToTDEE);
rmrTab.addEventListener('click', switchToRMR);

document.getElementById('tdee-energy').addEventListener('input', updateBMR);

formulaElement.addEventListener('input', () => {
    if (formulaElement.value === 'schofield') {
        modifySchofield(true);
        usingSchofield = true;
        bmrHeight.value = '';
        bmrAge.placeholder = 'Age 3 – 60'
    } else {
        modifySchofield(false);
        usingSchofield = false;
        bmrAge.placeholder = 'Age 18 – 80'
    };
});a