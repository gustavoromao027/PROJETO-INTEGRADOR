import json

# Nome do arquivo com os dados extraídos pelo main.py
arquivo_dados = "dados_extraidos.json"

# Nome do arquivo de saída que será lido pelo site
arquivo_saida = "dados_ceasa.json"

# Lendo os dados extraídos
with open(arquivo_dados, "r") as file:
    dados = json.load(file)

# Formatando os dados para uso no site
# Exemplo: cada item deve ter as seis primeiras colunas, como em [["Produto A", "R$10", ...], ["Produto B", ...]]
# Se os dados estiverem nesse formato já, essa etapa pode ser omitida.
dados_formatados = [
    [item[:6] for item in pagina]  # Mantendo as 6 primeiras colunas por página
    for pagina in dados
]

# Salvando no arquivo final no formato JSON
with open(arquivo_saida, "w") as json_file:
    json.dump(dados_formatados, json_file)

print(f"{arquivo_saida} gerado com sucesso.")
