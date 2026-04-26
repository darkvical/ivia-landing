const WA_NUMBER = '51997408744';

// Abre WhatsApp con el servicio seleccionado pre-rellenado
function openServiceWhatsApp(serviceName) {
  const msg = encodeURIComponent(`Hola! Me gustaría obtener más información sobre el servicio: *${serviceName}*`);
  window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank');
}

// Servicios con WhatsApp al hacer clic
document.querySelectorAll('[data-service]').forEach(item => {
  item.style.cursor = 'pointer';
  item.addEventListener('click', () => openServiceWhatsApp(item.dataset.service));
  item.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') openServiceWhatsApp(item.dataset.service);
  });
});

// Puntos decorativos (solo en páginas que los tengan)
const rail = document.getElementById('dotsRail');
if (rail) {
  for (let i = 0; i < 22; i++) {
    const d = document.createElement('div');
    d.className = 'dot';
    rail.appendChild(d);
  }
}

// Efecto ripple en botones
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

// Cargar bottom nav y activar ítem según data-active-nav del body
fetch('components/bottom-nav.html')
  .then(res => {
    if (!res.ok) throw new Error('Nav component not found');
    return res.text();
  })
  .then(html => {
    document.getElementById('bottom-nav-placeholder').outerHTML = html;

    const activeNav = document.body.dataset.activeNav || 'home';
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.nav === activeNav);
      item.addEventListener('click', function () {
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        this.classList.add('active');
      });
    });

    document.dispatchEvent(new Event('navLoaded'));
  })
  .catch(err => console.warn('Bottom nav:', err.message));
