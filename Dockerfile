# Etapa 1: Usar uma imagem do Node.js para instalar as dependências e compilar o projeto
FROM node:latest AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Executar o Gulp para construir o projeto
RUN npm run build

# Etapa 2: Usar a imagem do Nginx para servir o projeto compilado
# FROM nginx:latest

# Copie o script de entrada para manipular variáveis
#COPY ./img /usr/share/nginx/html/img

# WORKDIR /usr/share/nginx/html
# COPY --from=build /app/dist .

# Copie o script de entrada para manipular variáveis
COPY ./entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

# Executar o script de entrada no momento de inicialização do container
ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 5173

CMD [ "npm", "run", "preview" ]
# CMD ["nginx", "-g", "daemon off;"]