const statusEl = document.getElementById('status');
function updateStatus(){
  const online = navigator.onLine;
  statusEl.textContent = online ? '● Online' : '● Modo off-line';
  statusEl.className = `status ${online ? 'online' : 'offline'}`;
}
window.addEventListener('online', updateStatus);
window.addEventListener('offline', updateStatus);
updateStatus();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('./service-worker.js');
      console.log('Service Worker registrado:', registration.scope);
    } catch (error) {
      console.error('Falha ao registrar Service Worker:', error);
    }
  });
}
