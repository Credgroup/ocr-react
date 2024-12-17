#!/bin/sh

# Gera o arquivo .env a partir das variáveis do ambiente
echo "Gerando arquivo .env a partir das variáveis do ambiente..."
echo "VITE_API_URL=$VITE_API_URL" > .env
echo "VITE_ENV=$VITE_ENV" >> .env

echo ".env gerado com sucesso:"
cat .env
