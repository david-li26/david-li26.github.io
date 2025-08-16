const detailsList = document.querySelectorAll('details');
const information = document.getElementById('information');

function updateLayout() {
  const anyOpen = Array.from(detailsList).some(d => d.open);
  const isWide = window.innerWidth >= 500;

  information.style.flexDirection = isWide
    ? (anyOpen ? 'column' : 'row')
    : 'column'; // always column on small screens
}

// Listen for toggle events
detailsList.forEach((detail) => {
  detail.addEventListener('toggle', updateLayout);
});

// Listen for screen resize
window.addEventListener('resize', updateLayout);

// Run once on page load
updateLayout();

let bmrTab = document.getElementById('bmr')
let tdeeTab = document.getElementById('tdee')
let rmrTab = document.getElementById('rmr')
const colour = '#cdcdcdff'

function changeTab(tab) {
    bmrTab.style.borderBottom = 'solid #707070'
    rmrTab.style.borderBottom = 'solid #707070'
    tdeeTab.style.borderBottom = 'solid #707070'
    if (tab == 'bmr') {
        bmrTab.style.borderBottom = 'solid' + colour
    } else if (tab == 'rmr') {
        rmrTab.style.borderBottom = 'solid' + colour
    } else {
        tdeeTab.style.borderBottom = 'solid' + colour
    }
    
}

bmrTab.addEventListener('click', () => changeTab('bmr'))
rmrTab.addEventListener('click', () => changeTab('rmr'))
tdeeTab.addEventListener('click', () => changeTab('tdee'))