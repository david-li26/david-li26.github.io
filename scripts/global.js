if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/serviceworker.js')
      .then(reg => console.log('Service Worker Registration SUCCESS:', reg.scope))
      .catch(err => console.error('Service Worker Registration ERROR:', err));
  });
}
