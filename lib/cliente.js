"use client";

// Lado do navegador: axios configurado para falar com a NOSSA API (/api/...)
// e guardar o login (token) no localStorage.

import axios from "axios";
import { useEffect, useState } from "react";

const CHAVE = "queenb-sessao";
const EVENTO = "queenb-sessao-mudou";

export const api = axios.create({ baseURL: "/api" });

// Antes de cada requisição, coloca o token no cabeçalho Authorization
api.interceptors.request.use((config) => {
  const sessao = lerSessao();
  if (sessao?.token) config.headers.Authorization = `Bearer ${sessao.token}`;
  return config;
});

// Se a API responder 401 (token vencido), desloga
api.interceptors.response.use(
  (resposta) => resposta,
  (erro) => {
    if (erro.response?.status === 401) sair();
    return Promise.reject(erro);
  }
);

// Pega a mensagem de erro que a nossa API manda ({ erro: "..." })
export function mensagemDeErro(erro) {
  return erro.response?.data?.erro || "Algo deu errado. Tente de novo.";
}

export function lerSessao() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE));
  } catch {
    return null;
  }
}

export function entrar({ token, usuario }) {
  localStorage.setItem(CHAVE, JSON.stringify({ token, usuario }));
  window.dispatchEvent(new Event(EVENTO));
}

export function sair() {
  localStorage.removeItem(CHAVE);
  window.dispatchEvent(new Event(EVENTO));
}

// Hook: devolve { usuario, carregado } e atualiza quando a pessoa entra/sai
export function useSessao() {
  const [estado, setEstado] = useState({ usuario: null, carregado: false });

  useEffect(() => {
    function atualizar() {
      setEstado({ usuario: lerSessao()?.usuario ?? null, carregado: true });
    }
    atualizar();
    window.addEventListener(EVENTO, atualizar);
    window.addEventListener("storage", atualizar); // outra aba
    return () => {
      window.removeEventListener(EVENTO, atualizar);
      window.removeEventListener("storage", atualizar);
    };
  }, []);

  return estado;
}
