// Generate dots rail
const rail = document.getElementById('dotsRail');
for (let i = 0; i < 22; i++) {
  const d = document.createElement('div');
  d.className = 'dot';
  rail.appendChild(d);
}

// Ripple on every button
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const r = document.createElement('span');
    r.className = 'ripple';
    r.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px`;
    this.appendChild(r);
    r.addEventListener('animationend', () => r.remove());
  });
});

// Cargar bottom nav desde componente reutilizable
fetch('components/bottom-nav.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('bottom-nav-placeholder').outerHTML = html;

    // Activar nav switching una vez insertado el componente
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', function () {
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        this.classList.add('active');
      });
    });

    // Notificar a la página que el nav ya está listo
    document.dispatchEvent(new Event('navLoaded'));
  });
