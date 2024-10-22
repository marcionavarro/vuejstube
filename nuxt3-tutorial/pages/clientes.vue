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
    <h1 class="barlow-black block text-5xl text-center my-5">{{ t("tituloClientes") }}</h1>
    <button
      @click="refresh"
      class="px-4 py-2 bg-green-400 shadow-md rounded-md mb-5"
    >
      {{ t("botaoRecarregar") }}
    </button>
    <div v-if="status === 'pending'">{{ t("carregando") }}...</div>
    <div v-else-if="error">{{ error.message }}</div>

    <div class="grid md:grid-cols-3 sm:grid-cols-2">
      <div
        v-for="cliente in clientes.clientes"
        :key="cliente.id"
        class="card-client"
      >
        <div class="user-picture">
          <img
            :src="cliente.foto"
            :alt="cliente.nome"
          >
        </div>
        <p class="name-client"> {{ cliente.nome }} {{ cliente.sobrenome }}
          <span>{{ cliente.email }}</span>
        </p>
      </div>
    </div>

    <div class="pagination">
      <button
        @click="fetchPreviousPage"
        :disabled="pagina === 1"
        class="pagination-button"
      >
        Anterior
      </button>
      <span class="pagination-text">
        Página {{ pagina }} de {{ totalPages }}
      </span>
      <button
        @click="fetchNextPage"
        :disabled="pagina >= totalPages"
        class="pagination-button"
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

const reqres = `https://reqres.in/api/users`

const { data: clientes, error, refresh, execute, status } = useLazyFetch(reqres, {
  transform: (response) => {
    return {
      clientes: response.data.map(c => ({
        id: c.id,
        email: c.email,
        nome: c.first_name,
        sobrenome: c.last_name,
        foto: c.avatar
      })),
      total: response.total,
      totalPages: response.total_pages
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

<style scoped>
.card-client {
  background: #2cb5a0;
  width: 25rem;
  margin: 15px 0;
  padding: 10px 0;

  border: 4px solid #7cdacc;
  box-shadow: 0 6px 10px rgba(207, 212, 222, 1);
  border-radius: 10px;
  text-align: center;
  color: #fff;
  font-family: "Poppins", sans-serif;
  transition: all 0.3s ease;
}

.card-client:hover {
  transform: translateY(-10px);
}

.user-picture {
  overflow: hidden;
  object-fit: cover;
  width: 10rem;
  height: 10rem;
  border: 9px solid #7cdacc;
  border-radius: 999px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}

.user-picture img {
  width: 10rem;
  height: 100%;
}

.name-client {
  margin: 0;
  margin-top: 20px;
  font-weight: 600;
  font-size: 18px;
}

.name-client span {
  display: block;
  font-weight: 200;
  font-size: 16px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
}

.pagination-button {
  background-color: #14b8a6; /* Cor principal */
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.pagination-button:hover {
  background-color: #0f766e; /* Tom mais escuro ao passar o mouse */
}

.pagination-button:disabled {
  background-color: #94d6d2; /* Cor mais clara quando desabilitado */
  cursor: not-allowed;
}

.pagination-text {
  font-size: 14px;
  color: #333;
}
</style>
