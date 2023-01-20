document.addEventListener("DOMContentLoaded",function(){
    document.getElementById("form-sorteador").addEventListener("submit",function(e){
        e.preventDefault();
        let valorMaximo = document.getElementById("max-number").value;
        valorMaximo = parseInt(valorMaximo)
        let aleatorio = Math.random() * valorMaximo;
        aleatorio = Math.floor(aleatorio)+1;
        document.getElementById("valor-resultado").innerText = aleatorio;
        document.querySelector('.resultado').style.display = 'block';
    })
})