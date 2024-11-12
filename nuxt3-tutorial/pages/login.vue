<template>
    <UCard>
        <template #header>
            <h1 class="text:2xl text-center">Faça login para acessar a plataforma</h1>
            <a href="/auth/google">
                <UButton block label="Login com o Google" color="gray" size="lg" class="my-5">
                    <template #leading>
                        <IconGoogle />
                    </template>
                </UButton>
            </a>

            <a href="/auth/oauth0">
                <UButton block label="Login com o Oauth0" color="gray" size="lg">
                    <template #leading>
                        <IconOauth />
                    </template>
                </UButton>
            </a>
        </template>
    </UCard>
</template>

<script setup>
    definePageMeta({
        layout: "auth"
    })
</script>