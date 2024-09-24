<template>
    <div>
        Layout Padrão
        <select v-model="locale">
            <option value="pt" selected>pt</option>
            <option value="en">en</option>
        </select>

        <slot></slot>
        Rodapé padrão
    </div>
</template>

<script setup lang="ts">
    const { locale } = useI18n()
</script>