<template>
    <div>
        Voçê esta no video de número {{ idParams }}
    </div>
</template>
<script setup>
const route = useRoute();
const idParams = computed(() => route.params.id)
</script>
<style lang="">

</style>