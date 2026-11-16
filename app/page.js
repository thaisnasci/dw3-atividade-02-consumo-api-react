// A página é refeita a cada 1 hora com dados novos do Deezer
export const revalidate = 3600;

import Link from "next/link";
import { listarAlbuns, buscarArtista, topMusicas } from "@/lib/api";
import { SOBRE, TURNES } from "@/lib/dados";
import { fotoSobre } from "@/lib/fotos";
import { temaDoAlbum } from "@/lib/temas";

export default async function Home() {
  const [albuns, artista, top] = await Promise.all([listarAlbuns(), buscarArtista(), topMusicas(5)]);

  return (
    <div className="pagina" data-tema="queenb">
      <div className="favo" aria-hidden="true" />

      {/* ---------- Abertura ---------- */}
      <header className="abertura container">
        <span className="sobretitulo">QueenBFans · o fã-site da Queen B</span>
        <h1 className="cromado">BEYONCÉ</h1>
        <p className="abertura-frase">Cantora, compositora, atriz e um dos maiores nomes da música mundial.</p>
        <div className="abertura-botoes">
          <a href="#albuns" className="botao">Ver álbuns</a>
          <Link href="/ranking" className="botao botao-vazado">Top músicas</Link>
        </div>

        <dl className="numeros">
          <div>
            <dt>Álbuns</dt>
            <dd>{albuns.length}</dd>
          </div>
          <div>
            <dt>Turnês</dt>
            <dd>{TURNES.length}</dd>
          </div>
          <div>
            <dt>Fãs no Deezer</dt>
            <dd>{(artista.fas / 1e6).toLocaleString("pt-BR", { maximumFractionDigits: 1 })} mi</dd>
          </div>
        </dl>
      </header>

      {/* ---------- Sobre ---------- */}
      <section id="sobre" className="container sobre">
        <div className="sobre-foto">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={fotoSobre() ?? artista.foto} alt="Beyoncé" />
        </div>
        <div>
          <h2 className="secao-titulo">Sobre ela</h2>
          {SOBRE.paragrafos.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <a href={artista.link} target="_blank" rel="noreferrer" className="link-suave">
            Ouvir no Deezer →
          </a>
        </div>
      </section>

      {/* ---------- Álbuns (catálogo) ---------- */}
      <section id="albuns" className="container">
        <h2 className="secao-titulo">
          Álbuns <span>{albuns.length}</span>
        </h2>
        <ul className="grade">
          {albuns.map((a) => (
            <li key={a.id}>
              <Link href={`/album/${a.id}`} className="card" data-tema={temaDoAlbum(a.titulo).tema}>
                <div className="card-capa">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={a.capa} alt={`Capa do álbum ${a.titulo}`} loading="lazy" />
                </div>
                <div className="card-info">
                  <h3>{a.titulo}</h3>
                  <span>{a.ano}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Chamadas para as outras páginas ---------- */}
      <section className="container chamadas">
        <div className="chamada">
          <h2 className="secao-titulo">Top 5 agora</h2>
          <ol className="top-mini">
            {top.map((f, i) => (
              <li key={f.id}>
                <span className="pos">{i + 1}</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={f.album.capa} alt="" />
                <div>
                  <strong>{f.titulo}</strong>
                  <small>{f.album.titulo}</small>
                </div>
              </li>
            ))}
          </ol>
          <Link href="/ranking" className="link-suave">Ver o ranking completo →</Link>
        </div>

        <div className="chamada">
          <h2 className="secao-titulo">Turnês</h2>
          <p>
            Da Dangerously in Love Tour à Cowboy Carter Tour: {TURNES.length} turnês com fotos e história de cada uma.
          </p>
          <Link href="/turnes" className="botao">Ver turnês</Link>
        </div>
      </section>
    </div>
  );
}
