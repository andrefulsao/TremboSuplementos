
getBuscarProdutodois(JSON.parse(localStorage.getItem("idProduto")))

const elementoParaEditarCategoria = document.getElementById('principal-resultado-editar')

const botaoEditarProduto = document.getElementById('botao-salvar-produto')

botaoEditarProduto.addEventListener('click', () => {

    const descricaoProduto = document.getElementById('descricao');
    const quantidade = document.getElementById('quantidade');
    const valor = document.getElementById('valor');
    const conteudo = document.getElementById('conteudo');
    const porcao = document.getElementById('porcao');
    const valor_energetico = document.getElementById('valor_energetico');
    const elementoParaCategoriaSelect = document.getElementById('selecao_categoria-produto')
    const elementoParaCategoriaSabor = document.getElementById('sabor')
    const elementoParaCategoriaProteina = document.getElementById('proteina')
    const elementoParaCategoriaCarboidrato = document.getElementById('carboidrato')
    const elementoParaCategoriaSodio = document.getElementById('sodio')
    const elementoParaCategoriaGDTot = document.getElementById('gorduras_totais')
    const elementoParaCategoriaGDSat = document.getElementById('gorduras_saturadas')
    const elementoParaCategoriaGDTra = document.getElementById('gorduras_trans')
    const elementoParaCategoriaCafeina = document.getElementById('cafeina')
    const elementoParaCategoriaCreatina = document.getElementById('creatina')
    const elementoParaCategoriaBeta = document.getElementById('beta_alanina')
    
    cadastrarProduto(JSON.parse(localStorage.getItem("idProduto")), descricaoProduto.value, quantidade.value, valor.value.replace(',', '.'), conteudo.value,
        porcao.value, valor_energetico.value,
        elementoParaCategoriaSelect.value, elementoParaCategoriaSabor.value,
        elementoParaCategoriaProteina.value, elementoParaCategoriaCarboidrato.value,
        elementoParaCategoriaSodio.value, elementoParaCategoriaGDTot.value,
        elementoParaCategoriaGDSat.value, elementoParaCategoriaGDTra.value,
        elementoParaCategoriaCafeina.value, elementoParaCategoriaCreatina.value, elementoParaCategoriaBeta.value)

})

async function getBuscarProdutodois(id) {
    try {
        var consultaProduto = await fetch(`http://localhost:8080/produto/${id}`)
        var produto = await consultaProduto.json()
        if (produto.erro) {
            throw Error('Erro ao consultar a categoria!');
        }

        exibirCategoriaNaTelaEditar(produto)
    } catch (erro) {
        console.log(erro)
    }

}

function exibirCategoriaNaTelaEditar(produto) {

    elementoParaEditarCategoria.innerHTML = `
            <form class="principal-resultado-descricao">
                <div class="principal-resultado-descricao-descricao">
                    <h2 class="descricao">Descrição:</h2>
                    <input type="text" id="descricao" class="principal-opcoes-buscar-buscar" value="${produto.nome}">
                </div>
                <div class="principal-resultado-descricao-descricao">
                    <h2 class="descricao">Estoque:</h2>
                    <input type="text" id="quantidade" class="principal-opcoes-buscar-buscar" value="${produto.quantidade}">
                </div>
                <div class="principal-resultado-descricao-descricao">
                    <h2 class="descricao">Valor:</h2>
                    <input type="text" id="valor" class="principal-opcoes-buscar-buscar" value="${produto.valor}">
                </div>
                <div class="principal-resultado-descricao-descricao">
                    <h2 class="descricao">Conteúdo:</h2>
                    <input type="text" id="conteudo" class="principal-opcoes-buscar-buscar" value="${produto.conteudo}">
                </div>
                <div class="principal-resultado-descricao-descricao">
                    <h2 class="descricao">Porção:</h2>
                    <input type="text" id="porcao" class="principal-opcoes-buscar-buscar" value="${produto.porcao}">
                </div>
                <div class="principal-resultado-descricao-descricao">
                    <h2 class="descricao">Valor Energético:</h2>
                    <input type="text" id="valor_energetico" class="principal-opcoes-buscar-buscar" value="${produto.valor_energetico}">
                </div>
                <div class="principal-resultado-descricao-descricao">
                    <label for="selecao" class="descricao">Filtrar por:</label>
                    <select id="selecao_categoria-produto" name="selecao" class="padrao-select"> 
                        <option value="nada"></option>                          
                    </select>
                </div>
                <div class="principal-resultado-descricao-descricao">
                    <h2 class="descricao">Sabor:</h2>
                    <input type="text" id="sabor" class="principal-opcoes-buscar-buscar" disabled="disabled" value="${produto.sabor}">
                </div>
                <div class="principal-resultado-descricao-descricao">
                    <h2 class="descricao">Proteinas:</h2>
                    <input type="text" id="proteina" class="principal-opcoes-buscar-buscar" disabled="disabled" value="${produto.proteina}">
                </div>
            </form>   
            <form class="principal-resultado-descricao-segundo">
                <div class="principal-resultado-descricao-descricao-segundo">
                    <h2 class="descricao">Carboidratos:</h2>
                    <input type="text" id="carboidrato" class="principal-opcoes-buscar-buscar" disabled="disabled" value="${produto.carboidrato}">
                </div>
                <div class="principal-resultado-descricao-descricao-segundo">
                    <h2 class="descricao">Sódio:</h2>
                    <input type="text" id="sodio" class="principal-opcoes-buscar-buscar" disabled="disabled" value="${produto.sodio}">
                </div>
                <div class="principal-resultado-descricao-descricao-segundo">
                    <h2 class="descricao">Gorduras Totais:</h2>
                    <input type="text" id="gorduras_totais" class="principal-opcoes-buscar-buscar" disabled="disabled" value="${produto.gorduras_totais}">
                </div>
                <div class="principal-resultado-descricao-descricao-segundo">
                    <h2 class="descricao">Gorduras Saturadas:</h2>
                    <input type="text" id="gorduras_saturadas" class="principal-opcoes-buscar-buscar" disabled="disabled" value="${produto.gorduras_saturadas}">
                </div>
                <div class="principal-resultado-descricao-descricao-segundo">
                    <h2 class="descricao">Gorduras Trans:</h2>
                    <input type="text" id="gorduras_trans" class="principal-opcoes-buscar-buscar" disabled="disabled" value="${produto.gorduras_trans}">
                </div>
                <div class="principal-resultado-descricao-descricao-segundo">
                    <h2 class="descricao">Cafeína:</h2>
                    <input type="text" id="cafeina" class="principal-opcoes-buscar-buscar" disabled="disabled" value="${produto.cafeina}">
                </div>
                <div class="principal-resultado-descricao-descricao-segundo">
                    <h2 class="descricao">Creatina:</h2>
                    <input type="text" id="creatina" class="principal-opcoes-buscar-buscar" disabled="disabled" value="${produto.creatina}">
                </div>
                <div class="principal-resultado-descricao-descricao-segundo">
                    <h2 class="descricao">Beta Alanina:</h2>
                    <input type="text" id="beta_alanina" class="principal-opcoes-buscar-buscar" disabled="disabled" value="${produto.beta_alanina}">
                </div>
            </form>              
        `
    const elementoParaCategoriaSabor = document.getElementById('sabor')
    const elementoParaCategoriaProteina = document.getElementById('proteina')
    const elementoParaCategoriaCarboidrato = document.getElementById('carboidrato')
    const elementoParaCategoriaSodio = document.getElementById('sodio')
    const elementoParaCategoriaGDTot = document.getElementById('gorduras_totais')
    const elementoParaCategoriaGDSat = document.getElementById('gorduras_saturadas')
    const elementoParaCategoriaGDTra = document.getElementById('gorduras_trans')
    const elementoParaCategoriaCafeina = document.getElementById('cafeina')
    const elementoParaCategoriaCreatina = document.getElementById('creatina')
    const elementoParaCategoriaBeta = document.getElementById('beta_alanina')

    produto.sabor != "" ? elementoParaCategoriaSabor.removeAttribute("disabled") : elementoParaCategoriaSabor.setAttribute("disabled", "disabled");
    produto.proteina != "" ? elementoParaCategoriaProteina.removeAttribute("disabled") : elementoParaCategoriaProteina.setAttribute("disabled", "disabled");
    produto.carboidrato != "" ? elementoParaCategoriaCarboidrato.removeAttribute("disabled") : elementoParaCategoriaCarboidrato.setAttribute("disabled", "disabled");
    produto.sodio != "" ? elementoParaCategoriaSodio.removeAttribute("disabled") : elementoParaCategoriaSodio.setAttribute("disabled", "disabled");
    produto.gorduras_totais != "" ? elementoParaCategoriaGDTot.removeAttribute("disabled") : elementoParaCategoriaGDTot.setAttribute("disabled", "disabled");
    produto.gorduras_saturadas != "" ? elementoParaCategoriaGDSat.removeAttribute("disabled") : elementoParaCategoriaGDSat.setAttribute("disabled", "disabled");
    produto.gorduras_trans != "" ? elementoParaCategoriaGDTra.removeAttribute("disabled") : elementoParaCategoriaGDTra.setAttribute("disabled", "disabled");
    produto.cafeina != "" ? elementoParaCategoriaCafeina.removeAttribute("disabled") : elementoParaCategoriaCafeina.setAttribute("disabled", "disabled");
    produto.creatina != "" ? elementoParaCategoriaCreatina.removeAttribute("disabled") : elementoParaCategoriaCreatina.setAttribute("disabled", "disabled");
    produto.beta_alanina != "" ? elementoParaCategoriaBeta.removeAttribute("disabled") : elementoParaCategoriaBeta.setAttribute("disabled", "disabled");

    getBuscarCategorias(produto.categoria.id)

}

async function getBuscarCategorias(idCategoria) {
    var categorias = []
    try {
        var consultaCategoria = await fetch('http://localhost:8080/categoria')
        categorias = await consultaCategoria.json()

        if (categorias.erro) {
            throw Error('Erro ao consultar a categoria!');
        }

        exibirCategoriaNaTelaEditarProduto(categorias, idCategoria)
    } catch (erro) {
        console.log(erro)
    }
}

function exibirCategoriaNaTelaEditarProduto(listaDeCategorias, idCategoria) {
    const elementoParaCategoriaSelect = document.getElementById('selecao_categoria-produto')

    listaDeCategorias.forEach(categoria => {
        elementoParaCategoriaSelect.innerHTML += `
            <option value="${categoria.id}" id="${categoria.id}">${categoria.nome}</option>        
            `
    });

    const categoriaSelected = document.getElementById(`${idCategoria}`)
    categoriaSelected.selected = true

    elementoParaCategoriaSelect.addEventListener('change', () => {
        elementoParaCategoriaSelect.value != "nada" ? getBuscarCategoriaEspecifica(elementoParaCategoriaSelect.value) : console.log("");
    })

}

async function getBuscarCategoriaEspecifica(id) {
    try {
        var consultaCategoria = await fetch(`http://localhost:8080/categoria/${id}`)
        var categoria = await consultaCategoria.json()

        if (categoria.erro) {
            throw Error('Erro ao consultar a categoria!');
        }

        exibirCategoriaNaTelaCadastroEspecifico(categoria)
    } catch (erro) {
        console.log(erro)
    }
}

function exibirCategoriaNaTelaCadastroEspecifico(categoria) {

    const elementoParaCategoriaSabor = document.getElementById('sabor')
    const elementoParaCategoriaProteina = document.getElementById('proteina')
    const elementoParaCategoriaCarboidrato = document.getElementById('carboidrato')
    const elementoParaCategoriaSodio = document.getElementById('sodio')
    const elementoParaCategoriaGDTot = document.getElementById('gorduras_totais')
    const elementoParaCategoriaGDSat = document.getElementById('gorduras_saturadas')
    const elementoParaCategoriaGDTra = document.getElementById('gorduras_trans')
    const elementoParaCategoriaCafeina = document.getElementById('cafeina')
    const elementoParaCategoriaCreatina = document.getElementById('creatina')
    const elementoParaCategoriaBeta = document.getElementById('beta_alanina')

    elementoParaCategoriaSabor.value = ''
    elementoParaCategoriaProteina.value = ''
    elementoParaCategoriaCarboidrato.value = ''
    elementoParaCategoriaSodio.value = ''
    elementoParaCategoriaGDTot.value = ''
    elementoParaCategoriaGDSat.value = ''
    elementoParaCategoriaGDTra.value = ''
    elementoParaCategoriaCafeina.value = ''
    elementoParaCategoriaCreatina.value = ''
    elementoParaCategoriaBeta.value = ''


    categoria.sabor === true ? elementoParaCategoriaSabor.removeAttribute("disabled") : elementoParaCategoriaSabor.setAttribute("disabled", "disabled");
    categoria.proteina === true ? elementoParaCategoriaProteina.removeAttribute("disabled") : elementoParaCategoriaProteina.setAttribute("disabled", "disabled");
    categoria.carboidrato === true ? elementoParaCategoriaCarboidrato.removeAttribute("disabled") : elementoParaCategoriaCarboidrato.setAttribute("disabled", "disabled");
    categoria.sodio === true ? elementoParaCategoriaSodio.removeAttribute("disabled") : elementoParaCategoriaSodio.setAttribute("disabled", "disabled");
    categoria.gorduras_totais === true ? elementoParaCategoriaGDTot.removeAttribute("disabled") : elementoParaCategoriaGDTot.setAttribute("disabled", "disabled");
    categoria.gorduras_saturadas === true ? elementoParaCategoriaGDSat.removeAttribute("disabled") : elementoParaCategoriaGDSat.setAttribute("disabled", "disabled");
    categoria.gorduras_trans === true ? elementoParaCategoriaGDTra.removeAttribute("disabled") : elementoParaCategoriaGDTra.setAttribute("disabled", "disabled");
    categoria.cafeina === true ? elementoParaCategoriaCafeina.removeAttribute("disabled") : elementoParaCategoriaCafeina.setAttribute("disabled", "disabled");
    categoria.creatina === true ? elementoParaCategoriaCreatina.removeAttribute("disabled") : elementoParaCategoriaCreatina.setAttribute("disabled", "disabled");
    categoria.beta_alanina === true ? elementoParaCategoriaBeta.removeAttribute("disabled") : elementoParaCategoriaBeta.setAttribute("disabled", "disabled");
}

async function cadastrarProduto(id3, descricaoProduto, quantidade, valor, conteudo, porcao, valor_energetico, categoria, sabor, proteina, carboidrato, sodio, gorduras_totais, gorduras_saturadas, gorduras_trans, cafeina, creatina, beta_alanina) {
    var resposta = false
    try {
        var cadastrarCategoria = await fetch('http://localhost:8080/produto', {
            method: 'PUT',
            body: JSON.stringify({
                id: id3,
                nome: descricaoProduto,
                quantidade: quantidade,
                valor: valor,
                conteudo: conteudo,
                porcao: porcao,
                valor_energetico: valor_energetico,
                sabor: sabor,
                proteina: proteina,
                carboidrato: carboidrato,
                sodio: sodio,
                gorduras_totais: gorduras_totais,
                gorduras_saturadas: gorduras_saturadas,
                gorduras_trans: gorduras_trans,
                cafeina: cafeina,
                creatina: creatina,
                beta_alanina: beta_alanina,
                categoria: {
                    id: categoria
                }
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        resposta = await cadastrarCategoria.json()

        if (resposta === false) {
            alert("Não foi cadastrar o produto.")
        } else {
            alert("Produto alterado com sucesso!")
            window.location.href = "http://127.0.0.1:5500/TremboSuplemento/editarProduto.html";
        }

        if (resposta.erro) {
            throw Error('Erro ao alterar o produto!');
        }

    } catch (erro) {
        console.log(erro)
    }

}