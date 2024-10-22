<template>
  <div>
    <UCard class="justify-center w-full">
      <template #header>
        <div class="flex justify-between items-center">
          <h2>{{ video.descricao }}</h2>

          <UBadge
            color="black"
            variant="solid"
            size="xs"
          >
            {{ formataData(video.data_postagem) }}
          </UBadge>
        </div>
      </template>

      <iframe
        class="h-[600px] w-full"
        :src="video.url"
        title="Youtube video player"
        frameborder="0"
      />

      <template #footer>
        <div class="flex justify-between items-center">
          <div>
            <UButton
              icon="i-heroicons-pencil-square"
              size="sm"
              color="primary"
              variant="solid"
              :label="t('botaoEditar')"
              :trailing="false"
              @click="abrirModal"
            />
            <UModal v-model="isOpen">
              <div class="p-4">
                <UForm
                  :validate="validate"
                  :state="state"
                  class="space-y-4"
                  @submit="onSubmit"
                >
                  <UFormGroup
                    :label="t('descricao')"
                    name="descricao"
                  >
                    <UInput v-model="state.descricao" />
                  </UFormGroup>

                  <UFormGroup
                    label="Url"
                    name="url"
                  >
                    <UInput
                      v-model="state.url"
                      type="url"
                    />
                  </UFormGroup>

                  <UButton type="submit">
                    {{ t("botaoSalvar") }}
                  </UButton>
                </UForm>
              </div>
            </UModal>
          </div>

          <div class="flex justify-between items-center">
            <NuxtLink :to="{ name: 'videos' }">
              <UButton
                :label="t('botaoVoltar')"
                color="gray"
              >
              </UButton>
            </NuxtLink>

            <UButton
              icon="i-heroicons:trash"
              color="red"
              variant="link"
              :label="t('botaoExcluir')"
              @click="abrirModalExcluir"
            />

            <UModal
              v-model="isOpenExcluir"
              prevent-close
            >
              <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template #header>
                  <div class="flex justify-between">
                    <div class="flex items-end">
                      <UIcon
                        name="heroicons:arrow-turn-left-down-16-solid"
                        class="mr-1"
                      />
                      <span>Tem certeza que deseja deletar o video ?</span>
                    </div>
                    <UButton
                      color="gray"
                      variant="ghost"
                      icon="i-heroicons-x-mark-20-solid"
                      class="-my-1"
                      @click="isOpenExcluir = false"
                    />
                  </div>
                  {{ video.descricao }}
                </template>

                <UButton
                  icon="i-heroicons:trash"
                  size="sm"
                  color="rose"
                  variant="solid"
                  :label="t('botaoExcluir')"
                  :trailing="false"
                  @click="deletarVideo"
                />

              </UCard>
            </UModal>
          </div>
        </div>
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";
import { formataData } from "#imports";
import type { Video } from "~/interfaces/video";

const route = useRoute();
const router = useRouter();
const isOpen = ref<boolean>(false);
const isOpenExcluir = ref<boolean>(false);

const { $toast } = useNuxtApp();
const { id } = route.params;
const { t } = useI18n();

const { data: video } = await useFetch<Video>(`/api/v1/videos/${id}`);

useSeoMeta({
  title: "Nuxt - SEO e META",
  ogDescription: video.value?.descricao || "",
  ogUrl: video.value?.url || "",
  ogType: "video.other",
});

if (!video.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Vídeo não encontrado",
  });
}

const state = reactive({
  id: 0,
  descricao: "",
  url: "",
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.descricao) errors.push({ path: "descricao", message: "Required" });
  if (!state.url) errors.push({ path: "url", message: "Required" });
  return errors;
};

async function onSubmit(event: FormSubmitEvent<any>) {
  try {
    await $fetch(`/api/v1/videos/${route.params.id}`, {
      method: "PUT",
      body: state,
    });
    router.push("/videos");
    $toast.success("Video editado com sucesso!");
    isOpen.value = false;
  } catch (error) {
    $toast.error("Erro ao editar com video!");
    console.log("error: ", error);
  }
}

const deletarVideo = async () => {
  try {
    await $fetch(`/api/v1/videos/${route.params.id}`, {
      method: "DELETE",
    });
    $toast.success("Video deletado com sucesso!");
    isOpen.value = false;

    setTimeout(() => {
      router.push("/videos");
    }, 3000);
  } catch (error) {
    $toast.error("Erro ao deletado com video!");
    console.log("error: ", error);
  }
};

const abrirModal = () => {
  state.id = video.value.id;
  state.descricao = video.value.descricao;
  state.url = video.value.url;
  isOpen.value = true;
};

const abrirModalExcluir = () => {
  isOpenExcluir.value = true;
};
</script>
<style lang="">
</style>