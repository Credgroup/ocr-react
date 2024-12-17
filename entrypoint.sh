#!/bin/bash

# Defina as variáveis de ambiente que você quer no .env
declare -A ENV_VARS=(
  ["VITE_ENVIRONMENT_VARIABLE"]=$VITE_ENVIRONMENT_VARIABLE
  ["VITE_IMAGE_VERSION"]=$VITE_IMAGE_VERSION
)

# Função para escrever as variáveis no arquivo .env
write_env_file() {
  echo "Removendo arquivo .env existente, se houver, e criando um novo..."

  # Remove o arquivo .env se já existir
  rm -f .env

  echo "Gerando arquivo .env a partir das variáveis do ambiente..."

  # Itera sobre o array e escreve no arquivo .env
  for var in "${!ENV_VARS[@]}"; do
    # Verifica se a variável tem valor antes de escrever no arquivo
    if [ -n "${ENV_VARS[$var]}" ]; then
      echo "$var=${ENV_VARS[$var]}" >> .env
      echo "Adicionando $var=${ENV_VARS[$var]} ao arquivo .env"
    else
      echo "⚠️ A variável de ambiente $var não está definida. Ignorando..."
    fi
  done

  echo ".env gerado com sucesso:"
  cat .env
}

# Chama a função para gerar o arquivo .env
write_env_file

# Adicional: Executa qualquer comando que tenha sido passado para o script
exec "$@"
