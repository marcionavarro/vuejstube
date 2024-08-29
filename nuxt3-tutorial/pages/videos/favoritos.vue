<template>
    <div>
        Vídeos Favoritos
    </div>

    <div class="videos">
        <div v-for="video in favoritos" :key="video.id">
            <h2>{{ video.descricao }}</h2>
            <iframe width="500" height="400" :src="video.url" title="Youtube video player" frameborder="0" />

            <div>
                <button @click="removeFavorito(video.id)">Remover Favorito</button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useVideoStore } from '~/stores/video';

const { $toast } = useNuxtApp()

const videoStore = useVideoStore()
const { favoritos } = storeToRefs(videoStore)

const removeFavorito = (id: number) => {
    videoStore.deletaFavorito(id)
    $toast.error('Removido com sucesso')

}

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
    background: #FF0000;
    cursor: pointer
}

.videos button:hover {
    background: #810000;
}
</style>