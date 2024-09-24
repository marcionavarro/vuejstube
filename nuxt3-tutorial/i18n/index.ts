import { pt } from './pt.json'

export default ({
    legacy: false,
    locales: [
        { code: 'pt', iso: 'pt-BR', file: 'pt.json' },
        { code: 'en', iso: 'en-US', file: 'en.json' },
    ],
    locale: 'pt',
    defaultLocale: 'pt',
    langDir: 'locales/', // Diretório onde os arquivos de idioma ficam
    strategy: 'prefix',  // Estratégia de roteamento para lidar com múltiplos idiomas
    //lazy: true,          // Carrega as traduções de maneira preguiçosa
    detectBrowserLanguage: {
        useCookie: true,
        cookieKey: 'i18n_redirected',
        redirectOn: 'root',  // Redireciona ao idioma detectado
    },
    messages: {
        pt,
        en: {
            titulo: "My Videos",
            tituloFavorito: 'My Favorites'
        }
    }
})