import Link from "next/link";
import { TURNES } from "@/lib/dados";
import { fotosDaTurne } from "@/lib/fotos";

export const metadata = { title: "Turnês · QueenBFans" };
export const dynamic = "force-dynamic"; // lê as fotos da pasta a cada visita

export default function Turnes() {
  return (
    <div className="pagina" data-tema="queenb">
      <main className="container">
        <span className="sobretitulo">No palco</span>
        <h1 className="cromado titulo-pagina">TURNÊS</h1>

        <ul className="grade grade-turnes">
          {TURNES.map((t) => {
            const { capa } = fotosDaTurne(t.slug);
            return (
              <li key={t.slug}>
                <Link href={`/turnes/${t.slug}`} className="card card-turne" data-tema={t.tema}>
                  <div className="card-capa">
                    {capa ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={capa} alt={`Foto da ${t.nome}`} loading="lazy" />
                    ) : (
                      <span className="sem-foto">{t.ano}</span>
                    )}
                  </div>
                  <div className="card-info">
                    <h3>{t.nome}</h3>
                    <span>{t.ano}</span>
                    <p>{t.resumo}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}
