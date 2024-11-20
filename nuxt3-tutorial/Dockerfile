# Etapa 1: Build
FROM node:20 
##as build-stage

WORKDIR /app
#WORKDIR /frontend

# Definir a variável de ambiente para npm install
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

# Copia o package.json e instala as dependências
COPY package*.json ./
RUN npm install

# Remover a variável de ambiente após o npm install
ENV NODE_TLS_REJECT_UNAUTHORIZED=1

# Copia o código da aplicação
COPY . .

# Expõe a porta 3000 (ou outra que sua aplicação use)
EXPOSE 3000

# Copia o script de inicialização
COPY docker-entrypoint.sh /usr/local/bin/

# Permissão de execução no script
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Usa o script de inicialização para rodar as migrações e iniciar a aplicação
ENTRYPOINT ["docker-entrypoint.sh"]