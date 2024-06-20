import { useRef } from 'react';
import { FooterContainer } from "./styles";
import logo from "../../assets/logo.png";
import discord from "../../assets/discord.png";

const getFullYear = () => {
  const currentDate = new Date();
  return currentDate.getFullYear();
};

export function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const footer = footerRef.current;
    if (!footer) return;

    const rect = footer.getBoundingClientRect();
    const size = Math.max(footer.offsetWidth, footer.offsetHeight) / 8;

    for (let i = 0; i < 3; i++) {
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      const ink = document.createElement('span');
      ink.className = 'ink';
      ink.style.width = `${size}px`;
      ink.style.height = `${size}px`;
      ink.style.left = `${x}px`;
      ink.style.top = `${y}px`;
      ink.style.position = 'absolute';

      setTimeout(() => {
        footer.appendChild(ink);
        setTimeout(() => ink.remove(), 850);
      }, i * 100);
    }
  };

  return (
    <FooterContainer ref={footerRef} onMouseMove={handleMouseMove}>
      <div className="icons-container">
        <img src={logo} alt="Logo" />
        <a href="https://discord.gg/MsKE63YqUY" target="_blank" rel="noopener noreferrer">
          <img src={discord} alt="Discord" />
        </a>
      </div>
      <div className="author">
        <p>© {getFullYear()} Queise Carvalho</p>
      </div>
    </FooterContainer>
  );
}
