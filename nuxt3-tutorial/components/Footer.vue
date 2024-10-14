<template>

    <footer
        class="fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">©
            {{ dataFooter() }}
            <a href="https://marcionavarro.com.br/" class="hover:underline">marcionavarro™</a>.
            Todos os direitos reservados.
        </span>

        <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <NuxtLink v-for="rota in rotasSistemas()" :key="rota.nome" :to="rota.path"
                class="hover:underline me-4 md:me-6">
                {{ rota.nome }}
            </NuxtLink>
        </ul>
    </footer>
</template>
<script>
export default {
    name: 'Footer',
    methods: {
        dataFooter() {
            const dataAtual = new Date();
            const options = {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            }
            return dataAtual.toLocaleDateString('pt-BR', options)
        }
    }
}
</script>
<style lang="">

</style>