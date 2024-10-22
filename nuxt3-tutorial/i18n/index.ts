import { pt } from './pt.json'
import { en } from './en.json'

export default defineI18nConfig(() => ({
    locale: 'pt-BR',
    messages: {
        pt,
        en
    } 
}));