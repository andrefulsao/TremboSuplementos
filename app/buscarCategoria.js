const botaoBuscar = document.getElementById('botao-buscar')
const elementoParaCategoria = document.getElementById('principal-resultado')

botaoBuscar.addEventListener('click', () => {
    const endpointDaAPI = `http://localhost:8080/categoria`
    getBuscarCategorias(endpointDaAPI)
})

async function getBuscarCategorias(endpointDaAPI) {
    //var mensagemErro = document.getElementById('erro');    
    var categorias = []
    elementoParaCategoria.innerHTML = "";
    try {
        var consultaCategoria = await fetch(endpointDaAPI)
        categorias = await consultaCategoria.json()
        console.log(categorias)
        if (categorias.erro) {
            throw Error('Não existe categoria!');
        }
        
        exibirCategoriaNaTela(categorias)
    } catch (erro) {        
        elementoParaCategoria.innerHTML = `<p>Sem categorias a exibir!</p>`        
    }

}

function exibirCategoriaNaTela(listaDeCategorias) {    
    elementoParaCategoria.innerHTML = `
    <div class="principal-resultado-label">
        <p class="principal-resultado-label-codigo">codigo</p>
        <p class="principal-resultado-label-nome">nome</p>
    </div>
    `
    listaDeCategorias.forEach(categoria => {
        //let disponibilidade = verificarDisponibilidadeDoLivro(livro)
        elementoParaCategoria.innerHTML += `
        <div class="principal-resultado-categoria">
            <p class="codigo">${categoria.id}</p>
            <p class="nome">${categoria.nome}</p>
            <div class="botoes">
                <button class="botao-editar">                                                
                </button>
                <button class="botao-excluir">                                                
                </button>
            </div>
        </div>
        `
    });
}