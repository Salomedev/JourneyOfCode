/* =============================================
NAILS BY ALE — JavaScript funcional
============================================= */

const WA_NUMBER = '573174023281';
const WA_GREETING = encodeURIComponent('Hola Ale! Vi tu página y quiero agendar una cita 😊');

/* ── Servicios por categoría ── */
const SERVICIOS = {
'unas': [
  'Manicura Clásica',
  'Gel Semipermanente',
  'Nail Art & Diseños',
  'Extensiones de Uñas',
  'Acrílico y Polygel',
  'Nivelación y Gel Constructor'
],
'trenzas': [
  'Trenzas Clásicas',
  'Box Braids',
  'Knotless Braids',
  'Feed-In Braids',
  'Fulani Braids',
  'Peinados Especiales'
],
'ambos': [
  'Manicura + Trenzas Clásicas',
  'Gel + Box Braids',
  'Nail Art + Knotless',
  'Otro combo (especificar en notas)'
]
};

/* ── Al cargar el DOM ── */
document.addEventListener('DOMContentLoaded', () => {
  setMinDate();
  bindTipoChange();
  bindSmoothScroll();
  setWaLinks();
});

function setMinDate() {
  const fechaInput = document.getElementById('fecha');
  if (fechaInput) fechaInput.min = new Date().toISOString().split('T')[0];
}

function bindTipoChange() {
  const tipoSelect = document.getElementById('tipo');
  if (!tipoSelect) return;
  tipoSelect.addEventListener('change', function () {
    const servicioSelect = document.getElementById('servicio');
    servicioSelect.innerHTML = '<option value="">Selecciona…</option>';
    (SERVICIOS[this.value] || []).forEach(nombre => {
      const opt = document.createElement('option');
      opt.value = opt.textContent = nombre;
      servicioSelect.appendChild(opt);
    });
  });
}

function bindSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
}

function setWaLinks() {
  document.querySelectorAll('[data-wa]').forEach(el => {
    el.href = `https://wa.me/${WA_NUMBER}?text=${WA_GREETING}`;
  });
}

/* ── Tabs de servicios ── */
function showTab(tab) {
  document.querySelectorAll('.tab-btn').forEach((btn, i) => {
    btn.classList.toggle('active', (tab === 'unas' && i === 0) || (tab === 'trenzas' && i === 1));
  });
  document.getElementById('unas').classList.toggle('active', tab === 'unas');
  document.getElementById('trenzas').classList.toggle('active', tab === 'trenzas');
}

/* ── Enviar cita por WhatsApp ── */
function enviarWhatsApp() {
  const get = id => document.getElementById(id)?.value.trim() || '';
  const v = {
    nombre:   get('nombre'),
    telefono: get('telefono'),
    tipo:     get('tipo'),
    servicio: get('servicio'),
    fecha:    get('fecha'),
    hora:     get('hora'),
    notas:    get('notas'),
  };

  if (!v.nombre || !v.telefono || !v.tipo || !v.servicio || !v.fecha || !v.hora) {
    alert('⚠️ Por favor completa todos los campos obligatorios antes de continuar.');
    return;
  }

  const fechaFormateada = new Date(v.fecha + 'T00:00:00').toLocaleDateString('es-CO', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  const mensaje =
`🌸 *Nueva solicitud de cita — Nails by Ale*

👤 *Nombre:* ${v.nombre}
📱 *WhatsApp:* ${v.telefono}
🎯 *Tipo:* ${v.tipo.charAt(0).toUpperCase() + v.tipo.slice(1)}
✨ *Servicio:* ${v.servicio}
📅 *Fecha deseada:* ${fechaFormateada}
⏰ *Hora preferida:* ${v.hora}${v.notas ? `\n💬 *Notas:* ${v.notas}` : ''}

*Enviado desde la página web* 💻`;

  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(mensaje)}`, '_blank');
}