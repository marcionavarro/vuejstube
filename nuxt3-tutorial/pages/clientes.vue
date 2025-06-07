<template>
  <div>

    <Head>
      <Title>Clientes</Title>
      <Meta
        name="description"
        content="Teste"
      />
      <Style
        type="text/css"
        children="body {background-color: #fff;}"
      ></Style>
    </Head>
    <h1 class="barlow-black block text-5xl text-center mt-10 mb-20">{{ t("tituloClientes") }}</h1>
    <button
      @click="refresh"
      class="text-white px-4 py-2 bg-green-400 shadow-md rounded-md mb-5 disabled:bg-teal-300 disabled:cursor-not-allowed"
      :disabled="status === 'pending'"
    >
      {{ status !== 'pending' ? t("botaoRecarregar") : t("carregando") }}
      <svg
        v-if="status === 'pending'"
        aria-hidden="true"
        role="status"
        class="inline w-4 h-4 me-3 text-white animate-spin"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="#E5E7EB"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentColor"
        />
      </svg>
    </button>
    <div v-if="error">{{ error.message }}</div>
    <div class="grid md:grid-cols-3 sm:grid-cols-2 mt-8">
      <div
        v-for="cliente in clientes?.clientes"
        :key="cliente.id"
        class="font-sans text-center text-white  bg-teal-500 border-2 border-teal-600 rounded-lg w-auto h-auto my-3 mx-1 py-5 transition-all ease-linear delay-100 hover:bg-teal-600 hover:-translate-y-4"
      >
        <div class="flex justify-center h-full max-h-40">
          <img
            :src="cliente.foto"
            :alt="cliente.nome"
            class="rounded-full w-40 object-cover border-8 border-teal-200"
          >
        </div>
        <p class="mt-7 font-medium text-lg"> {{ cliente.nome }} {{ cliente.sobrenome }}
          <span class="block font-light text-sm">{{ cliente.email }}</span>
        </p>
      </div>
    </div>

    <div class="flex justify-center items-center gap-5 mt-5 border-9">
      <button
        @click="fetchPreviousPage"
        :disabled="pagina === 1"
        class="bg-teal-500 text-white border-none py-2 px-3 rounded-md cursor-pointer transition ease-linear delay-75 hover:bg-teal-700 disabled:bg-teal-300 disabled:cursor-not-allowed"
      >
        Anterior
      </button>
      <span class="text-sm text-gray-700">
        Página {{ pagina }} de {{ totalPages }}
      </span>
      <button
        @click="fetchNextPage"
        :disabled="pagina >= totalPages"
        class="bg-teal-500 text-white border-none py-2 px-3 rounded-md cursor-pointer transition ease-linear delay-75 hover:bg-teal-700 disabled:bg-teal-300 disabled:cursor-not-allowed"
      >
        Próxima
      </button>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n();
const pagina = ref(1)
const limit = ref(6)

definePageMeta({
  pageTransition: {
    name: 'slide'
  }
})

// const reqres = `https://reqres.in/api/users`
const randomuser = `https://randomuser.me/api/?nat=br&results=6&page=${pagina.value}&seed=clientes`
console.log(randomuser)

const { data: clientes, error, refresh, execute, status } = useLazyFetch(randomuser, {
  transform: (response) => {
    return {
      clientes: response.results.map(c => ({
        id: c.id,
        email: c.email,
        nome: c.name.first,
        sobrenome: c.name.last,
        foto: c.picture.medium
      })),
      total: response.info.results,
      totalPages: 4
    }
  },
  query: {
    page: pagina,
    per_page: limit
  }
})

function fetchNextPage() {
  if (pagina.value < totalPages.value) {
    pagina.value++
  }
}

function fetchPreviousPage() {
  if (pagina.value > 1) {
    pagina.value--
  }
}

const totalPages = computed(() => {
  return clientes.value ? clientes.value.totalPages : 1
})
</script>
