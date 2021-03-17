

//Escopo Varaiveis Globais
let listaUsuarios = [];
let listaUsuariosEncontrados = [];

let formulario = null;
let textoDigitadoInput = null;
let botaoPesquisar = null;
let exibicaoUsuarios = null;
let listagemUsuarios = null;
let exibicaoEstatisticas = null;
let listagemEstatisticas = null;
let numeroFormatado = null;

let quantidadeTotalUsuarios = listaUsuarios.length;
let quantidadeTotalMasculino = 0;
let quantidadeTotalFeminino = 0;
let somatorioIdades = 0;
let mediaIdades = 0;

window.addEventListener('load', start)

function start(){
    console.log('Página Carregada!');

    formulario = document.querySelector("form");
    formulario.addEventListener("submit", (event) => event.preventDefault());

    textoDigitadoInput = document.querySelector("#texto-digitado");
    //texto-digitado.addEventListener("keyup", (event) => event.operandoInput(event));

    botaoPesquisar = document.querySelector("#botao-pesquisar");
    //botoa-pesquisar.addEventListener("click", (event) => event.operandoInput(event));

    exibicaoUsuarios = document.querySelector(".exibicao-usuarios");
    exibicaoEstatisticas = document.querySelector(".exibicao-estatisticas");

    listagemUsuarios = document.querySelector(".listagen-usuarios");
    listagemEstatisticas = document.querySelector(".listagem-estatisticas");

    numeroFormatado = Intl.NumberFormat('pt-BR');

    buscarUsuarios();

}

async function buscarUsuarios(){
    console.log('Funçao Carregada!!!')
    const resource = await fetch('http://localhost:3001/users');
    const resposta = await resource.json();

    listaUsuarios = resposta.map((usuario) => {
        const { name, gender, dob, picture } = usuario;
        return{
            nome: `${name.first} ${name.last}`,
            genero: gender,
            idade: dob.age,
            imagem: picture.medium
        };
    });
    //console.log(listaUsuarios);
    render();
}

function render(){
    //renderizarListaUsuarios();
    //renderizarSomatorioIdades();
    //renderizarMediasIdades();
 
    renderizarBuscaUsuarios();
   
    

    
 }

 function renderizarBuscaUsuarios(){
     console.log("Função Buscar Usuário!");
     listaUsuariosEncontrados.sort( (a, b) => a.name.localeCompare(b.name));

     listagemUsuarios = `
         <h2 class="titulo-exibicao">${quantidadeTotalUsuarios} Usuários(s) encontrado(s)</h2>
         <ul class="lista-usuarios"></ul>
     `;
     listagemEstatisticas = `
        <h2 class="titulo-exibicao">Estatísticas</h2>
        <ul class="lista-estatisticas>
     `;

     
}





