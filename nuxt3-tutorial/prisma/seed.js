import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.permissao.createMany({
      data: [
          { nome: 'ADMINISTRADOR' },
          { nome: 'USUARIO' },
      ]
    });
    console.log('Seed completo!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });