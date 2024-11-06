// Autor: Gustavo Romão
// Projeto: Portal de Preços - Ceasa
// Data de criação: 29/10/2024
// Descrição: MANIPULAÇÃO E EXIBIÇÃO DOS DADOS E FUNÇÕES DA TELA

let pagesData = [];
let currentPage = 0;
const itemsPerPage = 30; //QUANTIDADE DE ITENS POR PAGINA

function loadData() {
    fetch('../assets/dados_ceasa.json') //BUSCANDO O JSON
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            pagesData = data.slice(1); // IGNORA A PRIMEIRA LINHA (DETALHES DO BOLETIM)
            displayPage(currentPage); // EXIBE A PRIMEIRA PAGINA
        })
        .catch(error => {
            console.error('Houve um problema com a requisição Fetch:', error);
            document.getElementById('dataDisplay').innerHTML = '<p>Erro ao carregar os dados.</p>';
        });
}

function applyFilter() {
    const searchTerm = document.getElementById('searchBox').value.toLowerCase();
    const sortExpensive = document.getElementById('sortExpensive').checked;
    const sortCheap = document.getElementById('sortCheap').checked;

    currentPage = 0; // RESETAR PARA A 1 PAGINA AO APLICAR O FILTRO
    displayPage(currentPage, searchTerm, sortExpensive, sortCheap);
}

function displayPage(page, searchTerm = '', sortExpensive = false, sortCheap = false) {
    const dataDisplay = document.getElementById('dataDisplay');
    dataDisplay.innerHTML = ''; // LIMPAR O CONTEUDO ANTERIOR

    // CABEÇALO DA TABELA
    const headerRow = document.createElement('div');
    headerRow.className = 'header-row';
    const headers = ['PRODUTO', 'EMBALAGEM', 'MIN', 'M.C.', 'MAX', 'SITUAÇÃO'];
    headers.forEach(headerText => {
        const headerCell = document.createElement('span');
        headerCell.className = 'header-cell';
        headerCell.textContent = headerText;
        headerRow.appendChild(headerCell);
    });
    dataDisplay.appendChild(headerRow);

    //FILTRAR COM BASE NO NOME
    const filteredData = pagesData.filter(row => 
        row[0].toLowerCase().includes(searchTerm) // FILTRA PELA 1 COLUNA (nome do produto)
    );

    //ORDENAR DADOS SE NECESSARIO
    if (sortExpensive || sortCheap) {
        filteredData.sort((a, b) => {
            const priceA = a[2] ? parseFloat(a[2].replace(',', '.')) : 0; // PREÇO A
            const priceB = b[2] ? parseFloat(b[2].replace(',', '.')) : 0; // PREÇO B

            //ORDENAR COM BASE NA ESCOLHA DO USUARIO
            return sortExpensive ? priceB - priceA : priceA - priceB;
        });
    }

    const start = page * itemsPerPage; // INDICE INICIAL
    const end = start + itemsPerPage; // INDICE FINAL
    const pageData = filteredData.slice(start, end); // PEGA OS DADOS DA PAGINA ATUAL

    if (pageData.length > 0) {
        pageData.forEach(row => {
            const rowElement = document.createElement('div');
            rowElement.className = 'data-row';

            // ADICIONA CADA CÉLULA DE LINHA COM OS DADOS CORRESPONDENTES
            row.forEach(cellData => {
                const cell = document.createElement('span');
                cell.className = 'data-cell';
                cell.textContent = cellData;
                rowElement.appendChild(cell);
            });

            dataDisplay.appendChild(rowElement);
        });
        document.getElementById('pageIndicator').textContent = `Página ${page + 1}`;
    } else {
        dataDisplay.innerHTML = '<p>Sem dados para exibir nesta página.</p>';
    }
}


// NÃO MARCAR 2 CHECKBOX AO MESMO TEMPO
function toggleSort(checkbox) {
    const otherCheckbox = checkbox.id === 'sortExpensive' ? document.getElementById('sortCheap') : document.getElementById('sortExpensive');
    if (checkbox.checked) {
        otherCheckbox.checked = false;
    }
}
// PROXIMA PAGINA >>>
function nextPage() {
    if (currentPage < Math.ceil(pagesData.length / itemsPerPage) - 1) {
        currentPage++;
        displayPage(currentPage);
    }
}
// PAGINA ANTERIOR <<<
function previousPage() {
    if (currentPage > 0) {
        currentPage--;
        displayPage(currentPage);
    }
}
// CHAMA loadData QUANDO A PAGINA É CARREGADA
window.onload = loadData;
