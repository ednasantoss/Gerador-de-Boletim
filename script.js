function gerarBoletim(event) {
    event.preventDefault();
    let nome = document.getElementById("nome").value;
    if (nome.trim().length < 3) {
        alert("Nome completo deve ter pelo menos 3 caracteres");
        return;
    }
    const apenasLetras = /^[A-Za-zÀ-ÿ\s]+$/;

    if (!apenasLetras.test(nome)) {
        alert("O nome não pode conter números ou caracteres especiais!");
        return;
    }
    
    calcularMedia();
}


document.getElementById('form-boletim').addEventListener('submit', function (e) {
    e.preventDefault();

    let nome = document.getElementById('nome').value;
    let n1 = parseFloat(document.getElementById('nota1').value);
    let n2 = parseFloat(document.getElementById('nota2').value);
    let n3 = parseFloat(document.getElementById('nota3').value);

    let media = (n1 + n2 + n3) / 3;

    document.getElementById('res-nome').innerText = nome;
    document.getElementById('res-media').innerText = media.toFixed(1);
    document.getElementById('res-status').innerText = media >= 7 ? "Aprovado" : "Reprovado";

    document.getElementById('resultado').classList.remove('hidden');
});
function validarNota(nota) {
    if (nota === "") return false;
    let valor = parseFloat(nota.replace(',', '.'));
    return !isNaN(valor) && valor >= 0 && valor <= 10;
}