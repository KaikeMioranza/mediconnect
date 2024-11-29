import csv
import mysql.connector
from mysql.connector import Error

# Configuração do banco de dados MySQL
db_config = {
    'host': 'localhost',      # Endereço do servidor MySQL
    'database': 'medic',     # Nome do banco de dados
    'user': 'root',           # Usuário do MySQL
    'password': 'masterkey',      # Senha do MySQL
}

# Função para conectar ao MySQL
def conectar_mysql():
    try:
        conn = mysql.connector.connect(**db_config)
        if conn.is_connected():
            print("Conexão com o MySQL estabelecida com sucesso!")
            return conn
    except Error as e:
        print(f"Erro ao conectar ao MySQL: {e}")
        return None

# Função para inserir os dados no banco
def inserir_dados(conn, dados):
    cursor = conn.cursor()
    query = """
        INSERT INTO cadastroteste(nome, cpf, data_nascimento, genero, endereco, telefone, data_cadastro, condicao_saude)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """
    cursor.executemany(query, dados)
    conn.commit()
    print(f"{cursor.rowcount} registros inseridos com sucesso.")

def truncar_endereco(endereco, limite=255):
    if len(endereco) > limite:
        return endereco[:limite]  # Trunca para o limite de 255 caracteres
    return endereco

# Ler os dados do arquivo CSV e preparar para inserção no MySQL
def ler_e_inserir_csv(nome_arquivo, conn):
    dados_para_inserir = []
    
    with open(nome_arquivo, mode='r', encoding='utf-8') as file:
        reader = csv.reader(file)
        next(reader)  # Pular o cabeçalho
        
        for linha in reader:
            # Tratar campos e ajustar dados conforme necessário
            nome = linha[0]
            cpf = linha[1]
            data_nascimento = linha[2]
            genero = linha[3]
            endereco = truncar_endereco(linha[4])
            telefone = linha[5]
            data_cadastro = linha[6]
            condicao_saude = linha[7]
            
            dados = (
                nome,               # Nome
                cpf,                # CPF
                data_nascimento,    # Data de Nascimento
                genero,             # Gênero
                endereco,           # Endereço
                telefone,           # Telefone
                data_cadastro,      # Data de Cadastro
                condicao_saude      # Condição de Saúde
            )
            dados_para_inserir.append(dados)
    
    # Inserir os dados no banco de dados
    inserir_dados(conn, dados_para_inserir)

# Main
def main():
    nome_arquivo = 'pacientes_sus.csv'  # Caminho do arquivo CSV
    conn = conectar_mysql()
    
    if conn:
        ler_e_inserir_csv(nome_arquivo, conn)
        conn.close()  # Fechar a conexão

if __name__ == "__main__":
    main()
