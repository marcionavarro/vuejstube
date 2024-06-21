<template>
    <div>
        <h1>Vídeos</h1>
    </div>

    <nuxt-link to="/videos/favoritos">Favoritos</nuxt-link>
    <div class="videos">
        <div v-for="video in videos" :key="video.id">
            <h2>{{ video.descricao }}</h2>
            <p>{{ converteDataBrasil(video.data_postagem) }}</p>
            <iframe width="500" height="400" :src="video.url" title="Youtube video player" frameborder="0" />

            <div>
                <button @click="adicionarFavorito(video)">Adicionar Favorito</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Video } from '~/interfaces/video';
import { useVideoStore } from '~/stores/video';

// const favoritos = useFavoritos();
const { adicionarFavorito } = useVideoStore()

const videos: Video[] = [
    {
        id: 1,
        descricao: "01 - Introdução e Instalação",
        url: "https://www.youtube.com/embed/WahQ5AoXpuU?si=F2FrXqWjB1dtJvGw",
        data_postagem: "2023-10-15",
    },
    {
        id: 2,
        descricao: "02 - Configuração",
        url: "https://www.youtube.com/embed/JbbB84bnPog?si=mKtXqUkTKCuNHqjJ",
        data_postagem: "2023-10-20",
    },
    {
        id: 3,
        descricao: "03 - Pages",
        url: "https://www.youtube.com/embed/S99sVicr8NI?si=jR8Y0QLVVLoQA7mX",
        data_postagem: "2023-10-10",
    },
    {
        id: 4,
        descricao: "04 - Components",
        url: "https://www.youtube.com/embed/cCHWanw49l8?si=i7569DvWVVtto-Ja",
        data_postagem: "2023-10-05",
    },
];

const converteDataBrasil = (dataAtual: string) => {
    return new Date(dataAtual).toLocaleDateString("pt-BR")
}

/* const adicionaFavorito = (video: Video) => {
    console.log('Video: ', video)
    favoritos.value.push(video)
} */

</script>

<style scoped>
.videos {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: space-around;
}

.videos button {
    display: inline-block;
    margin-top: 5px;
    color: white;
    padding: 15px;
    border: none;
    border-radius: 5px;
    background: #00CF7B;
    cursor: pointer
}

.videos button:hover {
    background: #008550;
}
</style>