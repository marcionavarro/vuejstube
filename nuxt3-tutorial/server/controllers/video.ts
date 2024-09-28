import { Video } from "~/interfaces/video"
import { postgresClient } from "../utils"

const { client } = postgresClient()

export const buscaVideos = async () => {
    const resultado = await client.query('SELECT * FROM videos')

    return resultado.rows as Video[]
}

export const buscaVideoPorId = async (event: H3Event) => {
    console.log('event:: ', event)
    const requestId = (await event.context.params.id) as string;
    const resultado = await client.query("SELECT * FROM videos WHERE id = $1", [requestId])

    return resultado.rows as Video[]
}