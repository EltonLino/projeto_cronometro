let inicio = 0;
let tempoDecorrido = 0;
let rodando = false;
let rafId;

function atualizarDisplay() {
  const agora = performance.now();
  const tempoAtual = tempoDecorrido + (rodando ? agora - inicio : 0);

  const milissegundos = Math.floor(tempoAtual % 1000);
  const segundos = Math.floor((tempoAtual / 1000) % 60);
  const minutos = Math.floor((tempoAtual / 60000) % 60);
  const horas = Math.floor((tempoAtual / 3600000));

  const formatado = 
    `${String(horas).padStart(2, '0')}:` +
    `${String(minutos).padStart(2, '0')}:` +
    `${String(segundos).padStart(2, '0')}.` +
    `${String(milissegundos).padStart(3, '0')}`;

  document.getElementById('display').textContent = formatado;
  if (rodando) rafId = requestAnimationFrame(atualizarDisplay);
}

function iniciar() {
  if (!rodando) {
    inicio = performance.now();
    rodando = true;
    rafId = requestAnimationFrame(atualizarDisplay);
  }
}

function pausar() {
  if (rodando) {
    tempoDecorrido += performance.now() - inicio;
    rodando = false;
    cancelAnimationFrame(rafId);
  }
}

function resetar() {
  rodando = false;
  tempoDecorrido = 0;
  cancelAnimationFrame(rafId);
  atualizarDisplay();
}