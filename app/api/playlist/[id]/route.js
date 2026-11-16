// PUT    /api/playlist/:id  → edita a nota e o comentário de uma música
// DELETE /api/playlist/:id  → exclui a música da playlist
import { lerBanco, salvarBanco } from "@/lib/servidor/banco";
import { usuarioDoToken, naoAutorizado } from "@/lib/servidor/autenticacao";

// Procura a música garantindo que ela é do usuário logado
async function acharMusica(request, params) {
  const usuario = usuarioDoToken(request);
  if (!usuario) return { erro: naoAutorizado() };

  const { id } = await params;
  const banco = await lerBanco();
  const indice = banco.playlist.findIndex((m) => m.id === id && m.usuarioId === usuario.id);
  if (indice === -1) {
    return { erro: Response.json({ erro: "Música não encontrada na sua playlist." }, { status: 404 }) };
  }
  return { banco, indice };
}

export async function PUT(request, { params }) {
  const { erro, banco, indice } = await acharMusica(request, params);
  if (erro) return erro;

  const { nota, comentario } = await request.json().catch(() => ({}));
  const numero = Number(nota);
  if (!Number.isInteger(numero) || numero < 1 || numero > 5) {
    return Response.json({ erro: "A nota deve ser de 1 a 5." }, { status: 400 });
  }

  banco.playlist[indice] = {
    ...banco.playlist[indice],
    nota: numero,
    comentario: String(comentario ?? "").slice(0, 300),
  };
  await salvarBanco(banco);
  return Response.json({ musica: banco.playlist[indice] });
}

export async function DELETE(request, { params }) {
  const { erro, banco, indice } = await acharMusica(request, params);
  if (erro) return erro;

  banco.playlist.splice(indice, 1);
  await salvarBanco(banco);
  return new Response(null, { status: 204 });
}
