"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api, mensagemDeErro, useSessao } from "@/lib/cliente";

function Estrelas({ nota }) {
  return (
    <span className="estrelas" aria-label={`Nota ${nota} de 5`}>
      {"★".repeat(nota)}
      <span className="estrelas-vazias">{"★".repeat(5 - nota)}</span>
    </span>
  );
}

export default function MinhaPlaylist() {
  const { usuario, carregado } = useSessao();
  const [musicas, setMusicas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  // edição: id da música sendo editada + valores do formulário
  const [editando, setEditando] = useState(null);
  const [nota, setNota] = useState(5);
  const [comentario, setComentario] = useState("");

  // LISTAR (GET /api/playlist)
  useEffect(() => {
    if (!usuario) return;
    api
      .get("/playlist")
      .then(({ data }) => setMusicas(data.musicas))
      .catch((falha) => setErro(mensagemDeErro(falha)))
      .finally(() => setCarregando(false));
  }, [usuario]);

  function abrirEdicao(m) {
    setEditando(m.id);
    setNota(m.nota);
    setComentario(m.comentario);
    setErro("");
  }

  // EDITAR (PUT /api/playlist/:id)
  async function salvar(e) {
    e.preventDefault();
    try {
      const { data } = await api.put(`/playlist/${editando}`, { nota, comentario });
      setMusicas((lista) => lista.map((m) => (m.id === editando ? data.musica : m)));
      setEditando(null);
    } catch (falha) {
      setErro(mensagemDeErro(falha));
    }
  }

  // EXCLUIR (DELETE /api/playlist/:id)
  async function excluir(m) {
    if (!confirm(`Tirar "${m.titulo}" da sua playlist?`)) return;
    try {
      await api.delete(`/playlist/${m.id}`);
      setMusicas((lista) => lista.filter((x) => x.id !== m.id));
    } catch (falha) {
      setErro(mensagemDeErro(falha));
    }
  }

  if (!carregado) return null;

  if (!usuario) {
    return (
      <div className="pagina" data-tema="queenb">
        <main className="container vazio">
          <h1 className="cromado titulo-pagina">MINHA PLAYLIST</h1>
          <p className="intro">Você precisa entrar na sua conta para ver a sua playlist.</p>
          <Link href="/login?voltar=/minha-playlist" className="botao">Entrar ou criar conta</Link>
        </main>
      </div>
    );
  }

  return (
    <div className="pagina" data-tema="queenb">
      <main className="container">
        <span className="sobretitulo">Olá, {usuario.nome}</span>
        <h1 className="cromado titulo-pagina">MINHA PLAYLIST</h1>
        <p className="intro">
          Adicione músicas pelo botão <strong>+</strong> nas páginas dos álbuns ou no ranking. Aqui você dá nota,
          comenta e exclui.
        </p>
        {usuario.admin && (
          <p className="intro">
            <strong>Conta ADM:</strong> as 5 músicas com as maiores notas desta playlist aparecem como{" "}
            <Link href="/ranking">Top 5 da ADM</Link> no ranking.
          </p>
        )}

        {erro && <p className="form-erro" role="alert">{erro}</p>}

        {carregando ? (
          <p className="carregando">Carregando...</p>
        ) : musicas.length === 0 ? (
          <div className="vazio">
            <p className="intro">Sua playlist ainda está vazia.</p>
            <Link href="/#albuns" className="botao">Escolher músicas nos álbuns</Link>
          </div>
        ) : (
          <ul className="playlist">
            {musicas.map((m) => (
              <li key={m.id} className="playlist-item">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {m.capa && <img src={m.capa} alt="" className="mini-capa" />}

                <div className="playlist-meio">
                  <a href={m.link} target="_blank" rel="noreferrer" className="faixa-nome">{m.titulo}</a>
                  {m.albumId ? (
                    <Link href={`/album/${m.albumId}`} className="faixa-album">{m.album}</Link>
                  ) : (
                    <span className="faixa-album">{m.album}</span>
                  )}

                  {editando === m.id ? (
                    <form className="form-edicao" onSubmit={salvar}>
                      <label>
                        Nota
                        <select value={nota} onChange={(e) => setNota(Number(e.target.value))}>
                          {[5, 4, 3, 2, 1].map((n) => (
                            <option key={n} value={n}>{"★".repeat(n)} ({n})</option>
                          ))}
                        </select>
                      </label>
                      <label>
                        Comentário
                        <textarea
                          value={comentario}
                          onChange={(e) => setComentario(e.target.value)}
                          maxLength={300}
                          rows={2}
                          placeholder="Por que essa música é especial?"
                        />
                      </label>
                      <div className="acoes">
                        <button className="botao botao-pequeno">Salvar</button>
                        <button type="button" className="botao botao-vazado botao-pequeno" onClick={() => setEditando(null)}>
                          Cancelar
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <Estrelas nota={m.nota} />
                      {m.comentario && <p className="comentario">“{m.comentario}”</p>}
                    </>
                  )}
                </div>

                {editando !== m.id && (
                  <div className="acoes">
                    <button className="botao botao-vazado botao-pequeno" onClick={() => abrirEdicao(m)}>Editar</button>
                    <button className="botao botao-perigo botao-pequeno" onClick={() => excluir(m)}>Excluir</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
