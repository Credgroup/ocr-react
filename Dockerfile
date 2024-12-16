FROM node:latest AS build

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos do package.json e package-lock.json para dentro do contêiner
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia todos os arquivos do diretório atual para dentro do contêiner
COPY . .

# Compila a aplicação React
RUN npm run build

# Expõe a porta 3000 para fora do contêiner
EXPOSE 5173

# Define o comando que será executado quando o contêiner for iniciado
CMD [ "npm", "run", "preview" ]