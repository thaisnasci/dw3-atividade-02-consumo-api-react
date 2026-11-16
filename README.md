# Beyoncé · Discografia

Atividade DW3 (2º bimestre): site em **React + Next.js** que consome APIs públicas.
Visual inspirado no RENAISSANCE, e cada álbum/turnê aparece com a estética dele.

## APIs usadas (públicas, sem login)
- **Deezer:** álbuns, faixas e ranking
  - Listagem de álbuns: `https://api.deezer.com/artist/145/albums`
  - Detalhe do álbum por ID: `https://api.deezer.com/album/{id}` e `/album/{id}/tracks`
  - Top músicas: `https://api.deezer.com/artist/145/top?limit=50`

## API própria (login e playlist)
Além de consumir o Deezer (com **axios**), o projeto tem uma API própria feita com as rotas do Next (`app/api/`):

| Método | Rota | O que faz |
|---|---|---|
| POST | `/api/usuarios` | cadastra um usuário |
| POST | `/api/login` | confere e-mail/senha e devolve um token JWT |
| GET | `/api/playlist` | lista a playlist de quem está logado |
| POST | `/api/playlist` | adiciona uma música |
| PUT | `/api/playlist/:id` | edita a nota e o comentário |
| DELETE | `/api/playlist/:id` | exclui a música |

As rotas de playlist exigem o cabeçalho `Authorization: Bearer <token>`.
Os dados ficam em `data/banco.json` (criado sozinho e fora do Git).

### Variáveis de ambiente
Copie o `.env.example` para `.env.local` e preencha:

| Variável | Para que serve |
|---|---|
| `JWT_SECRET` | segredo que assina os tokens de login |
| `ADMIN_EMAIL` | e-mail da conta ADM |
| `ADMIN_SENHA` | senha da conta ADM |

O `.env.local` não vai para o GitHub. Sem ele, a API usa valores padrão só para testes
(ADM `admin@queenbfans.com` / `admin123`).

### Conta ADM
Na primeira vez que a API roda, ela cria a conta da ADM com o e-mail e a senha do `.env.local`.
As 5 músicas com as maiores notas na playlist da ADM aparecem como **Top 5 da ADM** na página `/ranking`.
Enquanto a playlist dela estiver vazia, aparece a lista padrão de `lib/dados.js`.

> A conta ADM só é criada uma vez. Se mudar `ADMIN_SENHA` depois, apague a pasta `data/` para ela ser recriada
> (isso apaga também os usuários e playlists).

## Informações escritas à mão
O texto "Sobre ela" e as turnês ficam em `lib/dados.js`. As fotos das turnês ficam em `public/turnes/` (veja o LEIA-ME de lá).

## Rotas
- `/`: landing page com abertura, "Sobre ela" e o **catálogo de álbuns** em cards. Cada card leva ao álbum.
- `/album/[id]`: capa, dados, faixas com prévia de 30s, link para o Deezer e botão de voltar.
- `/turnes`: cards das turnês. Cada um leva a `/turnes/[slug]`, com texto, números e fotos.
- `/ranking`: Top 5 da ADM e top 50 músicas mais ouvidas no Deezer, com prévia e barra de popularidade.
- `/login`: entrar ou criar conta.
- `/minha-playlist`: playlist da pessoa logada, com editar (nota e comentário) e excluir.

## Estrutura
- `lib/api.js`: chamadas ao Deezer (axios)
- `lib/cliente.js`: axios do navegador para a nossa API + login guardado no navegador
- `lib/servidor/`: banco em JSON e autenticação (hash de senha + JWT)
- `app/api/`: rotas da API própria
- `lib/dados.js`: textos escritos à mão (biografia e turnês)
- `lib/fotos.js`: lê as fotos salvas em `public/turnes/[slug]/` e `public/sobre.jpg`
- `lib/temas.js`: qual estética cada álbum usa
- `app/components/`: Navbar e lista de faixas (com player)
- `app/globals.css`: estilos e temas (`[data-tema="..."]`)

## Como rodar
```bash
npm install
cp .env.example .env.local   # e troque os valores
npm run dev
```
Abra http://localhost:3000
