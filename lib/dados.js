// Informações escritas direto no código (não vêm de API).
// A API do projeto é a do Deezer (álbuns, faixas e ranking); aqui ficam a biografia e as turnês.
// Pode editar os textos à vontade!

export const SOBRE = {
  paragrafos: [
    "Beyoncé Giselle Knowles-Carter nasceu em 4 de setembro de 1981, em Houston, no Texas. Ainda criança já se apresentava em concursos de canto e dança, e no fim dos anos 1990 ficou famosa como vocalista do Destiny's Child, um dos girl groups mais bem-sucedidos de todos os tempos.",
    "Em 2003 lançou seu primeiro álbum solo, Dangerously in Love, com hits como \"Crazy in Love\" e \"Baby Boy\". Depois vieram B'Day, I Am... Sasha Fierce e 4, com músicas como \"Irreplaceable\", \"Single Ladies\", \"Halo\" e \"Run the World (Girls)\".",
    "Com BEYONCÉ (2013) e Lemonade (2016) ela reinventou o jeito de lançar música, com álbuns visuais e lançamentos surpresa. Em 2022 veio RENAISSANCE, uma homenagem à música dance e à cultura LGBTQIA+ negra, e em 2024 COWBOY CARTER, que levou o Grammy de Álbum do Ano.",
    "Além de cantora, é compositora, atriz, diretora e empresária. Ela é a artista com mais prêmios Grammy da história, e suas turnês estão entre as de maior bilheteria de todos os tempos.",
  ],
};

// Turnês: o "slug" é o identificador usado na rota /turnes/[slug]
// e também o nome da pasta das fotos em public/turnes/[slug]/
export const TURNES = [
  {
    slug: "cowboy-carter-tour",
    nome: "Cowboy Carter Tour",
    ano: "2025",
    tema: "cowboy",
    album: "COWBOY CARTER",
    shows: "32",
    bilheteria: "mais de US$ 400 milhões",
    resumo: "A turnê do COWBOY CARTER levou o country, o rodeio e a história negra americana para os estádios.",
    texto: [
      "A Cowboy Carter Tour divulgou o oitavo álbum de estúdio da Beyoncé e passou por estádios dos Estados Unidos e da Europa em 2025.",
      "O show foi dividido em atos que misturam country, rock, R&B e músicas do RENAISSANCE, com cavalos, rodeio e muitos figurinos inspirados no Velho Oeste. Blue Ivy e Rumi, filhas da cantora, participaram de várias apresentações.",
    ],
  },
  {
    slug: "renaissance-world-tour",
    nome: "Renaissance World Tour",
    ano: "2023",
    tema: "renaissance",
    album: "RENAISSANCE",
    shows: "56",
    bilheteria: "cerca de US$ 580 milhões",
    resumo: "Uma pista de dança cromada do tamanho de um estádio, e uma das turnês de maior bilheteria da história.",
    texto: [
      "A Renaissance World Tour passou pela Europa e pela América do Norte em 2023 para celebrar o álbum RENAISSANCE, inspirado na música disco, no house e na cultura ballroom.",
      "O palco tinha um telão gigante, um cavalo prateado e uma bola espelhada, e os fãs foram aos shows com roupas prateadas e brilhantes. A turnê virou o filme Renaissance: A Film by Beyoncé, lançado nos cinemas no fim de 2023.",
    ],
  },
  {
    slug: "on-the-run-ii-tour",
    nome: "On the Run II Tour",
    ano: "2018",
    tema: "sasha",
    album: "Everything Is Love (com Jay-Z)",
    shows: "48",
    bilheteria: "cerca de US$ 250 milhões",
    resumo: "A segunda turnê do casal Beyoncé e Jay-Z, como The Carters.",
    texto: [
      "Na On the Run II Tour, Beyoncé e Jay-Z voltaram a dividir o palco e passaram pela Europa e pela América do Norte.",
      "Durante a turnê o casal lançou o álbum Everything Is Love, assinado como The Carters.",
    ],
  },
  {
    slug: "formation-world-tour",
    nome: "The Formation World Tour",
    ano: "2016",
    tema: "lemonade",
    album: "Lemonade",
    shows: "49",
    bilheteria: "cerca de US$ 256 milhões",
    resumo: "Só em estádios, com um cubo giratório gigante e uma piscina no palco.",
    texto: [
      "A Formation World Tour divulgou o álbum visual Lemonade e foi a primeira turnê solo da Beyoncé feita só em estádios.",
      "O destaque do palco era um enorme cubo giratório com telões, e no fim do show uma área com água onde ela cantava e dançava com os bailarinos.",
    ],
  },
  {
    slug: "on-the-run-tour",
    nome: "On the Run Tour",
    ano: "2014",
    tema: "sasha",
    album: "BEYONCÉ / Magna Carta Holy Grail",
    shows: "21",
    bilheteria: "cerca de US$ 110 milhões",
    resumo: "A primeira turnê de estádios dividida com Jay-Z, com estética de filme de ação.",
    texto: [
      "A On the Run Tour juntou Beyoncé e Jay-Z em estádios dos Estados Unidos, do Canadá e de Paris.",
      "Os shows tinham vídeos no estilo de filme de casal fora da lei, intercalando sucessos dos dois.",
    ],
  },
  {
    slug: "mrs-carter-show-world-tour",
    nome: "The Mrs. Carter Show World Tour",
    ano: "2013–2014",
    tema: "beyonce",
    album: "4 / BEYONCÉ",
    shows: "132",
    bilheteria: "cerca de US$ 230 milhões",
    resumo: "Inspirada na realeza, passou pelo Brasil e foi a turnê com mais shows da carreira dela.",
    texto: [
      "A Mrs. Carter Show World Tour começou em 2013 e passou por Europa, América do Norte, América do Sul (incluindo o Brasil, no Rock in Rio) e Oceania.",
      "No meio da turnê ela lançou de surpresa o álbum BEYONCÉ, e as novas músicas entraram no repertório.",
    ],
  },
  {
    slug: "i-am-world-tour",
    nome: "I Am... World Tour",
    ano: "2009–2010",
    tema: "sasha",
    album: "I Am... Sasha Fierce",
    shows: "108",
    bilheteria: "cerca de US$ 120 milhões",
    resumo: "O lado Beyoncé e o lado Sasha Fierce no mesmo palco, nos cinco continentes.",
    texto: [
      "A I Am... World Tour divulgou o álbum duplo I Am... Sasha Fierce, mostrando os dois lados da artista: o romântico e o poderoso alter ego Sasha Fierce.",
      "Foi a primeira turnê dela a passar pelo Brasil, em 2010.",
    ],
  },
  {
    slug: "beyonce-experience",
    nome: "The Beyoncé Experience",
    ano: "2007",
    tema: "bday",
    album: "B'Day",
    shows: "97",
    bilheteria: "cerca de US$ 90 milhões",
    resumo: "A primeira turnê mundial, com uma banda formada só por mulheres.",
    texto: [
      "The Beyoncé Experience divulgou o álbum B'Day e foi a primeira turnê mundial da cantora.",
      "Ela se apresentava com as Suga Mama, uma banda formada só por mulheres, e com as Mamas, suas backing vocals.",
    ],
  },
  {
    slug: "dangerously-in-love-tour",
    nome: "Dangerously in Love Tour",
    ano: "2003",
    tema: "dangerously",
    album: "Dangerously in Love",
    shows: "",
    bilheteria: "",
    resumo: "A primeira turnê solo, logo depois do álbum de estreia.",
    texto: [
      "A Dangerously in Love Tour foi a primeira turnê solo da Beyoncé, feita na Europa no fim de 2003 para divulgar o álbum de estreia.",
      "O show do Wembley Arena, em Londres, foi gravado e lançado em DVD.",
    ],
  },
];

// Top 5 padrão: aparece no ranking enquanto a playlist da ADM estiver vazia.
// Os IDs são das músicas no Deezer (os dados de cada uma vêm da API).
// Para trocar uma música, procure o ID dela no Deezer (aparece no link: deezer.com/track/ID).
export const MINHAS_FAVS = [
  { id: 669486692, nome: "Sandcastles" }, // Lemonade
  { id: 1842063517, nome: "CHURCH GIRL" }, // RENAISSANCE
  { id: 715555722, nome: "NILE" }, // The Lion King: The Gift
  { id: 2169155, nome: "Check On It" }, // B'Day
  { id: 667004362, nome: "Party (Homecoming Live)" }, // HOMECOMING
];
