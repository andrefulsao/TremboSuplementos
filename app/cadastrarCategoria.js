const botaoCadastrar = document.getElementById('botao-cadastrar')

var sabor = false
var proteina = false
var carboidrato = false
var sodio = false
var gorduras_totais = false
var gorduras_saturadas = false
var gorduras_trans = false
var cafeina = false
var creatina = false
var beta_alanina = false

botaoCadastrar.addEventListener('click', () => {
    const descricao = document.getElementById('descricao')
    const descricaoValor = descricao.value
    const elementosCheckbox = document.querySelectorAll('input[type="checkbox"]')

    elementosCheckbox.forEach(checkbox => {
        if (checkbox.checked) {
            switch (checkbox.value) {
                case 'sabor':
                    sabor = true
                    break;
                case 'proteina':
                    proteina = true
                    break;
                case 'carboidrato':
                    carboidrato = true                    
                    break;
                case 'sodio':
                    sodio = true
                    break;
                case 'gorduras_totais':
                    gorduras_totais = true
                    break;
                case 'gorduras_saturadas':
                    gorduras_saturadas = true
                    break;
                case 'gorduras_trans':
                    gorduras_trans = true
                    break;
                case 'cafeina':
                    cafeina = true
                    break;
                case 'creatina':
                    creatina = true
                    break;
                case 'beta_alanina':
                    beta_alanina = true
                    break;
            }
        }
    });   
    
    cadastrarCategoria(descricaoValor, sabor, proteina, carboidrato, sodio, gorduras_totais, gorduras_saturadas, gorduras_trans, cafeina, creatina, beta_alanina)
})


async function cadastrarCategoria(descricaoValor, sabor, proteina, carboidrato, sodio, gorduras_totais, gorduras_saturadas, gorduras_trans, cafeina, creatina, beta_alanina) {       
    var resposta = false  
    try {
        var cadastrarCategoria = await fetch('http://localhost:8080/categoria', {
            method: 'POST',
            body: JSON.stringify({
                nome: descricaoValor,
                sabor: sabor,
                proteina: proteina,
                carboidrato: carboidrato,
                sodio: sodio,
                gorduras_totais: gorduras_totais,
                gorduras_saturadas: gorduras_saturadas,
                gorduras_trans: gorduras_trans,
                cafeina: cafeina,
                creatina: creatina,
                beta_alanina: beta_alanina
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })        
        resposta = await cadastrarCategoria.json()        

        if(resposta === false){
            alert("Não foi cadastrar a categoria, Já existe outra categoria com este nome.")
        }else{
            alert("Categoria cadastrada com sucesso!")
            window.location.href = "http://127.0.0.1:5500/TremboSuplemento/cadastroCategoria.html";
        }        

        if (resposta.erro) {
            throw Error('Erro ao cadastrar a categoria!');
        }
        
    } catch (erro) {
        console.log(erro)
    }

}