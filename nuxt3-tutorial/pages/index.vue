<template>
  <div class="page-mousemove flex flex-col items-center mt-40 mb-20">
    <div class="w-1/2">
      <IconLogo class="logo" />
      <p class="font-sans text-3xl text-emerald-400 mt-4">web full-stack de alto desempenho</p>
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
  bodyAttrs: {
    class: 'page-mousemove'
  }
});

onMounted(() => {
  document.addEventListener('mousemove', spark)
  onUnmounted(() => {
    document.removeEventListener('mousemove', spark)
  })
})

const spark = (event) => {
  let i = document.createElement('i')
  i.style.left = event.pageX + 'px'
  i.style.top = event.pageY + 'px'
  i.style.scale = `${Math.random() * 2 + 1}`
  i.style.setProperty('--x', getRandomTransitionValue())
  i.style.setProperty('--y', getRandomTransitionValue())

  document.body.appendChild(i)

  setTimeout(() => {
    document.body.removeChild(i);
  }, 2000);
}

const getRandomTransitionValue = () => {
  return `${Math.random() * 400 - 200}px`;
}
</script>

<style>
body.page-mousemove {
  position: relative;
  height: 100vh;
  overflow: hidden;
  background: #fff url("../assets/image/coffe.png") no-repeat bottom/cover;
  background-size: auto;
  background-position-y: calc(100% - 70px);
  background-blend-mode: difference;
}

i {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #00c16a;
  pointer-events: none;
  animation: animate 2s linear forwards;
}

.logo {
  color: #00dc82;
  width: 100%;
  max-width: 600px;
}

@keyframes animate {
  0% {
    opacity: 1;
    transform: translate(0, 0);
  }
  100% {
    opacity: 0;
    transform: translate(var(--x), var(--y));
  }
}
</style>
