/* ── Config ── */
const WA_NUMBER = '17867779279';
const N8N_WEBHOOK = 'https://n8n.srv1796973.hstgr.cloud/webhook/agencia-seo-medellin-lead';

/* ── FAQ data ── */
const FAQS = [
  {
    q: '¿Cuánto cuesta el SEO en Medellín?',
    a: 'El precio del SEO en Medellín varía según el alcance. Proyectos para pequeñas empresas inician desde $1.500.000 COP/mes; estrategias completas para empresas medianas están entre $3.000.000 y $6.000.000 COP/mes. Hacemos una auditoría gratuita para darte el presupuesto exacto según tu situación.'
  },
  {
    q: '¿Cuánto tiempo tarda en verse los resultados del SEO?',
    a: 'Los primeros resultados suelen verse entre 3 y 6 meses. En Medellín con competencia moderada es posible ver mejoras en 60-90 días para keywords de long tail. Los resultados más sólidos se consolidan entre el mes 4 y el mes 12.'
  },
  {
    q: '¿Qué incluye un servicio de SEO completo?',
    a: 'Incluye: auditoría técnica, investigación de keywords del mercado antioqueño, optimización on-page (títulos, meta, headings, contenido), SEO técnico (velocidad, Core Web Vitals), contenido optimizado, link building, optimización de Google Business Profile para SEO local y reportes mensuales.'
  },
  {
    q: '¿Qué es el SEO local y cómo ayuda a negocios en Medellín?',
    a: 'El SEO local posiciona tu negocio cuando personas en Medellín buscan servicios como el tuyo. Optimizamos tu Google Business Profile, reseñas y sitio web para dominar el mapa de Google y los primeros resultados en el Valle de Aburrá.'
  },
  {
    q: '¿Puedo dejar de invertir en Google Ads si hago SEO?',
    a: 'Son complementarios, pero el SEO tiene la ventaja de que no pagas por cada clic. Con una estrategia SEO sólida puedes reducir progresivamente tu dependencia de Google Ads en keywords donde ya ranqueas orgánicamente.'
  },
  {
    q: '¿Por qué contratar una agencia en vez de hacerlo internamente?',
    a: 'Una agencia especializada tiene experiencia en decenas de proyectos, herramientas profesionales (Ahrefs, SEMrush) y equipo multidisciplinar. Contratar un empleado implica salario, prestaciones y curva de aprendizaje. Con una agencia, pagas resultados desde el mes 1.'
  },
  {
    q: '¿Para qué tipo de empresas funciona mejor el SEO en Medellín?',
    a: 'Funciona especialmente bien para: clínicas y consultorios, firmas de abogados, inmobiliarias, restaurantes y hoteles, servicios profesionales (contaduría, consultoría), tiendas en línea y cualquier negocio local que quiera captar clientes en Medellín, Envigado, Laureles, El Poblado o Sabaneta.'
  },
  {
    q: '¿Qué resultados puedo esperar al contratar una agencia SEO?',
    a: 'Resultados comunes: aumento de tráfico orgánico entre 40% y 200% en el primer año, mejora de posición para keywords transaccionales, incremento de llamadas desde Google Maps, reducción del costo de adquisición de clientes y mayor autoridad de marca online.'
  },
  {
    q: '¿Cómo sé si una agencia SEO en Medellín es confiable?',
    a: 'Una agencia confiable muestra casos de éxito verificables con métricas reales, es transparente en su proceso, no promete posición #1 garantizada (señal de alerta), tiene reseñas reales en Google y trabaja con contrato claro. Desconfía de quien promete resultados en 30 días.'
  },
  {
    q: '¿Cuándo es el momento ideal para contratar SEO?',
    a: 'El mejor momento es ahora, porque el SEO es acumulativo: cada mes que pasa, tus competidores consolidan más su posición. Recomendamos comprometerse con al menos 6 meses para ver resultados sólidos.'
  },
  {
    q: '¿El SEO funciona para cualquier industria en Medellín?',
    a: 'Sí. Funciona para cualquier industria donde tus clientes usen Google para buscar lo que vendes. En Medellín es especialmente efectivo para salud, derecho, inmobiliaria, construcción, turismo, educación y servicios B2B.'
  },
  {
    q: '¿Cómo calcular el ROI del SEO para mi empresa?',
    a: 'ROI = (ingresos de clientes captados por SEO - inversión en SEO) / inversión en SEO × 100. Si un cliente vale $5.000.000 COP y el SEO genera 3 clientes nuevos al mes con inversión de $2.500.000, el ROI es 500%. Hacemos este cálculo contigo desde la auditoría inicial.'
  },
  {
    q: '¿Qué es una auditoría SEO y por qué la necesito?',
    a: 'Una auditoría SEO es un diagnóstico completo de tu sitio: errores técnicos, velocidad, estructura de URLs, contenido duplicado, perfiles de enlaces y oportunidades de keywords. Es el punto de partida indispensable para cualquier estrategia seria. Ofrecemos auditoría gratuita.'
  },
  {
    q: '¿El SEO sirve solo para Google o también para IA como ChatGPT y Perplexity?',
    a: 'El SEO moderno incluye GEO (Generative Engine Optimization) y AEO (Answer Engine Optimization). Optimizamos tu contenido para aparecer en respuestas de ChatGPT, Perplexity y Google SGE. Un sitio bien optimizado para SEO tiene mucha más probabilidad de ser citado por estos sistemas.'
  },
  {
    q: '¿Qué diferencia a Sergio Aldana de otras agencias SEO en Medellín?',
    a: 'Ofrecemos atención directa con el especialista (no con intermediarios), enfoque en resultados medibles desde la auditoría, experiencia en el mercado antioqueño, transparencia total en reportes, y visión de largo plazo que combina SEO técnico, contenido y autoridad de dominio.'
  }
];

/* ── Build FAQ ── */
function buildFAQ() {
  const list = document.getElementById('faq-list');
  if (!list) return;
  FAQS.forEach((item, i) => {
    const div = document.createElement('div');
    div.className = 'faq-item';
    div.innerHTML = `
      <button class="faq-btn" aria-expanded="false" aria-controls="faq-ans-${i}" id="faq-q-${i}">
        <span>${item.q}</span>
        <svg class="faq-chevron w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
      <div class="faq-answer" id="faq-ans-${i}" role="region" aria-labelledby="faq-q-${i}">${item.a}</div>
    `;
    const btn = div.querySelector('.faq-btn');
    const ans = div.querySelector('.faq-answer');
    btn.addEventListener('click', () => {
      const isOpen = btn.classList.contains('open');
      document.querySelectorAll('.faq-btn.open').forEach(b => {
        b.classList.remove('open');
        b.setAttribute('aria-expanded', 'false');
        b.closest('.faq-item').querySelector('.faq-answer').classList.remove('open');
      });
      if (!isOpen) {
        btn.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        ans.classList.add('open');
      }
    });
    list.appendChild(div);
  });
}

/* ── Navbar scroll ── */
function initNavbar() {
  const nav = document.getElementById('navbar');
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }, { passive: true });

  mobileBtn?.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  mobileMenu?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.add('hidden'));
  });
}

/* ── Modal ── */
function openModal(origen = '') {
  document.getElementById('modal-origen').value = origen;
  document.getElementById('modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.getElementById('m-nombre').focus(), 50);
}

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
  document.body.style.overflow = '';
}

document.getElementById('modal')?.addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

/* ── Send to n8n + Telegram ── */
async function sendLead(data) {
  try {
    await fetch(N8N_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: data.nombre,
        whatsapp: data.whatsapp,
        empresa: data.empresa || '',
        web: data.web || '',
        mensaje: data.mensaje || '',
        origen: data.origen || 'Formulario principal',
        pagina: 'agencia-seo-medellin',
        timestamp: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(6000),
    });
  } catch (_) {
    // Silently fail — WhatsApp redirect still happens
  }
}

/* ── Build WhatsApp redirect URL ── */
function buildWaUrl(nombre, empresa, web) {
  const parts = [`Hola Sergio! Me llamo ${nombre}`];
  if (empresa) parts.push(`soy de ${empresa}`);
  if (web) parts.push(`mi web es ${web}`);
  parts.push('y me interesa saber más sobre el SEO en Medellín para mi empresa.');
  const msg = encodeURIComponent(parts.join(', '));
  return `https://wa.me/${WA_NUMBER}?text=${msg}`;
}

/* ── Main contact form ── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const status = document.getElementById('form-status');
  const submitBtn = document.getElementById('form-submit');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = form.nombre.value.trim();
    const whatsapp = form.whatsapp.value.trim();
    if (!nombre || !whatsapp) {
      showStatus(status, 'Por favor ingresa tu nombre y WhatsApp.', 'error');
      return;
    }
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
    const data = {
      nombre,
      whatsapp,
      empresa: form.empresa?.value.trim(),
      web: form.web?.value.trim(),
      mensaje: form.mensaje?.value.trim(),
      origen: 'Formulario de contacto — agencia-seo-medellin',
    };
    await sendLead(data);
    showStatus(status, '¡Listo! Te contactamos en menos de 2 horas. Redirigiendo a WhatsApp…', 'success');
    setTimeout(() => {
      window.open(buildWaUrl(nombre, data.empresa, data.web), '_blank');
      form.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar solicitud →';
      status.classList.add('hidden');
    }, 1800);
  });
}

function showStatus(el, msg, type) {
  el.textContent = msg;
  el.className = `text-center text-sm mt-2 ${type === 'error' ? 'text-red-600' : 'text-teal-600'}`;
  el.classList.remove('hidden');
}

/* ── Modal form ── */
function initModalForm() {
  const form = document.getElementById('modal-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = form.nombre.value.trim();
    const whatsapp = form.whatsapp.value.trim();
    if (!nombre || !whatsapp) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando…';

    const data = {
      nombre,
      whatsapp,
      empresa: form.empresa?.value.trim(),
      web: form.web?.value.trim(),
      origen: document.getElementById('modal-origen').value || 'Modal WhatsApp — agencia-seo-medellin',
    };

    await sendLead(data);
    closeModal();
    window.open(buildWaUrl(nombre, data.empresa, data.web), '_blank');
    form.reset();
    submitBtn.disabled = false;
    submitBtn.textContent = 'Enviar y hablar por WhatsApp →';
  });
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  buildFAQ();
  initContactForm();
  initModalForm();
});
