let pagesData = [];
let currentPage = 0;
const itemsPerPage = 30; // Define quantos itens você deseja por página

function loadData() {
    fetch('dados_ceasa.json') // Nome do arquivo JSON
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            pagesData = data.slice(1); // Ignora a primeira linha (detalhes do boletim)
            displayPage(currentPage); // Exibe a primeira página
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

    currentPage = 0; // Resetar para a primeira página ao aplicar filtro
    displayPage(currentPage, searchTerm, sortExpensive, sortCheap);
}

function displayPage(page, searchTerm = '', sortExpensive = false, sortCheap = false) {
    const dataDisplay = document.getElementById('dataDisplay');
    dataDisplay.innerHTML = ''; // Limpa o conteúdo anterior

    // Criar cabeçalho da tabela
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

    // Filtrar os dados com base no termo de pesquisa
    const filteredData = pagesData.filter(row => 
        row[0].toLowerCase().includes(searchTerm) // Filtra pela primeira coluna (nome do produto)
    );

    // Ordenar os dados se necessário
    if (sortExpensive || sortCheap) {
        filteredData.sort((a, b) => {
            const priceA = a[2] ? parseFloat(a[2].replace(',', '.')) : 0; // Preço A
            const priceB = b[2] ? parseFloat(b[2].replace(',', '.')) : 0; // Preço B

            // Ordenar com base na escolha do usuário
            return sortExpensive ? priceB - priceA : priceA - priceB;
        });
    }

    const start = page * itemsPerPage; // Índice inicial
    const end = start + itemsPerPage; // Índice final
    const pageData = filteredData.slice(start, end); // Pega os dados da página atual

    if (pageData.length > 0) {
        pageData.forEach(row => {
            const rowElement = document.createElement('div');
            rowElement.className = 'data-row';

            // Adiciona cada célula da linha com os dados correspondentes
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

function toggleSort(checkbox) {
    const otherCheckbox = checkbox.id === 'sortExpensive' ? document.getElementById('sortCheap') : document.getElementById('sortExpensive');
    if (checkbox.checked) {
        otherCheckbox.checked = false; // Desmarcar o outro checkbox
    }
}

function nextPage() {
    if (currentPage < Math.ceil(pagesData.length / itemsPerPage) - 1) {
        currentPage++;
        displayPage(currentPage);
    }
}

function previousPage() {
    if (currentPage > 0) {
        currentPage--;
        displayPage(currentPage);
    }
}

// Chama loadData quando a página é carregada
window.onload = loadData;