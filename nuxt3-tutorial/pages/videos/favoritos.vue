<template>
  <div>
    <div>
      <h1 class="barlow-black text-4xl text-center my-5">{{ t("tituloFavorito") }}</h1>
    </div>

    <div class="w-full">
      <UAlert
        v-if="favoritos.length <= 0"
        :actions="[
        {
          variant: 'solid',
          color: 'primary',
          label: 'Videos',
          click: navigateToVideos
        }
      ]"
        :title="t('tituloSemFavoritos') + '!'"
        :description="t('descricaoSemFavoritos') + '.'"
      />
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-3 items-stretch justify-center gap-4">
      <UCard
        v-for="video in favoritos"
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
              {{ video.data_postagem }}
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
                :label="t('botaoVerVideo')"
                color="gray"
              >
                <template #trailing>
                  <UIcon
                    name="i-heroicons:eye-solid"
                    class="w-5 h-5"
                  />
                </template>
              </UButton>
            </NuxtLink>

            <UButton
              color="red"
              variant="link"
              :label="t('botaoExcluirFavorito')"
              @click="removeFavorito(video.id)"
            >
              <template #trailing>
                <UIcon
                  name="i-heroicons:trash"
                  class="w-5 h-5"
                />
              </template>
            </UButton>
          </div>
        </template>
      </UCard>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useVideoStore } from "~/stores/video";
import { useRouter } from "vue-router";

const router = useRouter();
const videoStore = useVideoStore();

const { $toast } = useNuxtApp();
const { favoritos } = storeToRefs(videoStore);
const { t } = useI18n();

const removeFavorito = (id: number) => {
  videoStore.deletaFavorito(id);
  $toast.error("Removido com sucesso");
};

const navigateToVideos = () => {
  router.push("/videos");
};
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
  background: #ff0000;
  cursor: pointer;
}

.videos button:hover {
  background: #810000;
}
</style>