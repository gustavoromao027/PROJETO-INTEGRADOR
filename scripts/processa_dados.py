# Autor: Gustavo Romão
# Projeto: Portal de Preços - Ceasa
# Data de criação: 29/10/2024
# Descrição: SRIPT PRINCIPAL PARA EXTRAIR E PROCESSAR OS DADOS DO PDF PAR JSON.

import pdfplumber
import json

pdf_path = "assets/boletimcompleto.pdf"
dados_ceasa = []
with pdfplumber.open(pdf_path) as pdf:
    for numero_pagina, pagina in enumerate(pdf.pages, start=1):
        tabelas = pagina.extract_tables()
        if tabelas:
            for tabela in tabelas:
                for linha in tabela:
                    dados_ceasa.append(linha) #ARMAZENA TODAS AS LINHAS NA LISTA
            print(f"!!! DADOS PROCESSADOS COM SUCESSO !!!")
        else:
            print(f"Não foram encontradas tabelas na página {numero_pagina}.")
            
# SALVA OS DADOS EXTRAIDOS NO JSON
with open("assets/dados_ceasa.json", "w") as json_file:
    json.dump(dados_ceasa, json_file)