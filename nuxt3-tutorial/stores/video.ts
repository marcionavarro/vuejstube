import { defineStore } from "pinia";
import type { Video } from "~/interfaces/video";

export const useVideoStore = defineStore("videos", () => {
    const favoritos = ref<Video[]>([])

    const adicionarFavorito = (video: Video) => {
        const favoritosFiltrados = favoritos.value.some((v) => v.id === video.id)
        if (!favoritosFiltrados) {
            favoritos.value.push(video)
        }
    }

    const deletaFavorito = (id: number) => {
        const favoritosFiltrados = favoritos.value.filter((v) => v.id !== id)
        favoritos.value = favoritosFiltrados
    }

    return { favoritos, adicionarFavorito, deletaFavorito }
}, {
    // persist: true
    persist: {
        // key: 'my-custom-key', // salva no cookie com nome da key
        storage: typeof window !== 'undefined' ? localStorage : undefined,
        // storage: typeof window !== 'undefined' ? sessionStorage : undefined,

    }
})