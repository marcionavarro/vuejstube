<script setup lang="ts">
const { diasPassados, diferencaEmDias } = useFormatacao()

const dataVideo = new Date(2024, 5, 19)
diasPassados(dataVideo)
</script>

<template>
    <h1>Componentes - Nuxt 3</h1>
    <p>Autor: Marcio Navarro</p>
    <p>{{ diferencaEmDias }} dias atrás</p>
</template>