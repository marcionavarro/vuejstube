<template>
  <div>
    <h1 class="text-4xl text-center my-5">{{ $t("titulo") }}</h1>
  </div>

  <div class="grid grid-cols-2 lg:grid-cols-3 items-center justify-center gap-4">
    <UCard
      v-for="video in videos"
      :key="video.id"
    >
      <template #header>
        <div class="flex justify-between items-center">
          <h2>{{ video.descricao }}</h2>
          <UBadge
            color="black"
            variant="solid"
            size="xs"
            v-data-horario='"dd / mm / yyyy"'
          >
            {{video.data_postagem }}
          </UBadge>
        </div>
      </template>

      <iframe
        class="h-48 w-full"
        :src="video.url"
        title="Youtube video player"
        frameborder="0"
      />

      <template #footer>
        <div class="flex justify-between items-center">
          <NuxtLink :to="{
                        name: 'videos-id',
                        params: { id: video.id.toString() }
                    }">
            <UButton
              label="Ver video"
              color="gray"
            >
              <template #trailing>
                <UIcon
                  name="i-heroicons-arrow-right-20-solid"
                  class="w-5 h-5"
                />
              </template>
            </UButton>
          </NuxtLink>

          <UButton
            color="white"
            variant="link"
            @click="favoritar(video)"
          >
            <template #trailing>
              <UIcon
                name="i-heroicons:heart-16-solid"
                class="w-5 h-5"
                :class="{active: favorited(video)}"
              />
            </template>
          </UButton>
        </div>
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { Video } from "~/interfaces/video";
import { useVideoStore } from "~/stores/video";

const { adicionarFavorito, deletaFavorito, isFavorited } = useVideoStore();
const videos = ref<Video[]>([]);

const FAVORITOS_KEY = 'videos';

const favoritar = (video: Video) => {
  const { favoritos } = JSON.parse(localStorage.getItem('videos') ?? '[]');
  const videoIndex = favoritos.findIndex((fav: Video) => fav.id === video.id);
  return toggleFavorited(videoIndex, video, favoritos)
};

const favorited = (video: Video) => {
  return isFavorited(video)
}

const toggleFavorited = (videoIndex: number, video: Video, favoritos: string[]) => {
  if (videoIndex === -1) {
    adicionarFavorito(video);
  } else {
    setFavoritoStorage(favoritos)
    deletaFavorito(video.id)
  }
}

const setFavoritoStorage = (favoritos: string[]) => {
  return localStorage.setItem(FAVORITOS_KEY, JSON.stringify(favoritos));
}

onMounted(async () => {
  videos.value = await $fetch("/api/v1/videos");
});
</script>

<style scoped>
.active {
  color: red;
  background-color: red;
}
</style>
