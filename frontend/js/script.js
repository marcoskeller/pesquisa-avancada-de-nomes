

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
let usersContainer = null;
let statsContainer = null;

let quantidadeTotalUsuarios = listaUsuarios.length;
let quantidadeTotalMasculino = 0;
let quantidadeTotalFeminino = 0;
let somatorioIdades = 0;
let mediaIdades = 0;

window.addEventListener('load', () => {

    console.log('Página Carregada!');

    buscarUsuarios();

    formulario = document.querySelector("form");
    formulario.addEventListener("submit", (event) => event.preventDefault());

    textoDigitadoInput = document.querySelector("#textoDigitado");
    textoDigitado.addEventListener("keyup", (event) => operandoInput(event));

    botaoPesquisar = document.querySelector("#botaoPesquisar");
    botaoPesquisar.addEventListener("click", (event) => operandoInput(event));

    exibicaoUsuarios = document.querySelector(".exibicao-usuarios");
    exibicaoEstatisticas = document.querySelector(".exibicao-estatisticas");
    
    listagemUsuarios = document.querySelector(".listagemDeUsuarios");
    listagemEstatisticas = document.querySelector(".listagemDeEstatisticas");
    
    usersContainer = document.querySelector(".listagemDeUsuarios");
    statsContainer = document.querySelector(".listagemDeEstatisticas");

    //numeroFormatado = Intl.NumberFormat('pt-BR');

    });


const buscarUsuarios = async () => {
    console.log('Funçao Carregada!!!')
    const resource = await fetch('http://localhost:3001/users');
    const resposta = await resource.json();

    listaUsuarios = resposta.map((usuario) => {
        const { name, gender, dob, picture } = usuario;
        return{
            name: `${name.first} ${name.last}`,
            gender: gender,
            age: dob.age,
            picture: picture.medium
        };
    });
    //console.log(listaUsuarios);   
};


 const renderizarBuscaUsuarios = () =>  {
     console.log("Função Buscar Usuário!");
     
     //Realizando a ordenação em ordem alfabética da lista de usuários encontrados
     listaUsuariosEncontrados.sort( (a, b) => a.name.localeCompare(b.name));

     listagemUsuarios = `
         <h2 class="titulo-exibicao">${quantidadeTotalUsuarios} Usuários(s) encontrado(s)</h2>
         <ul class="lista-usuarios"></ul>
     `;
     listagemEstatisticas = `
        <h2 class="titulo-exibicao">Estatísticas</h2>
        <ul class="lista-estatisticas>
     `;

     //Realizando uma busca para ver quantos generos Masculinos e quantos Femininos
     listaUsuariosEncontrados.forEach((usuario) => {
        
        //Realizei um destructiring do objeto
        const { name, gender, age, picture } = usuario;

        if(gender.toLowerCase() === 'male')
        {
            quantidadeTotalMasculino = quantidadeTotalMasculino + 1;
        }
        if(gender.toLowerCase() === 'female')
        {
            quantidadeTotalFeminino = quantidadeTotalFeminino + 1;
        }

        //Realizando o somatório das idades
        somatorioIdades = somatorioIdades + age;

        //Exibi os usuários econtrados
        exibicaoUsuarios = `
            <li class="exibicao-usuario">
                <div class="img-usuario">
                    <img src="${picture}" />
                </div>
                <span class="name-usuario">${name}</span>
                <span class="idade=usuario">${age} anos</span>
            </li>
        `;

        //
        listagemUsuarios = listagemUsuarios + exibicaoUsuarios;
        });

        if(listaUsuariosEncontrados.length > 0)
        {
            mediaIdades = somatorioIdades / listaUsuariosEncontrados.length;
        }

        //Exibi as estatisticas dos usuários econtrados
        exibicaoEstatisticas = `
        <li class="estatistica-usuario"><strong>Masculino</strong>${quantidadeTotalMasculino}</li>
        <li class="estatistica-usuario"><strong>Feminino</strong>${quantidadeTotalFeminino}</li>
        <li class="estatistica-usuario"><strong>Soma das Idades>${somatorioIdades}</li>
        <li class="estatistica-usuario"><strong>Média das Idade>${Math.floor(mediaIdades)}</li>
        `;

        listagemEstatisticas = listagemEstatisticas + exibicaoEstatisticas;
        
        //
        usersContainer.innerHTML = listagemUsuarios;
        //listagemUsuarios.innerHTML = listagemDeUsuarios
        
        //
        statsContainer.innerHTML = listagemEstatisticas;
        //listagemDeEstatisticas.innerHTML = exibicaoEstatisticas;

     };
    

const operandoInput = (event) => {
    if(event.target.id === "botaoPesquisar")
    {
        const consulta = event.target.previousElementSibling.value;
        //const consulta = event.target.value; event.currentTarget.value
        //const consulta = event.currentTarget.value;
        if(consulta)
        {
            filtrarUsuarios(consulta);
        }
    }

    if(event.target.id === "textoDigitado")
    {
        const consulta = event.target.value;
        if(event.key === "Enter" && consulta)
        {
            filtrarUsuarios(consulta);
        }
    }

};
    const filtrarUsuarios = (consulta) => {
        listaUsuariosEncontrados = [];

        listaUsuarios.forEach((usuario) =>{
            const { name, gender, age, picture } = usuario;
            if(name.toLowerCase().includes(consulta.toLowerCase()))
            {
                let usuarioEcontrado = usuario;
                listaUsuariosEncontrados = [...listaUsuariosEncontrados, usuarioEcontrado];
            }
        });
      
     renderizarBuscaUsuarios();

    };

