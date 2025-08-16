if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/serviceworker.js')
      .then(reg => console.log('Service Worker Registration SUCCESS:', reg.scope))
      .catch(err => console.error('Service Worker Registration ERROR:', err));
  });
}

document.addEventListener('DOMContentLoaded', () => {
    const linktomenu = document.getElementById('link-to-menu');
    linktomenu.addEventListener('mouseover', () => {
        const calcuraIcon = document.getElementById('calcura-icon');
        calcuraIcon.style.filter = 'brightness(2) saturate(1.4)';
    });
    linktomenu.addEventListener('mouseout', () => {
        const calcuraIcon = document.getElementById('calcura-icon');
        calcuraIcon.style.filter = 'brightness(1) saturate(1)';
    });
});