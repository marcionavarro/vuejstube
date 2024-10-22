<template>
  <NuxtLoadingIndicator />
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Barlow:wght@400;600;800;900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap");

.barlow-regular {
  font-family: "Barlow", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.barlow-semibold {
  font-family: "Barlow", sans-serif;
  font-weight: 600;
  font-style: normal;
}

.barlow-extrabold {
  font-family: "Barlow", sans-serif;
  font-weight: 800;
  font-style: normal;
}

.barlow-black {
  font-family: "Barlow", sans-serif;
  font-weight: 900;
  font-style: normal;
  color: #14b8a6;
}
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}

.layout-enter-from,
.layout-leave-to {
  filter: grayscale(1);
}
</style>
