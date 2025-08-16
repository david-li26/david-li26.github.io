let localStorage = window.localStorage;
let toggleSettingsValue = false;
const settingsBlock = document.getElementById('globalsettings');
const wrap = document.getElementById('wrap')

function updateSettings() {
    toggleSettingsValue = !toggleSettingsValue
    settingsBlock.classList.toggle('active', toggleSettingsValue)
    wrap.style.filter = toggleSettingsValue ? 'blur(1px)':'blur(0px)'
}