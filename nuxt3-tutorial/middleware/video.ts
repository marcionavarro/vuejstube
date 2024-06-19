export default defineNuxtRouteMiddleware((to, from) => {
    const valorParamatro = +to.params.id
    if (isNaN(valorParamatro) || valorParamatro < 0) {
        return navigateTo("/videos")
    }
})