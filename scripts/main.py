import pdfplumber
import json

pdf_path = "boletimcompleto.pdf"
dados_ceasa = []

with pdfplumber.open(pdf_path) as pdf:
    for numero_pagina, pagina in enumerate(pdf.pages, start=1):
        tabelas = pagina.extract_tables()
        if tabelas:
            for tabela in tabelas:
                for linha in tabela:
                    dados_ceasa.append(linha)  # Armazena todas as linhas na lista
        else:
            print(f"Não foram encontradas tabelas na página {numero_pagina}.")

# Salva os dados extraídos em um arquivo JSON
with open("dados_ceasa.json", "w") as json_file:
    json.dump(dados_ceasa, json_file)