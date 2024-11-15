# Etapa 1: Build
FROM node:20 
##as build-stage

WORKDIR /app
#WORKDIR /frontend

# Copia o package.json e instala as dependências
COPY package*.json ./
RUN npm install

# Copia o código da aplicação
COPY . .

# build Constrói a aplicação Nuxt para produção
##RUN npm run dev 

# Etapa 2: Produção
##FROM node:18 as production-stage

##WORKDIR /app

# Copia os arquivos de build do estágio anterior
##COPY --from=build-stage /app /app

# Instala apenas as dependências necessárias para produção
##RUN npm install --production

# Expõe a porta 3000 (ou outra que sua aplicação use)
EXPOSE 3000

# Copia o script de inicialização
COPY docker-entrypoint.sh /usr/local/bin/

# Permissão de execução no script
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Usa o script de inicialização para rodar as migrações e iniciar a aplicação
ENTRYPOINT ["docker-entrypoint.sh"]