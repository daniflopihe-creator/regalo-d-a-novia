const heart = document.querySelector('#heart');
const welcome = document.querySelector('.welcome');
const main = document.querySelector('#main');
const song = document.querySelector('#song');
const tape = document.querySelector('#bigTape');
const miniPlayer = document.querySelector('#miniPlayer');
const collageStyle = document.createElement('link');
collageStyle.rel = 'stylesheet'; collageStyle.href = 'collage.css'; document.head.append(collageStyle);
const compactStyle = document.createElement('link');
compactStyle.rel = 'stylesheet'; compactStyle.href = 'mobile-collage.css'; document.head.append(compactStyle);
const phoneStyle = document.createElement('link');
phoneStyle.rel = 'stylesheet'; phoneStyle.href = 'phone.css'; document.head.append(phoneStyle);
const fruityStyle = document.createElement('link');
fruityStyle.rel = 'stylesheet'; fruityStyle.href = 'fruity.css'; document.head.append(fruityStyle);
document.querySelector('.board').insertAdjacentHTML('beforeend','<span class="fruit peach">🍑</span><span class="fruit cherries">🍒</span><span class="fruit strawberry">🍓</span><i class="sketch one"></i><i class="sketch two"></i>');
document.querySelector('.board').insertAdjacentHTML('beforeend','<span class="peach-more p1">🍑</span><span class="peach-more p2">🍑</span><span class="peach-more p3">🍑</span><span class="peach-more p4">🍑</span>');

heart.addEventListener('click', () => {
  heart.classList.add('boom');
  for (let i = 0; i < 18; i++) releaseHeart();
  setTimeout(() => welcome.classList.add('gone'), 320);
  setTimeout(() => { welcome.classList.add('hidden'); main.classList.remove('hidden'); }, 860);
});

function releaseHeart() {
  const piece = document.createElement('span');
  piece.textContent = Math.random() > .45 ? '♥' : '♡';
  piece.style.cssText = `position:fixed;z-index:25;left:${46+Math.random()*8}%;top:${47+Math.random()*8}%;color:${Math.random()>.5?'#ed7fa2':'#b99be3'};font-size:${12+Math.random()*20}px;pointer-events:none;transition:transform .85s ease-out,opacity .85s ease-out`;
  document.body.append(piece);
  requestAnimationFrame(() => { piece.style.transform = `translate(${(Math.random()-.5)*260}px,${-80-Math.random()*220}px) rotate(${(Math.random()-.5)*120}deg)`; piece.style.opacity = '0'; });
  setTimeout(() => piece.remove(), 900);
}

document.querySelectorAll('[data-modal]').forEach(button => button.addEventListener('click', () => openModal(button.dataset.modal, button)));
document.querySelectorAll('.close').forEach(button => button.addEventListener('click', () => closeModal(button.closest('.modal'))));
document.querySelectorAll('.modal').forEach(modal => modal.addEventListener('click', event => { if (event.target === modal) closeModal(modal); }));
document.addEventListener('keydown', event => { if (event.key === 'Escape') document.querySelectorAll('.modal.open').forEach(closeModal); });

function openModal(id, source) {
  source.classList.add('active');
  const modal = document.getElementById(id);
  modal.classList.add('open');
  if (id === 'letter') typeLetter();
  setTimeout(() => modal.querySelector('.close').focus(), 250);
}
function closeModal(modal) {
  modal.classList.remove('open');
  const video = modal.querySelector('video'); if (video) video.pause();
  document.querySelectorAll('.gift.active').forEach(item => item.classList.remove('active'));
}

let writing;
function typeLetter() {
  clearInterval(writing);
  const target = document.querySelector('#typing'); const words = target.dataset.text; let index = 0;
  target.textContent = '';
  writing = setInterval(() => { target.textContent += words[index++]; if (index >= words.length) clearInterval(writing); }, 22);
}

const phrases = ['Eres mi lugar favorito. ♡','Qué suerte la mía de coincidir contigo.','Contigo, todo se siente un poquito más bonito.','Mi parte favorita del día siempre eres tú.','Tu sonrisa es mi vista preferida.'];
const toast = document.querySelector('#toast'); let toastTimer;
document.querySelector('#star').addEventListener('click', () => { toast.querySelector('span').textContent = phrases[Math.floor(Math.random()*phrases.length)]; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 3600); });
song.addEventListener('play', () => { tape.classList.add('spinning'); miniPlayer.classList.remove('hidden'); miniPlayer.classList.add('playing'); });
song.addEventListener('pause', () => { tape.classList.remove('spinning'); miniPlayer.classList.remove('playing'); });
song.addEventListener('ended', () => { tape.classList.remove('spinning'); miniPlayer.classList.add('hidden'); });
miniPlayer.addEventListener('click', () => { if (song.paused) song.play(); else song.pause(); });
