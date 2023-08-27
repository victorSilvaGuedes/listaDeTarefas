const inputTarefa = document.querySelector('.nova-tarefa');
const btnTarefa = document.querySelector('.btn-nova-tarefa');
const tarefas = document.querySelector('.tarefas');

//evento no click do botao
btnTarefa.addEventListener('click', function () {
  //verificar se o input está vazio
  if (!inputTarefa.value) {
    return;
  }
  novaTarefa(inputTarefa.value);
  limpaInput();
});

//evento ao pressionar enter
inputTarefa.addEventListener('keypress', function (e) {
  if (e.keyCode === 13) {
    if (!inputTarefa.value) {
      return;
    }
    novaTarefa(inputTarefa.value);
    limpaInput();
  }
});

//função apagar
//apaga o elemento pai do botao da li
document.addEventListener('click', function (e) {
  const elemento = e.target;
  if (elemento.classList.contains('btn-apagar')) {
    elemento.parentElement.remove();
    salvarTarefas();
  }
});

//criar <li> para nova tarefa
function criaLi() {
  const li = document.createElement('li');
  return li;
}

//limpar input
function limpaInput() {
  inputTarefa.value = '';
  inputTarefa.focus();
}

//criar botao para apagar tarefa
function criaBotaoApagar(li) {
  const btnApagar = document.createElement('button');
  btnApagar.innerText += 'apagar';
  btnApagar.setAttribute('class', 'btn-apagar');
  li.appendChild(btnApagar);
}

//cria a li, insere a <li> junto da msg da nova tarefa
function novaTarefa(txtInput) {
  const li = criaLi();
  li.innerText = txtInput;
  tarefas.appendChild(li);
  criaBotaoApagar(li);
  salvarTarefas();
}

//salvar tarefas da li, percorre todas li, pega somente o txt (retira tag)
//retira o txt apagar do botão, salva o txt num array
//salve o array num json como string, salve o json no localStorage
function salvarTarefas() {
  const liTarefas = tarefas.querySelectorAll('li');
  const listaTarefas = [];

  for (let tarefa of liTarefas) {
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace('apagar', '').trim();
    listaTarefas.push(tarefaTexto);
  }
  const tarefasJson = JSON.stringify(listaTarefas);
  localStorage.setItem('tarefas', tarefasJson);
  console.log(tarefasJson);
  
}

function addTarefasLocalStorage(){
    const tarefas = localStorage.getItem('tarefas');
    const listaTarefas = JSON.parse(tarefas);

    for (let tarefa of listaTarefas) {
        novaTarefa(tarefa);
    }
}

addTarefasLocalStorage();
