#!/bin/sh

# Rodar migrações antes de iniciar o servidor
npx prisma migrate dev --name init

# Iniciar o servidor
npm run dev
