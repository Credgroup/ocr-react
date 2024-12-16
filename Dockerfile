# Etapa 1: Construção com Node.js
FROM node:latest AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Executar o Gulp para construir o projeto
RUN npm run build

# Etapa 2: Usar a imagem do Nginx para servir o projeto compilado
FROM nginx:latest

# Copiar os arquivos compilados (do diretório 'dist') para o diretório do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar o script de entrada
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Executar o script de entrada no momento de inicialização do container
ENTRYPOINT ["/entrypoint.sh"]

# Expor a porta 80 para o Nginx
EXPOSE 80

# Comando padrão para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]