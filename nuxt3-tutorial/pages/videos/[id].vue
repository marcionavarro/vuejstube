<template>
  <div>
    <UCard class="justify-center w-full">
      <template #header>
        <div class="flex justify-between items-center">
          <h2>{{ video.descricao }}</h2>

          <UBadge color="black" variant="solid" size="xs">
            {{ formataData(video.data_postagem) }}
          </UBadge>
        </div>
      </template>

      <iframe class="h-[600px] w-full" :src="video.url" title="Youtube video player" frameborder="0" />

      <template #footer>
        <div class="flex justify-between items-center">
          <div>
            <UButton icon="i-heroicons-pencil-square" size="sm" color="primary" variant="solid" label="Editar"
              :trailing="false" @click="abrirModal" />
            <UModal v-model="isOpen">
              <div class="p-4">
                <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
                  <UFormGroup label="Descricão" name="descricao">
                    <UInput v-model="state.descricao" />
                  </UFormGroup>

                  <UFormGroup label="Url" name="url">
                    <UInput v-model="state.url" type="url" />
                  </UFormGroup>

                  <UButton type="submit">
                    Salvar
                  </UButton>
                </UForm>
              </div>
            </UModal>
          </div>

          <div class="basis-46 justify-between items-center">
            <NuxtLink :to="{ name: 'videos' }">
              <UButton label="Voltar" color="gray">
              </UButton>
            </NuxtLink>

            <UButton color="red" variant="link" label="Excluir video" @click="deletarVideo">
              <template #trailing>
                <UIcon name="i-heroicons:trash" class="w-5 h-5" />
              </template>
            </UButton>
          </div>
        </div>
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";

const route = useRoute();
const { id } = route.params;
const isOpen = ref<boolean>(false);
const router = useRouter();
const { $toast } = useNuxtApp();

const { data: video } = await useFetch(`/api/v1/videos/${id}`)

if (!video.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Vídeo não encontrado"
  })
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
    router.push("/videos");
    $toast.success("Video deletado com sucesso!");
    isOpen.value = false;
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
</script>
<style lang="">
</style>