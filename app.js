document.addEventListener('DOMContentLoaded', () => {
  const fotoForm = document.getElementById('fotoForm');
  const videoForm = document.getElementById('videoForm');

  // Agrega la clase 'loaded' después de 2 segundos (2000 milisegundos)
  setTimeout(function () {
    document.body.classList.add('loaded');
  }, 1500);

  fotoForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Verificar si se seleccionó un archivo
    const fotoInput = fotoForm.querySelector('input[type="file"]');
    if (!fotoInput.files || fotoInput.files.length === 0) {
      showToast('Selecciona una foto antes de cargar.');
      return;
    }

    const formData = new FormData(fotoForm);
    try {
      const response = await fetch('/cargarfoto', {
        method: 'POST',
        body: formData,
      });
      const result = await response.text();
      showToast(result);
      setTimeout(() => location.reload(), 2000); // Recargar la página después de 2 segundos
    } catch (error) {
      console.error(error);
    }
  });

  videoForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Verificar si se seleccionó un archivo
    const videoInput = videoForm.querySelector('input[type="file"]');
    if (!videoInput.files || videoInput.files.length === 0) {
      showToast('Selecciona un video antes de cargar.');
      return;
    }

    const formData = new FormData(videoForm);
    try {
      const response = await fetch('/cargarvideo', {
        method: 'POST',
        body: formData,
      });
      const result = await response.text();
      showToast(result);
      setTimeout(() => location.reload(), 1500); // Recargar la página después de 2 segundos
    } catch (error) {
      console.error(error);
    }
  });

  function showToast(message) {
    Toastify({
      text: message,
      duration: 5000, // Duración en milisegundos
      gravity: 'top', // Posición del toast (top, bottom, left, right)
      position: 'center', // Posición del toast (top, bottom, left, right, center)
      backgroundColor: '#0C01FF', // Color de fondo del toast
      stopOnFocus: true, // Detener el temporizador cuando el toast está enfocado
    }).showToast();
  }
});
