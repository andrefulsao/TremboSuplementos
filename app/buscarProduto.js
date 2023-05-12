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
        const endpointDaAPI = `http://localhost:8080/produto`
        getBuscarProduto(endpointDaAPI, valorSelectConvertido)
    } else if (valorSelectConvertido === 'codigo') {
        var elementos = []
        verificaElementoJaContem(idOuNome.value, elementos)
        if (elementos.length > 0) {
            return
        } else {
            const endpointDaAPI = `http://localhost:8080/produto/${idOuNome.value}`
            getBuscarProduto(endpointDaAPI, valorSelectConvertido)
        }
    } else {
        const endpointDaAPI = `http://localhost:8080/produto/nome/${idOuNome.value}`
        getBuscarProduto(endpointDaAPI, valorSelectConvertido)
    }

})

/* Adicionando consumo da API */

async function getBuscarProduto(endpointDaAPI, valorSelectConvertido) {
    var produtos = []
    try {
        var consultaCategoria = await fetch(endpointDaAPI)
        if (valorSelectConvertido === 'todos') {
            elementoParaCategoria.innerHTML = '';
            produtos = await consultaCategoria.json()
        } else if (valorSelectConvertido === 'codigo') {
            produtos.push(await consultaCategoria.json())
        } else {
            elementoParaCategoria.innerHTML = '';
            produtos = await consultaCategoria.json()
        }

        if (produtos.erro) {
            throw Error('Erro ao consultar a produto!');
        }

        exibirProdutoNaTela(produtos)
    } catch (erro) {

    }

}

/* Função que exibe as produtos na tela */

function exibirProdutoNaTela(listaDeProdutos) {
    listaDeProdutos.forEach(produto => {
        //let disponibilidade = verificarDisponibilidadeDoLivro(livro)
        elementoParaCategoria.innerHTML += `
        <div class="principal-resultado-produto">
            <p class="codigo">${produto.id}</p>
            <p class="nome">${produto.nome}</p>
            <div class="botoes">
                <button class="botao-editar" id="${produto.id}">                                                
                </button>
                <button class="botao-excluir" id="${produto.id}">                                                
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
    var quantidadeProdutos = document.querySelectorAll('.principal-resultado-produto')    
    var resposta = false  
    try {
        var deleteProduto = await fetch(`http://localhost:8080/produto/${dado}`, {
            method: 'DELETE',
        })        
        resposta = await deleteProduto.json()        
        if(resposta.length === quantidadeProdutos.length){
            alert("Não foi possivel excluir o item")
        }else{
            elementoParaCategoria.innerHTML = '';
            exibirProdutoNaTela(resposta)
        }        

        if (resposta.erro) {
            throw Error('Erro ao consultar a produto!');
        }
        
    } catch (erro) {
        console.log(erro)
    }

}

function editarDados(){
    const elementoBtn = document.getElementById(this.id)
    localStorage.setItem("idProduto", JSON.stringify(elementoBtn.id))
    window.location.href = "http://127.0.0.1:5500/TremboSuplemento/editarProduto.html";         
}