"use client";

// Aparece quando alguma API falha (ex.: internet caiu ou o Deezer não respondeu),
// no lugar da tela de erro do Next.js.
export default function Erro({ reset }) {
  return (
    <div className="pagina" data-tema="queenb">
      <main className="container erro">
        <span className="sobretitulo">Ops!</span>
        <h1 className="cromado titulo-pagina">SEM CONEXÃO</h1>
        <p className="intro">
          Não consegui buscar os dados agora. Confira sua internet e tente de novo, porque a Queen B não gosta de esperar. 👑
        </p>
        <button className="botao" onClick={() => reset()}>
          Tentar de novo
        </button>
      </main>
    </div>
  );
}
