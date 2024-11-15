export default defineNuxtRouteMiddleware((to, from) => {
    const { loggedIn, user} = useUserSession();
    if (!loggedIn.value) {
        return navigateTo("/login")
    }

    if(to.meta.permissao && to.meta.permissao !== user.value?.permissao){
        console.log('Entrei aqui')
        throw createError({
            statusCode: 401,
            message: 'Voçê não tem permissão para acessar essa rota'
        })
    }
})