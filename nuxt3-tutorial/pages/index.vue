<template>
  <div class="mt-10 mb-20">
    <Header />
    <div>
      <h1>Página Inicial</h1>
      {{ user }}
    </div>
  </div>
</template>
<script setup>
const { user } = useUserSession();
const tituloSite = "Marcio Navarro - Developer"
useHead({
  title: tituloSite,
  meta: [
    {
      name: "description",
      content: "Progamador Fullstack",
    },
  ],
});
</script>
