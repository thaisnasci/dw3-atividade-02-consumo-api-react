"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { sair, useSessao } from "@/lib/cliente";

const LINKS = [
  { href: "/#sobre", texto: "Sobre" },
  { href: "/#albuns", texto: "Álbuns" },
  { href: "/turnes", texto: "Turnês" },
  { href: "/ranking", texto: "Top ranking" },
  { href: "/minha-playlist", texto: "Minha playlist" },
];

export default function Navbar() {
  const caminho = usePathname();
  const [aberto, setAberto] = useState(false);
  const { usuario, carregado } = useSessao();

  function ativo(href) {
    if (href.startsWith("/#")) return false;
    return caminho.startsWith(href);
  }

  return (
    <nav className="navbar">
      <div className="navbar-dentro">
        <Link href="/" className="logo" onClick={() => setAberto(false)}>
          Queen<span>B</span>Fans
        </Link>

        <button className="menu-botao" onClick={() => setAberto(!aberto)} aria-label="Abrir menu" aria-expanded={aberto}>
          {aberto ? "✕" : "☰"}
        </button>

        <ul className={aberto ? "aberto" : ""}>
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className={ativo(l.href) ? "ativo" : ""} onClick={() => setAberto(false)}>
                {l.texto}
              </Link>
            </li>
          ))}
          {carregado && (
            <li>
              {usuario ? (
                <button
                  className="nav-sair"
                  onClick={() => {
                    sair();
                    setAberto(false);
                  }}
                  title={`Conta: ${usuario.email}`}
                >
                  Sair ({usuario.nome.split(" ")[0]})
                </button>
              ) : (
                <Link href="/login" className={`nav-entrar ${ativo("/login") ? "ativo" : ""}`} onClick={() => setAberto(false)}>
                  Entrar
                </Link>
              )}
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
