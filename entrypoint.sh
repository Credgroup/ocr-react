#!/bin/sh

# Gera o arquivo .env a partir das variáveis do ambiente
echo "Gerando arquivo .env a partir das variáveis do ambiente..."
echo "VITE_ENVIRONMENT_VARIABLE=$VITE_ENVIRONMENT_VARIABLE" > .env
echo "VITE_IMAGE_VERSION=$VITE_IMAGE_VERSION" >> .env

echo ".env gerado com sucesso:"
cat .env