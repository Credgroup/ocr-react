# Etapa 1: Build do App com Vite
FROM node:latest AS build

# Diretório de trabalho
WORKDIR /app

# Copia os arquivos necessários
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código
COPY . .

# Copia o script de geração dinâmica do .env
COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

# Executa o entrypoint para gerar o .env
RUN ./entrypoint.sh

# Executa o build do projeto após o .env estar pronto
RUN npm run build

# Etapa 2: Servindo o App com NGINX
FROM nginx:latest

# Copia os arquivos gerados na etapa anterior para a pasta padrão do NGINX
COPY --from=builder /app/dist /usr/share/nginx/html

# Expondo a porta padrão do NGINX
EXPOSE 80

# Comando padrão para rodar o NGINX
CMD ["nginx", "-g", "daemon off;"]