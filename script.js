let alunos = [];

document.getElementById('form-boletim').addEventListener('submit', function (event) {
    event.preventDefault();

    let nome = document.getElementById("nome").value;
    let nota1 = parseFloat(document.getElementById("nota1").value);
    let nota2 = parseFloat(document.getElementById("nota2").value);
    let nota3 = parseFloat(document.getElementById("nota3").value);

    if (nome.trim().length < 3) {
        alert("Nome completo deve ter pelo menos 3 caracteres");
        return;
    }

    const apenasLetras = /^[A-Za-zÀ-ÿ\s]+$/;
    if (!apenasLetras.test(nome)) {
        alert("O nome não pode conter números ou caracteres especiais!");
        return;
    }
    let media = (nota1 + nota2 + nota3) / 3;
    let status = media >= 7 ? "Aprovado" : "Reprovado";

    document.getElementById('res-nome').innerText = nome;
    document.getElementById('res-media').innerText = media.toFixed(1);
    document.getElementById('res-status').innerText = status;
    document.getElementById('resultado').classList.remove('hidden');

    const tabela = document.getElementById("tabela-alunos");

    const novoAluno = {
        nome, nota1, nota2, nota3,
        media: media.toFixed(1),
        status
    };

    alunos.push(novoAluno);
    localStorage.setItem("alunos", JSON.stringify(alunos));

    tabela.innerHTML += `
        <tr>
            <td>${nome}</td>
            <td>${nota1}</td>
            <td>${nota2}</td>
            <td>${nota3}</td>
            <td>${media.toFixed(1)}</td>
            <td>${status}</td>
        </tr>
    `;

    document.getElementById('form-boletim').reset();
});

// isNaN significa "Not-a-Number", ele separa oque é um texto e o que é um número. a lógica é se isNaN(valor) for verdadeiro, significa que o valor não é um número e se for falso, significa que é um número.
// É o "filtro" do JavaScript para saber se ele pode fazer conta com aquilo ou se vai dar erro porque é apenas uma letra ou texto.
// O parseFloat é a ferramenta que você usa para avisar ao JavaScript: "Ei, isso que está entre aspas não é uma palavra, é um número com vírgula!". Ele serve para pegar um texto que tem números dentro e transformar em um número de verdade (com vírgula/ponto) para o JavaScript conseguir fazer conta.
// Ex: parseFloat("10.50") + 2 = 12.50. Sem o parseFloat, o JavaScript irá pegar essa soma "10.50" + 2, e vai grudar as duas coisas fazendo virar 10.502 como se fosse um texto e isso da erro na conta matemática.
// ponto flutuante é um número que pode ter casas decimais, como 10.5 ou 3.14.
// Nem sempre é necessário usar o onsubmit no HTML, mas é uma boa prática para garantir que o JavaScript consiga ler o envio do formulário.