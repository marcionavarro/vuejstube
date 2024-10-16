interface Rotas {
    nome: string;
    path: string;
}

export default () => {
    const rotas: Rotas[] = [
        { nome: "Inicio", path: '/' },
        { nome: "Videos", path: '/videos' },
        { nome: "Clientes", path: '/clientes' },
        { nome: "Favoritos", path: '/videos/favoritos' },
        { nome: "Adicionar Video", path: '/videos/adicionar' },
    ];
    return rotas;
}