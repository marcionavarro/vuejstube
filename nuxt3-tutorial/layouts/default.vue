<template>
  <div class="wrapper">
    <nav class="w-full p-4 bg-white border-t border-gray-800 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600 mb-12">
      <div class="flex items-center flex-shrink-0  dark:text-gray-400 mr-6">
        <NuxtLink to="/">
          <span class="font-semibold text-xl tracking-tight">Marcio Navarro</span>
        </NuxtLink>
      </div>
      <div class="block lg:hidden">
        <button
          class="flex items-center px-3 py-2 border rounded  dark:text-gray-400 border-teal-400 hover:text-white hover:border-white"
          @click="toggleMenu"
        >
          <svg
            class="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path
              :class="{ hidden: isOpen, 'inline-block': !isOpen }"
              class="fill-current"
              d="M0 0h20v20H0z"
            />
            <path
              :class="{ hidden: !isOpen, 'inline-block': isOpen }"
              class="fill-current"
              d="M0 0h20v20H0z"
            />
          </svg>
        </button>
      </div>
      <div
        :class="{ hidden: !isOpen, block: isOpen }"
        class="w-full block lg:flex lg:items-center lg:w-auto"
      >
        <div
          class="text-sm"
          v-for="rota in rotasSistemasDefault()"
          :key="rota.nome"
        >
          <NuxtLink
            v-if="!rota.permissao || rota.permissao === user?.permissao"
            :to="rota.path"
            class="block mt-4 lg:inline-block lg:mt-0  dark:text-gray-400 hover:text-white mr-4"
          >
            {{ t(`menu.${rota.nome}`) }}
          </NuxtLink>
        </div>
        <div class="flex items-center gap-5">
          <ClientOnly>
            <UButton
              :icon="isDark
              ? 'i-heroicons-moon-20-solid'
              : 'i-heroicons-sun-20-solid'
              "
              color="gray"
              variant="ghost"
              aria-label="Theme"
              @click="isDark = !isDark"
            />
            <template #fallback>
              <div class="w-8 h-8" />
            </template>
          </ClientOnly>

          <USelect
            v-model="locale"
            icon="i-heroicons:globe-alt-solid"
            color="white"
            size="sm"
            :options="options"
            placeholder="Tradutor..."
          />
          <ClientOnly v-if="loggedIn">
            <LayoutDropdowUsuario />
          </ClientOnly>
        </div>
      </div>
    </nav>
    <UContainer class="pb-40">
      <slot></slot>
    </UContainer>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { rotasSistemas } from "#imports";
import Footer from "~/components/Footer.vue";

const { locale, t } = useI18n();
const colorMode = useColorMode();
const rotasSistemasDefault = ref(rotasSistemas);
const isOpen = ref(false);
const { loggedIn, user } = useUserSession();

const options = ref([
  { label: "Português", value: "pt" },
  { label: "Inglês", value: "en" },
]);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});
</script>

<style scoped>
.wrapper {
  max-width: 1777px;
  margin: 0 auto;
}
</style>