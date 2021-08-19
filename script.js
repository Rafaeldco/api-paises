const input = document.querySelector('.busca');
const paises = document.querySelector('.paises');
const modal = document.querySelector('.modal__container');
const imgModal = document.querySelector('.modal__img');
const nomeModal = document.querySelector('.modal__nome');
const regiaoModal = document.querySelector('.modal__regiao');
const capitalModal = document.querySelector('.modal__capital');
const populacaoModal = document.querySelector('.modal__populacao');

const botaoProximoPais = document.querySelector('.next');
const botaoPaisAnterior = document.querySelector('.previous');
const botaoFechar = document.querySelector('.close');

let indiceAtual = 0;

//Requisição à API externa e criação dos elementos na página
const promiseResposta = fetch('https://restcountries.eu/rest/v2/all');

promiseResposta.then(function (resposta) {
    const promiseBody = resposta.json();

    promiseBody.then(function (body) {
        body.forEach(function (pais, index) {
            const divContainer = document.createElement('div');
            divContainer.classList.add('container__div');

            const nome = document.createElement('h2');
            nome.classList.add('nome');
            nome.textContent = pais.name;

            const regiao = document.createElement('span');
            regiao.classList.add('regiao');
            regiao.textContent = 'Região: ' + pais.region;

            const capital = document.createElement('span');
            capital.classList.add('capital');
            capital.textContent = 'Capital: ' + pais.capital;

            const populacao = document.createElement('p');
            populacao.classList.add('populacao');
            populacao.textContent = 'População: ' + pais.population;

            const bandeira = document.createElement('img');
            bandeira.classList.add('paises__bandeira');
            bandeira.src = pais.flag;

            const codigoPais = document.createElement('h3');
            codigoPais.textContent = pais.alpha3Code;
            codigoPais.style.display = 'none';

            divContainer.append(nome, regiao, capital, populacao, bandeira, codigoPais);
            paises.append(divContainer);

            const divsPaises = document.querySelectorAll('.container__div');

            input.addEventListener('keydown', function filtrarPais(event) {
                if (event.key !== 'Enter') {
                    return;
                }
                divsPaises.forEach(function (pais) {
                    if (event.target.value === "") {
                        pais.style.display = 'flex';
                        return;
                    }
                    if (event.target.value === pais.querySelector('h2').textContent || event.target.value === pais.querySelector('h3').textContent) {
                        pais.style.display = 'flex';
                    }
                    else {
                        pais.style.display = 'none';
                    }
                });
            });
            //Criação do Modal
            divContainer.addEventListener('click', function abrirModal() {
                indiceAtual = index;
                verificarBotoesModal(body);
                console.log(indiceAtual);

                modal.style.display = 'flex';
                nomeModal.textContent = pais.name;
                regiaoModal.textContent = 'Região: ' + pais.region;
                capitalModal.textContent = 'Capital: ' + pais.capital;
                populacaoModal.textContent = 'População: ' + pais.population;
                imgModal.src = pais.flag;
                //Remoção do Modal
                botaoFechar.addEventListener('click', function (event) {
                    modal.style.display = 'none';
                });
            });
        });
        botaoProximoPais.addEventListener('click', function (event) {
            event.preventDefault();
            indiceAtual++;
            verificarBotoesModal(body);
            atualizarPaisModal(body);
            console.log(indiceAtual);
        });

        botaoPaisAnterior.addEventListener('click', function (event) {
            event.preventDefault();
            indiceAtual--;
            verificarBotoesModal(body);
            atualizarPaisModal(body);
            console.log(indiceAtual);
        });
    });
});
//Função para atualizar as informações do modal ao passar para o próximo país ou retornar ao anterior
function atualizarPaisModal(dados) {
    nomeModal.textContent = dados[indiceAtual].name;
    regiaoModal.textContent = 'Região: ' + dados[indiceAtual].region;
    capitalModal.textContent = 'Capital: ' + dados[indiceAtual].capital;
    populacaoModal.textContent = 'População: ' + dados[indiceAtual].population;
    imgModal.src = dados[indiceAtual].flag;
}

function verificarBotoesModal(dados) {
    if (indiceAtual === 0) {
        botaoPaisAnterior.style.display = 'none';
        botaoProximoPais.style.display = 'flex';
    }
    else if (indiceAtual === dados.length - 1) {
        botaoPaisAnterior.style.display = 'flex';
        botaoProximoPais.style.display = 'none';
    }
    else {
        botaoPaisAnterior.style.display = 'flex';
        botaoProximoPais.style.display = 'flex';
    }
}
