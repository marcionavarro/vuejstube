<template>
  <div>
    <Header />
    <div>
      <h1>Página Inicial</h1>
    </div>
  </div>
</template>
<script setup>
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
