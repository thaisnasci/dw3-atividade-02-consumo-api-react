// Sempre busca de novo: os links das prévias de áudio do Deezer expiram
export const dynamic = "force-dynamic";

import { topMusicas, buscarMusicas } from "@/lib/api";
import { MINHAS_FAVS } from "@/lib/dados";
import { top5DaAdm } from "@/lib/servidor/banco";
import ListaFaixas from "@/app/components/ListaFaixas";

export const metadata = { title: "Top ranking · QueenBFans" };

export default async function Ranking() {
  // Top 5 da ADM = a playlist da conta ADM (notas mais altas).
  // Enquanto ela não tiver músicas, mostra a lista padrão de lib/dados.js.
  const daAdm = await top5DaAdm();
  const escolhidas = daAdm.length ? daAdm.map((m) => ({ id: m.faixaId, nome: m.titulo })) : MINHAS_FAVS;

  const [favs, musicas] = await Promise.all([buscarMusicas(escolhidas), topMusicas(50)]);

  return (
    <div className="pagina" data-tema="queenb">
      <main className="container">
        <span className="sobretitulo">As escolhidas</span>
        <h1 className="cromado titulo-pagina">TOP 5 DA ADM</h1>
        <p className="intro">
          As favoritas de quem cuida do QueenBFans, escolhidas na playlist da ADM. Clique no número para ouvir um
          pedacinho.
        </p>
        <ListaFaixas faixas={favs} ranking semBarra />

        <span className="sobretitulo bloco-separado">As mais ouvidas no Deezer</span>
        <h2 className="cromado titulo-pagina">TOP {musicas.length}</h2>
        <p className="intro">
          Ranking das músicas da Beyoncé mais populares agora no Deezer. A barra mostra a popularidade comparada à 1ª
          colocada.
        </p>
        <ListaFaixas faixas={musicas} ranking />
      </main>
    </div>
  );
}
