// Menu do celular
const botaoMenu = document.querySelector(".menu-btn");
const menu = document.getElementById("menu");

botaoMenu.addEventListener("click", () => {
  const aberto = menu.classList.toggle("aberto");
  botaoMenu.setAttribute("aria-expanded", aberto);
});

menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("aberto");
    botaoMenu.setAttribute("aria-expanded", "false");
  });
});

// Barras de habilidades: preenchem quando aparecem na tela
const barras = document.querySelectorAll(".barra i");
const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      entrada.target.style.width = entrada.target.dataset.nivel + "%";
      observador.unobserve(entrada.target);
    }
  });
}, { threshold: 0.5 });
barras.forEach((b) => observador.observe(b));

// Validação do formulário
const form = document.getElementById("form-contato");
const retorno = document.getElementById("retorno");

form.addEventListener("submit", (evento) => {
  evento.preventDefault();
  let valido = true;

  form.querySelectorAll("input, textarea").forEach((campo) => {
    const vazio = campo.value.trim() === "";
    const emailInvalido = campo.type === "email" && !campo.checkValidity();
    campo.classList.toggle("erro", vazio || emailInvalido);
    if (vazio || emailInvalido) valido = false;
  });

  if (!valido) {
    retorno.textContent = "Preencha todos os campos com um e-mail válido.";
    return;
  }

  // Este site não tem servidor. Para receber mensagens de verdade,
  // use um serviço como Formspree e troque esta parte.
  retorno.textContent = "Mensagem enviada! Obrigado pelo contato.";
  form.reset();
});

// Ano do rodapé
document.getElementById("ano").textContent = new Date().getFullYear();
