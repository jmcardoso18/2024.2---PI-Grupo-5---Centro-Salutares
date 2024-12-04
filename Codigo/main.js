console.clear(); // Limpa o console do navegador

// Seleciona o container dos cartões, o container interno, a lista de cartões e o overlay
const cardsContainer = document.querySelector(".cards");
const cardsContainerInner = document.querySelector(".cards__inner");
const cards = Array.from(document.querySelectorAll(".card"));
const overlay = document.querySelector(".overlay");

// Função para aplicar uma máscara de overlay com base na posição do mouse
const applyOverlayMask = (e) => {
  const overlayEl = e.currentTarget;
  const x = e.pageX - cardsContainer.offsetLeft; // Calcula a posição X relativa ao container dos cartões
  const y = e.pageY - cardsContainer.offsetTop;  // Calcula a posição Y relativa ao container dos cartões

  overlayEl.style = `--opacity: 1; --x: ${x}px; --y:${y}px;`; // Define as variáveis de CSS para a posição e opacidade do overlay
};

// Função para aumentar a escala do cartão ao passar o mouse
const scaleCard = (e) => {
  const card = e.currentTarget;
  card.style.transform = 'scale(1.05)'; // Aumenta a escala do cartão
  card.style.transition = 'transform 0.3s ease'; // Define uma transição suave para o efeito
};

// Função para resetar a escala do cartão quando o mouse sai do elemento
const resetCardScale = (e) => {
  const card = e.currentTarget;
  card.style.transform = 'scale(1)'; // Volta a escala original do cartão
};

// Função para criar o botão de chamada para ação (CTA) dentro do overlay
const createOverlayCta = (overlayCard, ctaEl) => {
  const overlayCta = document.createElement("div"); // Cria um novo elemento div
  overlayCta.classList.add("cta"); // Adiciona a classe "cta" ao novo elemento
  overlayCta.textContent = ctaEl.textContent; // Define o texto do CTA para o overlay
  overlayCta.setAttribute("aria-hidden", true); // Acessibilidade: oculta o CTA do overlay para leitores de tela
  overlayCard.append(overlayCta); // Adiciona o CTA ao cartão overlay
};

// Observador para monitorar mudanças de tamanho dos cartões e ajustar o overlay
const observer = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    const cardIndex = cards.indexOf(entry.target); // Localiza o índice do cartão observado
    let width = entry.borderBoxSize[0].inlineSize; // Define a largura do cartão
    let height = entry.borderBoxSize[0].blockSize; // Define a altura do cartão

    if (cardIndex >= 0) {
      overlay.children[cardIndex].style.width = `${width}px`;  // Ajusta a largura do overlay
      overlay.children[cardIndex].style.height = `${height}px`; // Ajusta a altura do overlay
    }
  });
});

// Função para inicializar o cartão overlay
const initOverlayCard = (cardEl) => {
  const overlayCard = document.createElement("div"); // Cria um novo cartão overlay
  overlayCard.classList.add("card"); // Define a classe "card" para o overlay
  createOverlayCta(overlayCard, cardEl.lastElementChild); // Cria o CTA para o overlay
  overlay.append(overlayCard); // Adiciona o cartão overlay ao elemento overlay
  observer.observe(cardEl); // Observa o cartão para ajustar o tamanho do overlay em mudanças
};

// Adiciona eventos de mouse para aumentar a escala ao passar e resetá-la ao sair do cartão
cards.forEach((card) => {
  card.addEventListener('pointermove', scaleCard); // Evento para aumentar a escala
  card.addEventListener('pointerleave', resetCardScale); // Evento para resetar a escala
});

// Inicializa o overlay para cada cartão
cards.forEach(initOverlayCard);
document.body.addEventListener("pointermove", applyOverlayMask); // Aplica a máscara de overlay baseada na posição do ponteiro
