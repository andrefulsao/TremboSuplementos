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

const botaoCadastrarProduto = document.getElementById('botao-cadastrar-produto')

botaoCadastrarProduto.addEventListener('click', () => {
    const descricaoProduto = document.getElementById('descricao');
    const quantidade = document.getElementById('quantidade');
    const valor = document.getElementById('valor');
    const conteudo = document.getElementById('conteudo');
    const porcao = document.getElementById('porcao');
    const valor_energetico = document.getElementById('valor_energetico');

    
    console.log(valor.value.replace(',', '.'))
    cadastrarProduto(descricaoProduto.value, quantidade.value, valor.value.replace(',', '.'), conteudo.value, 
        porcao.value, valor_energetico.value, 
        elementoParaCategoriaSelect.value, elementoParaCategoriaSabor.value, 
        elementoParaCategoriaProteina.value, elementoParaCategoriaCarboidrato.value,
        elementoParaCategoriaSodio.value, elementoParaCategoriaGDTot.value,
        elementoParaCategoriaGDSat.value,elementoParaCategoriaGDTra.value,
        elementoParaCategoriaCafeina.value, elementoParaCategoriaCreatina.value, elementoParaCategoriaBeta.value)

})

getBuscarCategorias()

async function getBuscarCategorias() {
    var categorias = []
    try {
        var consultaCategoria = await fetch('http://localhost:8080/categoria')
        categorias = await consultaCategoria.json()

        if (categorias.erro) {
            throw Error('Erro ao consultar a categoria!');
        }

        exibirCategoriaNaTelaCadastro(categorias)
    } catch (erro) {
        console.log(erro)
    }
}

function exibirCategoriaNaTelaCadastro(listaDeCategorias) {
    listaDeCategorias.forEach(categoria => {
        //let disponibilidade = verificarDisponibilidadeDoLivro(livro)
        elementoParaCategoriaSelect.innerHTML += `
        <option value="${categoria.id}">${categoria.nome}</option>        
        `
    });

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

async function cadastrarProduto(descricaoProduto, quantidade, valor, conteudo, porcao, valor_energetico, categoria, sabor, proteina, carboidrato, sodio, gorduras_totais, gorduras_saturadas, gorduras_trans, cafeina, creatina, beta_alanina) {
    var resposta = false
    try {
        var cadastrarCategoria = await fetch('http://localhost:8080/produto', {
            method: 'POST',
            body: JSON.stringify({
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
            alert("Não foi possível cadastrar o produto.")
        } else {
            alert("Produto cadastrada com sucesso!")
            window.location.href = "http://127.0.0.1:5500/TremboSuplemento/cadastroProduto.html";
        }

        if (resposta.erro) {
            throw Error('Erro ao cadastrar o produto!');
        }

    } catch (erro) {
        console.log(erro)
    }

}