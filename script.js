let alunos = [];

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

function adicionarAluno() {
    const nome = document.getElementById("nome").value;
    const n1 = parseFloat(document.getElementById("n1").value);
    const n2 = parseFloat(document.getElementById("n2").value);
    const n3 = parseFloat(document.getElementById("n3").value);
    const tabela = document.getElementById("tabela-alunos");

    const novoAluno = { nome, n1, n2, n3, media, status };
    alunos.push(novoAluno);

    localStorage.setItem("alunos", JSON.stringify(alunos));

    const media = ((n1 + n2 + n3) / 3).toFixed(1);
    const status = media >= 7 ? "Aprovado" : "Reprovado";

    const novaLinha = `
        <tr>
            <td>${nome}</td>
            <td>${n1}</td>
            <td>${n2}</td>
            <td>${n3}</td>
            <td>${media}</td>
            <td>${status}</td>
        </tr>
    `;

    tabela.innerHTML += novaLinha;

    document.getElementById('form-boletim').reset();
}

document.getElementById('form-boletim').addEventListener('submit', adicionarAluno);


// isNaN significa "Not-a-Number", ele separa oque é um texto e o que é um número. a lógica é se isNaN(valor) for verdadeiro, significa que o valor não é um número e se for falso, significa que é um número.
// É o "filtro" do JavaScript para saber se ele pode fazer conta com aquilo ou se vai dar erro porque é apenas uma letra ou texto.
// O parseFloat é a ferramenta que você usa para avisar ao JavaScript: "Ei, isso que está entre aspas não é uma palavra, é um número com vírgula!". Ele serve para pegar um texto que tem números dentro e transformar em um número de verdade (com vírgula/ponto) para o JavaScript conseguir fazer conta.
// Ex: parseFloat("10.50") + 2 = 12.50. Sem o parseFloat, o JavaScript irá pegar essa soma "10.50" + 2, e vai grudar as duas coisas fazendo virar 10.502 como se fosse um texto e isso da erro na conta matemática.
// ponto flutuante é um número que pode ter casas decimais, como 10.5 ou 3.14.
// Sempre que for um formulario tem que escrever onsubmit no html para que o JavaScript consiga ler o envio e fazer as validações necessárias, sem isso o codigo não vai funcionar.