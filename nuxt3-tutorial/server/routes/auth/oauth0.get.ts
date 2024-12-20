export default defineOAuthAuth0EventHandler({
    async onSuccess(event, { user, tokens }) {
        await setUserSession(event, {
            user: {
                id: user.id,
                email: user.email,
                urlFoto: user.picture,
                nome: String(user.name).trim()
            }
        })
        return sendRedirect(event, '/')
    }, 
    // Optional, will return a json error and 401 status code by default
    onError(event, error) {
        console.error('Auth0 OAuth error:', error)
        return sendRedirect(event, '/')
    },
})