import { Unbounded, Rye, Playfair_Display, Inter, Cinzel } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const unbounded = Unbounded({ subsets: ["latin"], variable: "--f-unbounded", weight: ["300", "500", "800"] });
const rye = Rye({ subsets: ["latin"], variable: "--f-rye", weight: "400" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--f-playfair", style: ["normal", "italic"] });
const inter = Inter({ subsets: ["latin"], variable: "--f-inter" });
const cinzel = Cinzel({ subsets: ["latin"], variable: "--f-cinzel", weight: ["600", "800"] });

export const metadata = {
  title: "QueenBFans · Tudo sobre a Beyoncé",
  description: "Discografia da Beyoncé consumindo a API pública do Deezer.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`${unbounded.variable} ${rye.variable} ${playfair.variable} ${inter.variable} ${cinzel.variable}`}>
        <Navbar />
        {children}
        <footer className="rodape">
          Dados de álbuns e músicas: API pública do{" "}
          <a href="https://developers.deezer.com/api" target="_blank" rel="noreferrer">Deezer</a> · QueenBFans · Atividade DW3 · 2º bimestre
        </footer>
      </body>
    </html>
  );
}
