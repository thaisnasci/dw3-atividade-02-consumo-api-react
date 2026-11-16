import Link from "next/link";
import { notFound } from "next/navigation";
import { TURNES } from "@/lib/dados";
import { fotosDaTurne } from "@/lib/fotos";

export const dynamic = "force-dynamic"; // lê as fotos da pasta a cada visita

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const t = TURNES.find((x) => x.slug === slug);
  return { title: t ? `${t.nome} · QueenBFans` : "Turnê não encontrada" };
}

export default async function Turne({ params }) {
  const { slug } = await params;
  const t = TURNES.find((x) => x.slug === slug);
  if (!t) notFound();

  const { capa, fotos } = fotosDaTurne(t.slug);

  return (
    <div className="pagina" data-tema={t.tema}>
      {capa && <div className="fundo-capa" style={{ backgroundImage: `url(${capa})` }} aria-hidden="true" />}

      <main className="container">
        <Link href="/turnes" className="voltar">
          ← Voltar às turnês
        </Link>

        <section className="album-topo">
          <div className="album-capa turne-capa">
            {capa ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={capa} alt={`Foto da ${t.nome}`} />
            ) : (
              <span className="sem-foto">{t.ano}</span>
            )}
          </div>

          <div className="album-info">
            <span className="sobretitulo">Turnê · {t.ano}</span>
            <h1 className="album-titulo">{t.nome}</h1>
            <p className="artista">{t.resumo}</p>

            <dl className="dados">
              <div>
                <dt>Ano</dt>
                <dd>{t.ano}</dd>
              </div>
              <div>
                <dt>Álbum</dt>
                <dd>{t.album}</dd>
              </div>
              {t.shows && (
                <div>
                  <dt>Shows</dt>
                  <dd>{t.shows}</dd>
                </div>
              )}
              {t.bilheteria && (
                <div>
                  <dt>Bilheteria</dt>
                  <dd>{t.bilheteria}</dd>
                </div>
              )}
            </dl>
          </div>
        </section>

        <section className="texto-longo">
          <h2 className="secao-titulo">Sobre a turnê</h2>
          {t.texto.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </section>

        {fotos.length > 0 && (
          <section>
            <h2 className="secao-titulo">
              Fotos <span>{fotos.length}</span>
            </h2>
            <ul className="galeria">
              {fotos.map((src) => (
                <li key={src}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={`Foto da ${t.nome}`} loading="lazy" />
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}
