// API pública usada para os dados (não precisa de login nem chave):
// - Deezer: lista de álbuns da Beyoncé, detalhe de cada álbum, faixas e ranking
//
// As requisições são feitas com axios.

import axios from "axios";

const BEYONCE_ID = 145; // ID da Beyoncé no Deezer

// "Instância" do axios: toda chamada já sai com o endereço base do Deezer
const deezer = axios.create({
  baseURL: "https://api.deezer.com",
  timeout: 10000,
});

// Álbuns que não entram no catálogo (ao vivo de turnê / single com remixes)
const IGNORAR = /world tour|experience live|single & remixes/i;

// Tira "[Deluxe Edition]", "(20th Anniversary...)" etc. para juntar edições repetidas
function nomeBase(titulo) {
  return titulo
    .replace(/\[.*?\]|\(.*?\)/g, "")
    .replace(/deluxe edition|: the live album/gi, "")
    .trim()
    .toLowerCase();
}

// ---------- LISTAGEM ----------
export async function listarAlbuns() {
  const { data: resposta } = await deezer.get(`/artist/${BEYONCE_ID}/albums`, { params: { limit: 200 } });
  if (!resposta.data) throw new Error("Não foi possível carregar a discografia");

  const porNome = new Map();
  for (const a of resposta.data) {
    if (a.record_type !== "album" || IGNORAR.test(a.title)) continue;
    const chave = nomeBase(a.title);
    const atual = porNome.get(chave);
    const ehEdicaoEspecial = /[[(]|deluxe/i.test(a.title);
    // Fica com a edição "normal" do álbum; se só tiver edição especial, usa ela
    if (!atual || (atual.especial && !ehEdicaoEspecial)) {
      porNome.set(chave, {
        id: a.id,
        titulo: a.title,
        capa: a.cover_xl || a.cover_big,
        ano: a.release_date?.slice(0, 4),
        especial: ehEdicaoEspecial,
      });
    }
  }

  return [...porNome.values()].sort((a, b) => b.ano - a.ano);
}

// ---------- DETALHE ----------
export async function buscarAlbum(id) {
  const [{ data: album }, { data: faixasResp }] = await Promise.all([
    deezer.get(`/album/${id}`),
    deezer.get(`/album/${id}/tracks`, { params: { limit: 100 } }),
  ]);
  // O Deezer responde 200 mesmo quando o álbum não existe, mas com um campo "error"
  if (album.error) return null;
  const faixas = faixasResp.data ?? [];

  return {
    id: album.id,
    titulo: album.title,
    capa: album.cover_xl || album.cover_big,
    capaPequena: album.cover_medium,
    lancamento: album.release_date,
    gravadora: album.label,
    duracao: album.duration,
    generos: album.genres?.data?.map((g) => g.name) ?? [],
    link: album.link,
    fas: album.fans,
    faixas: faixas.map((f) => ({
      id: f.id,
      titulo: f.title,
      duracao: f.duration,
      explicita: f.explicit_lyrics,
      previa: f.preview || null,
      link: f.link,
    })),
  };
}

// ---------- ARTISTA (números do Deezer) ----------
export async function buscarArtista() {
  const { data: a } = await deezer.get(`/artist/${BEYONCE_ID}`);
  return { fas: a.nb_fan, foto: a.picture_xl, link: a.link };
}

// Transforma uma faixa do Deezer no formato usado pelas listas do site
function converterFaixa(f, nome) {
  return {
    id: f.id,
    titulo: nome || f.title,
    duracao: f.duration,
    explicita: f.explicit_lyrics,
    previa: f.preview || null,
    link: f.link,
    popularidade: f.rank,
    album: { id: f.album.id, titulo: f.album.title, capa: f.album.cover_medium },
  };
}

// ---------- TOP RANKING (músicas mais ouvidas no Deezer) ----------
export async function topMusicas(quantidade = 50) {
  const { data: resposta } = await deezer.get(`/artist/${BEYONCE_ID}/top`, { params: { limit: quantidade } });
  return (resposta.data ?? []).map((f) => converterFaixa(f));
}

// ---------- MÚSICAS ESPECÍFICAS POR ID (meu top 5) ----------
export async function buscarMusicas(lista) {
  const musicas = await Promise.all(
    lista.map(async ({ id, nome }) => {
      const { data: f } = await deezer.get(`/track/${id}`);
      if (f.error) return null;
      return converterFaixa(f, nome || f.title_short);
    })
  );
  return musicas.filter(Boolean);
}

// ---------- utilidades ----------
export function formatarTempo(segundos) {
  const h = Math.floor(segundos / 3600);
  const m = Math.floor((segundos % 3600) / 60);
  const s = String(segundos % 60).padStart(2, "0");
  return h ? `${h}h ${m}min` : `${m}:${s}`;
}

export function formatarData(iso) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" });
}
