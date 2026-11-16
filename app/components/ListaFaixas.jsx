"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { api, lerSessao, mensagemDeErro } from "@/lib/cliente";

function tempo(s) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

// Botão "+" que adiciona a faixa na playlist (POST /api/playlist, a nossa API)
function BotaoAdicionar({ faixa, album }) {
  const router = useRouter();
  const [estado, setEstado] = useState("livre"); // livre | enviando | ok | erro
  const [aviso, setAviso] = useState("");

  async function adicionar() {
    if (!lerSessao()) {
      router.push(`/login?voltar=${encodeURIComponent(window.location.pathname)}`);
      return;
    }
    setEstado("enviando");
    try {
      await api.post("/playlist", {
        faixaId: faixa.id,
        titulo: faixa.titulo,
        album: album.titulo,
        albumId: album.id,
        capa: album.capa,
        link: faixa.link,
      });
      setEstado("ok");
      setAviso("Adicionada à sua playlist");
    } catch (falha) {
      // 409 = já estava na playlist: mostra como "ok" mesmo
      setEstado(falha.response?.status === 409 ? "ok" : "erro");
      setAviso(mensagemDeErro(falha));
    }
  }

  return (
    <button
      className={`adicionar ${estado}`}
      onClick={adicionar}
      disabled={estado === "enviando" || estado === "ok"}
      title={aviso || "Adicionar à minha playlist"}
      aria-label={aviso || `Adicionar ${faixa.titulo} à minha playlist`}
    >
      {estado === "ok" ? "✓" : "+"}
    </button>
  );
}

// Lista de músicas com prévia de 30 segundos (o Deezer libera a prévia de graça).
// Com "ranking", mostra também a capa, o álbum e a barra de popularidade.
// "album" é usado quando todas as faixas são do mesmo álbum (página do álbum).
export default function ListaFaixas({ faixas, ranking = false, semBarra = false, album = null }) {
  const audio = useRef(null);
  const [tocando, setTocando] = useState(null);
  const maior = Math.max(...faixas.map((f) => f.popularidade ?? 0), 1);

  // Quando outra lista da página começa a tocar, esta para
  useEffect(() => {
    function outraTocou(e) {
      if (e.detail !== audio.current) {
        audio.current?.pause();
        setTocando(null);
      }
    }
    window.addEventListener("queenb-tocar", outraTocou);
    return () => window.removeEventListener("queenb-tocar", outraTocou);
  }, []);

  async function alternar(faixa) {
    const player = audio.current;
    if (tocando === faixa.id) {
      player.pause();
      setTocando(null);
      return;
    }
    window.dispatchEvent(new CustomEvent("queenb-tocar", { detail: player }));
    player.src = faixa.previa;
    setTocando(faixa.id);
    try {
      await player.play();
    } catch (erro) {
      // AbortError = a pessoa trocou/pausou antes da música começar; não é um problema.
      // Qualquer outro erro (ex.: prévia indisponível) só desmarca a faixa.
      if (erro.name !== "AbortError") setTocando(null);
    }
  }

  return (
    <>
      <audio ref={audio} onEnded={() => setTocando(null)} />
      <ol className={`faixas ${ranking ? "faixas-ranking" : ""}`}>
        {faixas.map((f, i) => (
          <li key={f.id} className={`${tocando === f.id ? "tocando" : ""} ${ranking && i < 3 ? `podio podio-${i + 1}` : ""}`}>
            <button
              className="play"
              onClick={() => alternar(f)}
              disabled={!f.previa}
              aria-label={tocando === f.id ? `Pausar ${f.titulo}` : `Ouvir prévia de ${f.titulo}`}
            >
              {tocando === f.id ? "❚❚" : <span className="num">{i + 1}</span>}
            </button>

            {ranking && (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="mini-capa" src={f.album.capa} alt="" loading="lazy" />
            )}

            <div className="faixa-meio">
              <a href={f.link} target="_blank" rel="noreferrer" className="faixa-nome">
                {f.titulo}
                {f.explicita && <span className="e">E</span>}
              </a>
              {ranking && (
                <>
                  <Link href={`/album/${f.album.id}`} className="faixa-album">
                    {f.album.titulo}
                  </Link>
                  {!semBarra && <span className="barra" style={{ "--p": `${(f.popularidade / maior) * 100}%` }} />}
                </>
              )}
            </div>

            <div className="faixa-fim">
              <span className="faixa-tempo">{tempo(f.duracao)}</span>
              <BotaoAdicionar faixa={f} album={f.album ?? album} />
            </div>
          </li>
        ))}
      </ol>
      <p className="dica">
        Clique no número para ouvir uma prévia de 30 segundos. Use o <strong>+</strong> para salvar na{" "}
        <Link href="/minha-playlist">sua playlist</Link>.
      </p>
    </>
  );
}
