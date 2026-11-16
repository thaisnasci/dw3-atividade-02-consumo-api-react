"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api, entrar, mensagemDeErro } from "@/lib/cliente";

function FormularioLogin() {
  const router = useRouter();
  const destino = useSearchParams().get("voltar") || "/minha-playlist";

  const [modo, setModo] = useState("entrar"); // "entrar" ou "cadastrar"
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  const cadastro = modo === "cadastrar";

  async function enviar(e) {
    e.preventDefault();
    setErro("");
    setEnviando(true);
    try {
      const { data } = cadastro
        ? await api.post("/usuarios", { nome, email, senha })
        : await api.post("/login", { email, senha });
      entrar(data);
      router.push(destino);
    } catch (falha) {
      setErro(mensagemDeErro(falha));
      setEnviando(false);
    }
  }

  function trocarModo() {
    setModo(cadastro ? "entrar" : "cadastrar");
    setErro("");
  }

  return (
    <form className="form-login" onSubmit={enviar}>
      <span className="sobretitulo">Área do fã</span>
      <h1 className="cromado titulo-form">{cadastro ? "Criar conta" : "Entrar"}</h1>
      <p className="intro">
        {cadastro
          ? "Crie sua conta para montar a sua playlist da Queen B."
          : "Entre para ver e editar a sua playlist."}
      </p>

      {cadastro && (
        <label>
          Nome
          <input value={nome} onChange={(e) => setNome(e.target.value)} required autoComplete="name" />
        </label>
      )}
      <label>
        E-mail
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
      </label>
      <label>
        Senha
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          minLength={4}
          autoComplete={cadastro ? "new-password" : "current-password"}
        />
      </label>

      {erro && <p className="form-erro" role="alert">{erro}</p>}

      <button className="botao" disabled={enviando}>
        {enviando ? "Aguarde..." : cadastro ? "Criar conta" : "Entrar"}
      </button>

      <button type="button" className="link-botao" onClick={trocarModo}>
        {cadastro ? "Já tenho conta → Entrar" : "Não tem conta? Cadastre-se"}
      </button>
    </form>
  );
}

export default function Login() {
  return (
    <div className="pagina" data-tema="queenb">
      <main className="container">
        <Suspense>
          <FormularioLogin />
        </Suspense>
      </main>
    </div>
  );
}
