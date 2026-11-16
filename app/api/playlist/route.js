// GET  /api/playlist  → lista as músicas da playlist do usuário logado
// POST /api/playlist  → adiciona uma música na playlist
import { lerBanco, salvarBanco, novoId } from "@/lib/servidor/banco";
import { usuarioDoToken, naoAutorizado } from "@/lib/servidor/autenticacao";

export async function GET(request) {
  const usuario = usuarioDoToken(request);
  if (!usuario) return naoAutorizado();

  const banco = await lerBanco();
  const minhas = banco.playlist.filter((m) => m.usuarioId === usuario.id);
  return Response.json({ musicas: minhas });
}

export async function POST(request) {
  const usuario = usuarioDoToken(request);
  if (!usuario) return naoAutorizado();

  const dados = await request.json().catch(() => ({}));
  if (!dados.faixaId || !dados.titulo) {
    return Response.json({ erro: "Dados da música incompletos." }, { status: 400 });
  }

  const banco = await lerBanco();
  const jaTem = banco.playlist.some((m) => m.usuarioId === usuario.id && m.faixaId === dados.faixaId);
  if (jaTem) {
    return Response.json({ erro: "Essa música já está na sua playlist." }, { status: 409 });
  }

  const musica = {
    id: novoId(),
    usuarioId: usuario.id,
    faixaId: dados.faixaId,
    titulo: String(dados.titulo),
    album: String(dados.album || ""),
    albumId: dados.albumId || null,
    capa: String(dados.capa || ""),
    link: String(dados.link || ""),
    nota: 5,
    comentario: "",
    criadoEm: new Date().toISOString(),
  };
  banco.playlist.push(musica);
  await salvarBanco(banco);

  return Response.json({ musica }, { status: 201 });
}
