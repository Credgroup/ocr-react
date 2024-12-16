#!/bin/sh

# Iniciando o processo de criação do arquivo .env
echo "Gerando arquivo .env..."

# Log de cada variável de ambiente
echo "Valor de VITE_ENVIRONMENT_VARIABLE: ${VITE_ENVIRONMENT_VARIABLE:-development}"
echo "Valor de VITE_IMAGE_VERSION: ${VITE_IMAGE_VERSION}"

# Criando o arquivo .env com as variáveis de ambiente
echo "VITE_ENVIRONMENT_VARIABLE=${VITE_ENVIRONMENT_VARIABLE:-development}" > /app/.env
echo "VITE_IMAGE_VERSION=${VITE_IMAGE_VERSION}" >> /app/.env

# Log indicando que o .env foi gerado
echo ".env gerado com sucesso!"

# Executando o comando da sua aplicação (no caso, o Nginx)
exec "$@"