# Base da imagem
FROM node:22

# Diretório de trabalho no container
WORKDIR /app

# Copiar os arquivos de definição de dependências (package.json e package-lock.json)
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante dos arquivos do projeto para o diretório de trabalho
COPY . .

# Copiar o script entrypoint.sh para dentro do container
COPY entrypoint.sh /app/entrypoint.sh

# Garantir que o script seja executável
RUN chmod +x /app/entrypoint.sh

# Definir o entrypoint para o script
ENTRYPOINT ["/app/entrypoint.sh"]

# Comando padrão para rodar a aplicação
CMD ["npm", "start"]