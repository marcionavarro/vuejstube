<template>
    <div>
        <h1 class="text-4xl text-center my-5">{{ $t("titulo") }}</h1>
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-3 items-center justify-center gap-4">
        <UCard v-for="video in videos" :key="video.id">
            <template #header>
                <div class="flex justify-between items-center">
                    <h2>{{ video.descricao }}</h2>
                    <UBadge color="black" variant="solid" size="xs" v-data-horario='"dd / mm / yyyy"'>{{
                        video.data_postagem }}</UBadge>
                </div>
            </template>

            <iframe class="h-48 w-full" :src="video.url" title="Youtube video player" frameborder="0" />

            <template #footer>
                <div class="flex justify-between items-center">
                    <NuxtLink :to="{
                        name: 'videos-id',
                        params: { id: video.id.toString() }
                    }">
                        <UButton label="Ver video" color="gray">
                            <template #trailing>
                                <UIcon name="i-heroicons-arrow-right-20-solid" class="w-5 h-5" />
                            </template>
                        </UButton>
                    </NuxtLink>

                    <UButton color="white" variant="link" @click="favoritar(video)">
                        <template #trailing>
                            <UIcon name="i-heroicons:heart" class="w-5 h-5" />
                        </template>
                    </UButton>
                </div>
            </template>
        </UCard>
    </div>
</template>

<script setup lang="ts">
import type { Video } from '~/interfaces/video'
import { useVideoStore } from '~/stores/video'

const { $toast } = useNuxtApp()

onMounted(() => {

})

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
]

const favoritar = (video: Video) => {
    adicionarFavorito(video)
    $toast.success('Toast adicionado com sucesso')
}

</script>
