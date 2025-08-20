let localStorage = window.localStorage;
let toggleSettingsValue = false;
const settingsBlock = document.getElementById('globalsettings');
const wrap = document.getElementById('wrap')
const settingsLogo = document.getElementById('settings-logo')

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

const bmrWeight = document.getElementById('bmr-weight');
const bmrHeight = document.getElementById('bmr-height');
const bmrAge = document.getElementById('bmr-age');

function updatePerimeters() {
    if (bmrWeight.value < 10 || bmrWeight.value > 120) {
        bmrWeight.style.border = 'solid 2.5px #da0000';
    } else {
        bmrWeight.style.border = 'solid 2.5px var(--border-colour)';
    }
    if (bmrHeight.value < 10 || bmrHeight.value > 240) {
        bmrHeight.style.border = 'solid 2.5px #da0000';
    } else {
        bmrHeight.style.border = 'solid 2.5px var(--border-colour)';
    }
    if (bmrAge.value < 10 | bmrAge.value > 120) {
        bmrAge.style.border = 'solid 2.5px #da0000';
    } else {
        bmrAge.style.border = 'solid 2.5px var(--border-colour)';
    }
}

bmrWeight.addEventListener('input', updatePerimeters)
bmrHeight.addEventListener('input', updatePerimeters)
bmrAge.addEventListener('input', updatePerimeters)