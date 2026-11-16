// POST /api/usuarios  → cadastra um novo usuário
import { lerBanco, salvarBanco, novoId } from "@/lib/servidor/banco";
import { gerarHash, gerarToken, dadosPublicos } from "@/lib/servidor/autenticacao";

export async function POST(request) {
  const { nome = "", email = "", senha = "" } = await request.json().catch(() => ({}));

  if (!nome.trim() || !email.trim() || !senha) {
    return Response.json({ erro: "Preencha nome, e-mail e senha." }, { status: 400 });
  }
  if (senha.length < 4) {
    return Response.json({ erro: "A senha precisa ter pelo menos 4 caracteres." }, { status: 400 });
  }

  const banco = await lerBanco();
  const emailNormal = email.trim().toLowerCase();
  if (banco.usuarios.some((u) => u.email === emailNormal)) {
    return Response.json({ erro: "Já existe uma conta com esse e-mail." }, { status: 409 });
  }

  const usuario = { id: novoId(), nome: nome.trim(), email: emailNormal, senha: gerarHash(senha) };
  banco.usuarios.push(usuario);
  await salvarBanco(banco);

  // Já devolve o token para a pessoa entrar direto depois do cadastro
  return Response.json({ token: gerarToken(usuario), usuario: dadosPublicos(usuario) }, { status: 201 });
}
