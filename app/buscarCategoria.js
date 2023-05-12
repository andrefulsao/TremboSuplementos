const botaoBuscar = document.getElementById('botao-buscar')
const botaoLimpar = document.getElementById('botao-limpar')
const elementoParaCategoria = document.getElementById('principal-resultado-teste')
const valorSelect = document.getElementById('selecao')

botaoLimpar.addEventListener('click', () =>{
    elementoParaCategoria.innerHTML = '';
})

/* Adicionando evento de click */
botaoBuscar.addEventListener('click', () => {
    const valorSelectConvertido = valorSelect.value
    const idOuNome = document.getElementById('dadoBusca')

    if (valorSelectConvertido === 'todos') {
        const endpointDaAPI = `http://localhost:8080/categoria`
        getBuscarCategorias(endpointDaAPI, valorSelectConvertido)
    } else if (valorSelectConvertido === 'codigo') {
        var elementos = []
        verificaElementoJaContem(idOuNome.value, elementos)
        if (elementos.length > 0) {
            return
        } else {
            const endpointDaAPI = `http://localhost:8080/categoria/${idOuNome.value}`
            getBuscarCategorias(endpointDaAPI, valorSelectConvertido)
        }
    } else {
        const endpointDaAPI = `http://localhost:8080/categoria/nome/${idOuNome.value}`
        getBuscarCategorias(endpointDaAPI, valorSelectConvertido)
    }

})

/* Adicionando consumo da API */

async function getBuscarCategorias(endpointDaAPI, valorSelectConvertido) {
    var categorias = []
    try {
        var consultaCategoria = await fetch(endpointDaAPI)
        if (valorSelectConvertido === 'todos') {
            elementoParaCategoria.innerHTML = '';
            categorias = await consultaCategoria.json()
        } else if (valorSelectConvertido === 'codigo') {
            categorias.push(await consultaCategoria.json())
        } else {
            elementoParaCategoria.innerHTML = '';
            categorias = await consultaCategoria.json()
        }

        if (categorias.erro) {
            throw Error('Erro ao consultar a categoria!');
        }

        exibirCategoriaNaTela(categorias)
    } catch (erro) {

    }

}

/* Função que exibe as categorias na tela */

function exibirCategoriaNaTela(listaDeCategorias) {
    listaDeCategorias.forEach(categoria => {
        //let disponibilidade = verificarDisponibilidadeDoLivro(livro)
        elementoParaCategoria.innerHTML += `
        <div class="principal-resultado-categoria">
            <p class="codigo">${categoria.id}</p>
            <p class="nome">${categoria.nome}</p>            
            <div class="botoes">
                <button class="botao-editar" id="${categoria.id}">                                                
                </button>                
                <button class="botao-excluir" id="${categoria.id}">                                                
                </button>
            </div>
        </div>
        `
    });
    const btnParaDeletar = document.querySelectorAll('.botao-excluir')
    btnParaDeletar.forEach(btn => btn.addEventListener('click', filtrarDado))
    const btnParaEditar = document.querySelectorAll('.botao-editar')
    btnParaEditar.forEach(btn => btn.addEventListener('click', editarDados))
}

/* Função que verifica se o elemento já existe na tela quando a consulta for por codigo 
assim não adiciona o elemento 2x ou limpa a tela */
function verificaElementoJaContem(id, elementos) {
    const elementoJaExiste = document.querySelectorAll('.codigo')
    elementoJaExiste.forEach(elemento => {
        if (elemento.innerHTML === id) {
            elementos.push(id)
            return elementos
        }
    })
}

/* Função que verifica o botão de exclusão clickado assim possibilitando a exclusão do conteudo correto */
function filtrarDado() {         
    const elementoBtn = document.getElementById(this.id)    
    const resultado = confirm("Deseja realmente excluir o item ?");
    if (resultado === true) {        
        deleteDado(elementoBtn.id)
    } else {
        return
    }

}

/* Função que envia o id para a API de exclusão e retorna aprensentado na tela os dados restantes */
async function deleteDado(dado) { 
    var quantidadeCategorias = document.querySelectorAll('.principal-resultado-categoria')    
    var resposta = false  
    try {
        var deleteCategoria = await fetch(`http://localhost:8080/categoria/${dado}`, {
            method: 'DELETE',
        })        
        resposta = await deleteCategoria.json()        
        if(resposta.length === quantidadeCategorias.length){
            alert("Não foi possivel excluir o item")
        }else{
            elementoParaCategoria.innerHTML = '';
            exibirCategoriaNaTela(resposta)
        }        

        if (resposta.erro) {
            throw Error('Erro ao consultar a categoria!');
        }
        
    } catch (erro) {
        console.log(erro)
    }

}

function editarDados(){
    const elementoBtn = document.getElementById(this.id)
    localStorage.setItem("id", JSON.stringify(elementoBtn.id))
    window.location.href = "http://127.0.0.1:5500/TremboSuplemento/editarCategoria.html";         
}