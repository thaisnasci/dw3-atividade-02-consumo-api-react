// POST /api/login  → confere e-mail e senha e devolve um token
import { lerBanco } from "@/lib/servidor/banco";
import { conferirSenha, gerarToken, dadosPublicos } from "@/lib/servidor/autenticacao";

export async function POST(request) {
  const { email = "", senha = "" } = await request.json().catch(() => ({}));
  if (!email || !senha) {
    return Response.json({ erro: "Informe e-mail e senha." }, { status: 400 });
  }

  const banco = await lerBanco();
  const usuario = banco.usuarios.find((u) => u.email === email.trim().toLowerCase());

  if (!usuario || !conferirSenha(senha, usuario.senha)) {
    return Response.json({ erro: "E-mail ou senha incorretos." }, { status: 401 });
  }

  return Response.json({ token: gerarToken(usuario), usuario: dadosPublicos(usuario) });
}
