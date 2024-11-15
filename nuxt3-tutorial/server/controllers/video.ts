import { Video } from "~/interfaces/video"
// import { postgresClient } from "../utils"
import { H3Event } from "h3"
import { PrismaClient } from '@prisma/client'

// const { client } = postgresClient()

const prisma = new PrismaClient();

export const buscarTodos = async () => {
    return await prisma.video.findMany({
        orderBy: {
            descricao: 'asc'
        }
    })
}

export const buscarPorId = async (event: H3Event) => {
    const request = getRouterParams(event);

    if (!request) {
        throw createError({
            statusCode: 400,
            name: "Vídeo inválido"
        })
    }

    const video = await prisma.video.findFirst({
        where: {
            id: +request.id
        }
    })

    return !video ? "Video não encontrado" : video;
}

export const adicionar = async (event: H3Event): Promise<string> => {
    try {
        const request = await readBody<Video>(event)

        await prisma.video.create({
            data: {
                ...request
            }
        })

        return "Vídeo adicionado com sucesso!"
    } catch (error) {
        throw createError({
            statusCode: 500,
            name: "Erro ao criar vídeo"
        })
    }
}

export const atualizar = async (event: H3Event): Promise<string> => {
    try {
        const requestBody = await readBody(event)
        const request = getRouterParams(event);

        if (!request) {
            throw createError({
                statusCode: 400,
                name: "Vídeo inválido"
            })
        }

        await prisma.video.update({
            where: {
                id: +request.id
            },
            data: {
                descricao: requestBody.descricao,
                url: requestBody.url
            }
        })

        return "Vídeo atualizado com sucesso!"
    } catch (error) {
        throw createError({
            statusCode: 500,
            name: "Erro ao atualizar vídeo"
        })
    }
}

export const deletar = async (event: H3Event) => {
    try {
        const request = getRouterParams(event);

        if (!request) {
            throw createError({
                statusCode: 400,
                name: "Vídeo inválido"
            })
        }

        await prisma.video.delete({
            where: {
                id: +request.id
            }
        })

        return "Vídeo deletado com sucesso!"
    } catch (error) {
        throw createError({
            statusCode: 500,
            name: "Erro ao atualizar vídeo"
        })
    }
}