import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default defineOAuthGoogleEventHandler({
    async onSuccess(event, { user, tokens }) {
        // Verifica se possui usuario
        let usuario =  await prisma.usuario.findUnique({
            where: {
                email: user.email
            },
            include: {
                permissao: true
            }
        })

        // se não possui, adiciona
        if(!usuario){
            const PERMISSAO_USUARIO = 2;
            usuario = await prisma.usuario.create({
                data: {
                    email: user.email,
                    nome: user.name,
                    permissaoId: PERMISSAO_USUARIO
                },
                include: {
                    permissao: true,
                },
            })
        }

        await setUserSession(event, {
            user: {
                id: user.id,
                email: user.email,
                urlFoto: user.picture,
                nome: String(user.name).trim(),
                permissao: usuario.permissao.nome,
                usuarioId: usuario.id
            }
        })
        return sendRedirect(event, '/')
    },
    // Optional, will return a json error and 401 status code by default
    onError(event, error) {
        console.error('Google OAuth error:', error)
        return sendRedirect(event, '/')
    },
})