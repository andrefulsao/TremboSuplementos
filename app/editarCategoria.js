getBuscarCategoriasdois(JSON.parse(localStorage.getItem("id")))
const elementoParaEditarCategoria = document.getElementById('principal-resultado-editar')


async function getBuscarCategoriasdois(id) {
    try {
        var consultaCategoria = await fetch(`http://localhost:8080/categoria/${id}`)
        var categorias = await consultaCategoria.json()
        if (categorias.erro) {
            throw Error('Erro ao consultar a categoria!');
        }

        exibirCategoriaNaTelaEditar(categorias)
    } catch (erro) {

    }

}

function exibirCategoriaNaTelaEditar(categoria) {
    const sabor1 = categoria.sabor === true ? "checked" : "unchecked";
    const proteina1 = categoria.proteina === true ? "checked" : "unchecked";
    const carboidrato1 = categoria.carboidrato === true ? "checked" : "unchecked";
    const sodio1 = categoria.sodio === true ? "checked" : "unchecked";
    const gorduras_totais1 = categoria.gorduras_totais === true ? "checked" : "unchecked";
    const gorduras_saturadas1 = categoria.gorduras_saturadas === true ? "checked" : "unchecked";
    const gorduras_trans1 = categoria.gorduras_trans === true ? "checked" : "unchecked";
    const cafeina1 = categoria.cafeina === true ? "checked" : "unchecked";
    const creatina1 = categoria.creatina === true ? "checked" : "unchecked";
    const beta_alanina1 = categoria.beta_alanina === true ? "checked" : "unchecked";

    elementoParaEditarCategoria.innerHTML = `
    <form class="principal-resultado-descricao">
        <div class="principal-resultado-descricao-descricao">
            <input type="text" id="idAtual" class="principal-opcoes-buscar-buscar" disabled="" value="${categoria.id}">
            <input type="text" id="descricaoAtual" class="principal-opcoes-buscar-buscar" disabled="" value="${categoria.nome}">
        </div>
    </form>
    <div class="principal-resultado-checkbox">
        <form class="principal-resultado-checkbox-checkbox">
            <h2 class="descricao">Habilitar campos para o produto:</h2>
            <div>
                <input type="checkbox" id="sabor" name="sabor" value="sabor" ${sabor1}>
                <label for="sabor"> Habilitar campo sabor</label><br>
            </div>
            <div>
                <input type="checkbox" id="proteina" name="proteina" value="proteina" ${proteina1}>
                <label for="proteina"> Habilitar campo proteina</label><br>
            </div>
            <div>
                <input type="checkbox" id="carboidrato" name="carboidrato" value="carboidrato" ${carboidrato1}>
                <label for="carboidrato"> Habilitar campo carboidrato</label>
            </div>
            <div>
                <input type="checkbox" id="sodio" name="sodio" value="sodio" ${sodio1}>
                <label for="sodio"> Habilitar campo sodio</label>
            </div>
            <div>
                <input type="checkbox" id="gorduras_totais" name="gorduras_totais" value="gorduras_totais" ${gorduras_totais1}>
                <label for="gorduras_totais"> Habilitar campo gorduras totais</label>
            </div>
            <div>
                <input type="checkbox" id="gorduras_saturadas" name="gorduras_saturadas"
                    value="gorduras_saturadas" ${gorduras_saturadas1}>
                <label for="gorduras_saturadas"> Habilitar campo gorduras saturadas</label>
            </div>
            <div>
                <input type="checkbox" id="gorduras_trans" name="gorduras_trans" value="gorduras_trans" ${gorduras_trans1}>
                <label for="gorduras_trans"> Habilitar campo gorduras trans</label>
            </div>
            <div>
                <input type="checkbox" id="cafeina" name="cafeina" value="cafeina" ${cafeina1}>
                <label for="cafeina"> Habilitar campo creatina</label>
            </div>
            <div>
                <input type="checkbox" id="creatina" name="creatina" value="creatina" ${creatina1}>
                <label for="creatina"> Habilitar campo creatina</label>
            </div>
            <div>
                <input type="checkbox" id="beta_alanina" name="beta_alanina" value="beta_alanina" ${beta_alanina1}>
                <label for="beta_alanina"> Habilitar campo beta alanina</label>
            </div>
        </form>
    </div>        
        `

    const btnSalvar = document.getElementById('botao-salvar')

    btnSalvar.addEventListener('click', () => {
        const elementosCheckbox = document.querySelectorAll('input[type="checkbox"]')
        const idAtual = document.getElementById('idAtual')
        const nomeAtual = document.getElementById('descricaoAtual')
        var sabor2 = false
        var proteina2 = false
        var carboidrato2 = false
        var sodio2 = false
        var gorduras_totais2 = false
        var gorduras_saturadas2 = false
        var gorduras_trans2 = false
        var cafeina2 = false
        var creatina2 = false
        var beta_alanina2 = false

        elementosCheckbox.forEach(checkbox2 => {
            if (checkbox2.checked) {
                switch (checkbox2.value) {
                    case 'sabor':
                        sabor2 = true
                        break;
                    case 'proteina':
                        proteina2 = true
                        break;
                    case 'carboidrato':
                        carboidrato2 = true
                        break;
                    case 'sodio':
                        sodio2 = true
                        break;
                    case 'gorduras_totais':
                        gorduras_totais2 = true
                        break;
                    case 'gorduras_saturadas':
                        gorduras_saturadas2 = true
                        break;
                    case 'gorduras_trans':
                        gorduras_trans2 = true
                        break;
                    case 'cafeina':
                        cafeina2 = true
                        break;
                    case 'creatina':
                        creatina2 = true
                        break;
                    case 'beta_alanina':
                        beta_alanina2 = true
                        break;
                }
            }
        });

        salvarCategoria(idAtual.value, nomeAtual.value, sabor2, proteina2, carboidrato2, sodio2, gorduras_totais2, gorduras_saturadas2, gorduras_trans2, cafeina2, creatina2, beta_alanina2)
    })
}


async function salvarCategoria(id2, descricaoValor2, sabor2, proteina2, carboidrato2, sodio2, gorduras_totais2, gorduras_saturadas2, gorduras_trans2, cafeina2, creatina2, beta_alanina2) {
    console.log(id2, descricaoValor2)
    var resposta = false
    try {
        var alterarCategoria = await fetch('http://localhost:8080/categoria', {
            method: 'PUT',
            body: JSON.stringify({
                id: id2,
                nome: descricaoValor2,
                sabor: sabor2,
                proteina: proteina2,
                carboidrato: carboidrato2,
                sodio: sodio2,
                gorduras_totais: gorduras_totais2,
                gorduras_saturadas: gorduras_saturadas2,
                gorduras_trans: gorduras_trans2,
                cafeina: cafeina2,
                creatina: creatina2,
                beta_alanina: beta_alanina2
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        resposta = await alterarCategoria.json()

        if (resposta === false) {
            alert("Não foi salvar a categoria.")
        } else {
            alert("Categoria alterada com sucesso!")
            window.location.href = "http://127.0.0.1:5500/TremboSuplemento/editarCategoria.html";
        }

        if (resposta.erro) {
            throw Error('Erro ao cadastrar a categoria!');
        }

    } catch (erro) {
        console.log(erro)
    }

}