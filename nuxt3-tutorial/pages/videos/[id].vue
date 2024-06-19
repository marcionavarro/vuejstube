<template>
    <div>
        Voçê esta no video de número {{ idParams }}
    </div>
    <VideoDetalhes />
    <VideoControlePlay />
</template>
<script setup>
definePageMeta({
    layout: "exibicao",
    middleware: ["video", "auth"]
})
const route = useRoute();
const idParams = computed(() => route.params.id)
</script>
<style lang="">

</style>