// Lê as fotos que você salvar em public/turnes/[slug]/ e public/sobre.*
// Não precisa mexer no código: é só colocar as imagens na pasta certa.
// Uma foto chamada "capa" (ex.: capa.jpg) vira o pôster da turnê; se não tiver, usa a primeira.

import fs from "node:fs";
import path from "node:path";

const PUBLIC = path.join(process.cwd(), "public");
const IMAGEM = /\.(jpe?g|png|webp|avif|gif)$/i;

export function fotosDaTurne(slug) {
  const pasta = path.join(PUBLIC, "turnes", slug);
  let arquivos = [];
  try {
    arquivos = fs.readdirSync(pasta).filter((a) => IMAGEM.test(a)).sort();
  } catch {
    return { capa: null, fotos: [] };
  }
  const urls = arquivos.map((a) => `/turnes/${slug}/${encodeURIComponent(a)}`);
  const iCapa = arquivos.findIndex((a) => /^capa\./i.test(a));
  return {
    capa: iCapa >= 0 ? urls[iCapa] : urls[0] ?? null,
    fotos: urls.filter((_, i) => i !== iCapa),
  };
}

export function fotoSobre() {
  try {
    const arquivo = fs.readdirSync(PUBLIC).find((a) => /^sobre\./i.test(a) && IMAGEM.test(a));
    return arquivo ? `/${arquivo}` : null;
  } catch {
    return null;
  }
}
