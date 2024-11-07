# Portal de Preços - Ceasa

## Descrição
Este é um portal desenvolvido para exibir os preços dos produtos da Ceasa-ES, com dados atualizados diariamente, incluindo uma interface com busca, filtros e a possibilidade de baixar o boletim em PDF.

## Pré-requisitos
- **Python 3**
- **Bibliotecas Python**: pdfplumber  
  Instalação:
  ```bash
  pip install pdfplumber

## Estrutura do Projeto
- **src**: Contém o HTML, CSS e JavaScript principais.
  - `index.html`: Estrutura da página principal.
  - `styles.css`: Contém o CSS para estilização do portal.
  - `script.js`: Contém o JavaScript para funcionalidade do portal.
- **assets**: Contém recursos adicionais.
  - `boletimcompleto.pdf`: PDF com os preços diários.
  - `dados_ceasa`: JSON com os dados do Ceasa.
  - `icon.png/`: Ícones e imagens utilizadas no projeto.
- **scripts**: Extração de dados.
  - `processa_dados.py/`: Script para gerar dados para o JSON.
- **docs**: Documentação do Portal.
  - `PROJETO INTEGRADOR 3.pdf`: Leitura em PDF.
  - `PROJETO INTEGRADOR 3.docx`: Leitura em Docx.

## Como rodar o projeto
1. Clone o repositório:
   ```bash
   - git clone https://github.com/gustavoromao027/PROJETO-INTEGRADOR-3
2. Extração de Dados do PDF:
   - Utilize a processa_dados.py para extrair dados do PDF e gerar o arquivo dados_ceasa.json.
   ```bash
   - python scripts/processa_dados.py
3. Iniciar o Servidor Local:
   - Abra um terminal no diretório src/ e inicie um servidor local.
   ```bash
   - python -m http.server
   - Acesse http://localhost:8000 no navegador para visualizar o portal.

## Demonstração do Projeto
[Assista à demonstração no YouTube](https://youtu.be/c8hVL7JL5Lc)

## Autor
Gustavo Romão  
Projeto desenvolvido como parte do [PROJETO INTEGRADOR 3]. 