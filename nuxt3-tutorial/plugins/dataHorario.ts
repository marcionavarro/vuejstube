export default defineNuxtPlugin(({ vueApp }) => {
    vueApp.directive("data-horario", {
        mounted(eL, binding) {
            const dataFormatada = new Date(eL.innerText)
            eL.innerHTML = formataData(dataFormatada, binding.value)
        }
    })
})

const formataData = (data: Date, tipo: string = "") => {
    switch (tipo) {
        case "dd/mm/yyyy":
            return data.toLocaleString("pt-BR");
        case "hh:mm":
            return data.toLocaleTimeString("pt-BR");
        default:
            return data.toLocaleDateString("pt-BR");
    }
};