# Etapa 1: Build
FROM node:18 
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

# Comando para iniciar a aplicação
CMD ["npm", "run", "dev"]