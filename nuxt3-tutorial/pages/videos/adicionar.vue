<template>
  <div>
    <div>
      <h1 class="text-4xl text-center my-5">{{ t("adicionarVideo") }}</h1>
    </div>

    <UCard class="w-1/2 mx-auto mt-20 p-10">
      <UForm :validate="validate" :state="state" class="space-y-4 p-10" @submit="onSubmit">
        <UFormGroup :label="t('descricao')" name="descricao">
          <UInput v-model="state.descricao" />
        </UFormGroup>

        <UFormGroup label="Url" name="url">
          <UInput v-model="state.url" type="url" />
        </UFormGroup>

        <UButton type="submit">
          {{ t("botaoSalvar") }}
        </UButton>
      </UForm>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";

const router = useRouter();
const { $toast } = useNuxtApp();
const { t } = useI18n()

const state = reactive({
  descricao: undefined,
  url: undefined,
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.descricao) errors.push({ path: "descricao", message: "Required" });
  if (!state.url) errors.push({ path: "url", message: "Required" });
  return errors;
};

async function onSubmit(event: FormSubmitEvent<any>) {
  try {
    await $fetch("/api/v1/videos", {
      method: "POST",
      body: state,
    });
    router.push("/videos");
    $toast.success("Video adicionado com sucesso!");
  } catch (error) {
    $toast.error("Erro ao adicionar com video!");
    console.log("error: ", error);
  }
}
</script>