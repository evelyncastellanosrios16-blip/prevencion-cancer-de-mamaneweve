// Menú móvil
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

// Animación al hacer scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Pasos de autoexploración
const pasos = [
  { t: 'Observa frente al espejo', d: 'Con los brazos a los lados y luego levantados, mira si hay cambios en el tamaño, la forma o la piel de las mamas, o alteraciones en los pezones.' },
  { t: 'Palpa con las yemas de los dedos', d: 'Usa los dedos juntos y planos. Haz movimientos circulares, con presión suave, media y firme, cubriendo toda la mama, desde la clavícula hasta debajo del pecho.' },
  { t: 'No olvides las axilas', d: 'Con el brazo ligeramente levantado, palpa la zona de la axila para detectar bultos o ganglios inusuales.' },
  { t: 'Repite acostada', d: 'Acostada y con una almohada bajo el hombro, repite la palpación. Hazlo una vez al mes, unos días después de terminar la menstruación.' }
];
const panel = document.getElementById('tabpanel');
const tabs = document.querySelectorAll('.tab');
function showPaso(i){
  tabs.forEach((b, k) => b.classList.toggle('active', k === i));
  panel.innerHTML = `<h4>${pasos[i].t}</h4><p>${pasos[i].d}</p>`;
}
tabs.forEach(b => b.addEventListener('click', () => showPaso(+b.dataset.i)));
showPaso(0);

// Quiz
const preguntas = [
  { q: '¿Desde qué edad se recomienda la autoexploración mamaria mensual?', o: ['10 años', '20 años', '40 años', '60 años'], c: 1, e: 'Se recomienda desde los 20 años, una vez al mes.' },
  { q: 'En la etapa II, ¿qué tamaño suele tener el tumor?', o: ['Menos de 1 cm', 'Entre 2 y 5 cm', 'Más de 20 cm'], c: 1, e: 'Entre 2 y 5 cm, como una nuez o una ciruela pequeña.' },
  { q: '¿Cuántos minutos de ejercicio moderado a la semana se recomiendan?', o: ['30', '60', '150', '600'], c: 2, e: 'Al menos 150 minutos semanales de ejercicio aeróbico moderado.' },
  { q: '¿Cuál de estos NO es un hábito de prevención?', o: ['Dieta equilibrada', 'Evitar el tabaco', 'Aumentar el consumo de alcohol'], c: 2, e: 'El alcohol, incluso en cantidades moderadas, aumenta el riesgo.' },
  { q: '¿Qué significa que el cáncer de mama no tenga metástasis a distancia?', o: ['Que no se ha diseminado a otras partes del cuerpo', 'Que ya desapareció', 'Que no necesita tratamiento'], c: 0, e: 'Significa que no se ha extendido a otros órganos.' }
];
const box = document.getElementById('quiz-box');
let i = 0, score = 0;
function render(){
  if (i >= preguntas.length){
    const msg = score === preguntas.length ? '¡Excelente! Estás muy bien informada/o 🎀' : score >= 3 ? '¡Muy bien! Repasa las secciones para mejorar.' : 'Vuelve a leer la página y ¡inténtalo otra vez!';
    box.innerHTML = `<p class="q-text">Resultado: ${score} de ${preguntas.length}</p><p class="q-fb">${msg}</p><button class="btn" id="again">Reintentar</button>`;
    document.getElementById('again').onclick = () => { i = 0; score = 0; render(); };
    return;
  }
  const p = preguntas[i];
  box.innerHTML = `<p class="q-progress">Pregunta ${i + 1} de ${preguntas.length}</p>
    <p class="q-text">${p.q}</p>
    ${p.o.map((t, k) => `<button class="q-opt" data-k="${k}">${t}</button>`).join('')}
    <p class="q-fb" id="fb"></p>`;
  box.querySelectorAll('.q-opt').forEach(b => b.onclick = () => {
    const k = +b.dataset.k;
    box.querySelectorAll('.q-opt').forEach((x, n) => { x.disabled = true; if (n === p.c) x.classList.add('ok'); });
    if (k === p.c) score++; else b.classList.add('bad');
    document.getElementById('fb').textContent = (k === p.c ? '¡Correcto! ' : 'Casi. ') + p.e;
    const nx = document.createElement('button');
    nx.className = 'btn'; nx.textContent = i === preguntas.length - 1 ? 'Ver resultado' : 'Siguiente';
    nx.onclick = () => { i++; render(); };
    box.appendChild(nx);
  });
}
render();
