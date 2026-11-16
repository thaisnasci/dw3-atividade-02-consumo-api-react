// Autenticação da nossa API própria:
// - a senha é guardada com hash (nunca a senha "pura")
// - no login a API devolve um token JWT
// - as rotas protegidas exigem o cabeçalho  Authorization: Bearer <token>

import { scryptSync, randomBytes, timingSafeEqual } from "crypto";
import jwt from "jsonwebtoken";

// Em produção, defina a variável de ambiente JWT_SECRET (arquivo .env.local)
const SEGREDO = process.env.JWT_SECRET || "queenbfans-segredo-de-desenvolvimento";

export function gerarHash(senha) {
  const sal = randomBytes(16).toString("hex");
  const hash = scryptSync(senha, sal, 64).toString("hex");
  return `${sal}:${hash}`;
}

export function conferirSenha(senha, guardado) {
  const [sal, hash] = guardado.split(":");
  const tentativa = scryptSync(senha, sal, 64);
  return timingSafeEqual(tentativa, Buffer.from(hash, "hex"));
}

export function gerarToken(usuario) {
  return jwt.sign(dadosPublicos(usuario), SEGREDO, { expiresIn: "2h" });
}

// O que pode ir para o navegador (nunca a senha)
export function dadosPublicos(usuario) {
  return { id: usuario.id, nome: usuario.nome, email: usuario.email, admin: !!usuario.admin };
}

// "Middleware": lê o token da requisição e devolve o usuário (ou null)
export function usuarioDoToken(request) {
  const cabecalho = request.headers.get("authorization") || "";
  const [tipo, token] = cabecalho.split(" ");
  if (tipo !== "Bearer" || !token) return null;
  try {
    return jwt.verify(token, SEGREDO);
  } catch {
    return null; // token inválido ou expirado
  }
}

export function naoAutorizado() {
  return Response.json({ erro: "Faça login para continuar." }, { status: 401 });
}
