
const email = document.getElementById('usuario')
const senha = document.getElementById('senha')
const botaoEntrar = document.getElementById('entrar')
var resposta = false

botaoEntrar.addEventListener('click', () =>{     
    const endpointDaAPI = `http://localhost:8080/usuario/logar/${email.value}/${senha.value}`
    getValidarUsuarioAPI(endpointDaAPI)    
})

async function getValidarUsuarioAPI(endpointDaAPI) {
    const res = await fetch(endpointDaAPI) 
    resposta = await res.json()
    validarUsuario(resposta)       
}

function validarUsuario(resposta){
    if(resposta === true){
        window.location.href = "http://127.0.0.1:5500/TremboSuplemento/categoria.html";
    }else{
        alert('Usuario ou senha incorreta!')
    }
}