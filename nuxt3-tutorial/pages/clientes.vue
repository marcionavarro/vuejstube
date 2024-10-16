<template>
    <div>
        <h1 class="block text-5xl text-center my-5">{{ t("tituloClientes") }}</h1>
        <button @click="refresh" class="px-4 py-2 bg-green-400 shadow-md rounded-md mb-5">
            {{ t("botaoRecarregar") }}
        </button>
        <div v-if="status === 'pending'">{{ t("carregando") }}...</div>
        <div v-else-if="error">{{ error.message }}</div>
        <div v-else class="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
            <div v-for="cliente in clientes" :key="cliente.id" class="shadow-md px-4 py-2">
                <img :src="cliente.foto" class="rounded-full mx-auto" />
                <h3 class="text-2xl text-center">{{ cliente.nome }}</h3>
            </div>
        </div>

        <div class="flex gap-2">
            <button v-for="i in 2" :key="n" class="px-2 bg-slate-400" @click="irPagina(i)">
                {{ i }}
            </button>
        </div>
    </div>
</template>

<script setup>
const pagina = ref(1)
const { t } = useI18n();

definePageMeta({
    pageTransition: {
        name: 'slide'
    }
})

const reqres = `https://reqres.in/api/users`

const { data: clientes, error, refresh, execute, status } = useLazyFetch(reqres, {
    //server: false
    //pick: ['page', 'data']
    transform: (clientes) => {
        return clientes.data.map(c => ({
            id: c.id,
            nome: c.first_name,
            sobrenome: c.last_name,
            foto: c.avatar
        }))
    },
    //watch: [pagina],
    query: {
        page: pagina
    }
});

/* const reqresUnknown = `https://reqres.in/api/unknown`
const { data: cliente } = await useAsyncData('cliente', async () => {
    const [pessoas, aleatorios] = await Promise.all([
        $fetch(reqres),
        $fetch(reqresUnknown)
    ])

    return { pessoas, aleatorios }
})

console.log('cliente pessoas:: ', cliente.value.pessoas)
console.log('cliente aleatorios:: ', cliente.value.aleatorios) */

const irPagina = (numeroPagina) => {
    pagina.value = numeroPagina;
}
</script>
