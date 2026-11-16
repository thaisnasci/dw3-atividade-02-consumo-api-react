// Cada álbum ganha a "estética" dele. O tema vira um atributo data-tema no HTML
// e o CSS (globals.css) troca cores, fontes e fundo de acordo com ele.

const TEMAS = [
  { tema: "cowboy", teste: /cowboy carter/i, frase: "Ato II" },
  { tema: "renaissance", teste: /renaissance/i, frase: "Ato I" },
  { tema: "leao", teste: /lion king/i, frase: "The Gift" },
  { tema: "homecoming", teste: /homecoming/i, frase: "Ao vivo em Coachella" },
  { tema: "lemonade", teste: /lemonade/i, frase: "Álbum visual" },
  { tema: "beyonce", teste: /^beyonc[eé]/i, frase: "Álbum visual surpresa" },
  { tema: "quatro", teste: /^4$/, frase: "Quarto álbum" },
  { tema: "sasha", teste: /sasha fierce/i, frase: "Álbum duplo" },
  { tema: "bday", teste: /b'day/i, frase: "Lançado no aniversário dela" },
  { tema: "dangerously", teste: /dangerously/i, frase: "Álbum de estreia" },
];

export function temaDoAlbum(titulo) {
  return TEMAS.find((t) => t.teste.test(titulo.trim())) ?? { tema: "renaissance", frase: "" };
}
