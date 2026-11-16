// "Banco de dados" da nossa API própria.
// Para não precisar instalar um banco (MongoDB, MySQL...), os dados ficam
// salvos num arquivo JSON: data/banco.json
//
// Formato:
// {
//   "usuarios": [ { id, nome, email, senha (hash) } ],
//   "playlist": [ { id, usuarioId, faixaId, titulo, album, albumId, capa, link, nota, comentario, criadoEm } ]
// }

import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { gerarHash } from "./autenticacao";

const PASTA = path.join(process.cwd(), "data");
const ARQUIVO = path.join(PASTA, "banco.json");

// Conta da ADM: a playlist dela vira o "Top 5 da ADM" na página de ranking.
// Para trocar o e-mail/senha, crie o arquivo .env.local com ADMIN_EMAIL e ADMIN_SENHA.
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "admin@queenbfans.com").toLowerCase();
const ADMIN_SENHA = process.env.ADMIN_SENHA || "admin123";

export async function lerBanco() {
  let banco;
  try {
    banco = JSON.parse(await fs.readFile(ARQUIVO, "utf-8"));
  } catch {
    // arquivo ainda não existe: começa vazio
    banco = { usuarios: [], playlist: [] };
  }

  // Na primeira vez, cria a conta da ADM automaticamente
  if (!banco.usuarios.some((u) => u.admin)) {
    banco.usuarios.push({ id: novoId(), nome: "ADM", email: ADMIN_EMAIL, senha: gerarHash(ADMIN_SENHA), admin: true });
    await salvarBanco(banco);
  }
  return banco;
}

// Top 5 da ADM: as músicas da playlist dela com as maiores notas
export async function top5DaAdm() {
  const banco = await lerBanco();
  const adm = banco.usuarios.find((u) => u.admin);
  return banco.playlist
    .filter((m) => m.usuarioId === adm.id)
    .sort((a, b) => b.nota - a.nota || a.criadoEm.localeCompare(b.criadoEm))
    .slice(0, 5);
}

export async function salvarBanco(banco) {
  await fs.mkdir(PASTA, { recursive: true });
  await fs.writeFile(ARQUIVO, JSON.stringify(banco, null, 2));
}

// Gera um id único
export function novoId() {
  return randomUUID();
}
