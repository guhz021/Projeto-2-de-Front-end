const form = document.getElementById('userForm');
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const lista = document.getElementById('listaUsuarios');
const pesquisaInput = document.getElementById('pesquisa');

let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

function salvarNoLocalStorage() {
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

function criarItemNaLista(usuario, index) {
  const li = document.createElement('li');
  li.innerHTML = `
    <span><strong>${usuario.data}</strong> - ${usuario.nome} (${usuario.email})</span>
    <button onclick="excluirItem(${index})">Excluir</button>
  `;
  lista.appendChild(li);
}

function renderizarLista(filtrada = usuarios) {
  lista.innerHTML = '';
  filtrada.forEach((usuario, index) => criarItemNaLista(usuario, index));
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const nome = nomeInput.value.trim();
  const email = emailInput.value.trim();
  if (!nome || !email) return;

  const data = new Date().toLocaleString();
  const novoUsuario = { nome, email, data };
  usuarios.push(novoUsuario);
  salvarNoLocalStorage();
  renderizarLista();
  form.reset();
});

document.getElementById('limparCampos').addEventListener('click', () => {
  nomeInput.value = '';
  emailInput.value = '';
});

function excluirItem(index) {
  usuarios.splice(index, 1);
  salvarNoLocalStorage();
  renderizarLista();
}

document.getElementById('excluirTodos').addEventListener('click', () => {
  if (confirm('Deseja realmente excluir todos os usuários?')) {
    usuarios = [];
    salvarNoLocalStorage();
    renderizarLista();
  }
});

pesquisaInput.addEventListener('input', () => {
  const termo = pesquisaInput.value.toLowerCase();
  const filtrados = usuarios.filter(
    (u) =>
      u.nome.toLowerCase().includes(termo) ||
      u.email.toLowerCase().includes(termo),
  );
  renderizarLista(filtrados);
});

document.getElementById('limparPesquisa').addEventListener('click', () => {
  pesquisaInput.value = '';
  renderizarLista();
});

renderizarLista();
