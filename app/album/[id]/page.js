import Link from "next/link";
import { notFound } from "next/navigation";
import { buscarAlbum, formatarTempo, formatarData } from "@/lib/api";
import { temaDoAlbum } from "@/lib/temas";
import ListaFaixas from "@/app/components/ListaFaixas";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const album = await buscarAlbum(id);
  return { title: album ? `${album.titulo} · QueenBFans` : "Álbum não encontrado" };
}

export default async function Album({ params }) {
  const { id } = await params;
  const album = await buscarAlbum(id);
  if (!album) notFound();

  const { tema, frase } = temaDoAlbum(album.titulo);

  return (
    <div className="pagina" data-tema={tema}>
      <div
        className="fundo-capa"
        style={{ backgroundImage: `url(${album.capa})` }}
        aria-hidden="true"
      />

      <main className="container">
        <Link href="/#albuns" className="voltar">
          ← Voltar à discografia
        </Link>

        <section className="album-topo">
          <div className="album-capa">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={album.capa} alt={`Capa do álbum ${album.titulo}`} />
          </div>

          <div className="album-info">
            {frase && <span className="sobretitulo">{frase}</span>}
            <h1 className="album-titulo">{album.titulo}</h1>
            <p className="artista">Beyoncé</p>

            <dl className="dados">
              <div>
                <dt>Lançamento</dt>
                <dd>{formatarData(album.lancamento)}</dd>
              </div>
              <div>
                <dt>Faixas</dt>
                <dd>{album.faixas.length}</dd>
              </div>
              <div>
                <dt>Duração</dt>
                <dd>{formatarTempo(album.duracao)}</dd>
              </div>
              <div>
                <dt>Gravadora</dt>
                <dd>{album.gravadora}</dd>
              </div>
              {album.generos.length > 0 && (
                <div>
                  <dt>Gênero</dt>
                  <dd>{album.generos.join(", ")}</dd>
                </div>
              )}
              <div>
                <dt>Fãs no Deezer</dt>
                <dd>{album.fas.toLocaleString("pt-BR")}</dd>
              </div>
            </dl>

            <a href={album.link} target="_blank" rel="noreferrer" className="botao">
              ▶ Ouvir álbum no Deezer
            </a>
          </div>
        </section>

        <section>
          <h2 className="secao-titulo">Faixas</h2>
          <ListaFaixas
            faixas={album.faixas}
            album={{ id: album.id, titulo: album.titulo, capa: album.capaPequena }}
          />
        </section>
      </main>
    </div>
  );
}
