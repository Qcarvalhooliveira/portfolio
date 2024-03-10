import React from 'react';
import { useSpring, animated } from 'react-spring';
import { FooterContainer } from "./styles";
import logo from "../../assets/logo.png";
import discord from "../../assets/discord.png";

export function Footer() {
  // Mantendo o useSpring para animações suaves
  const [props, set] = useSpring(() => ({
    to: { opacity: 1 },
    from: { opacity: 0.5 }
  }));

  const handleMouseEnter = () => set({ opacity: 1 });
  const handleMouseLeave = () => set({ opacity: 0.5 });

  // Aqui podemos adicionar um efeito visual que responda ao mouse
  // Por simplicidade, vamos ajustar a opacidade com o mouse enter/leave
  // Para um efeito de ondulação, você precisaria de uma lógica mais complexa

  return (
    <FooterContainer
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <animated.div style={props} className="icons-container">
        <img src={logo} alt="Logo" />
        <a href="https://discord.com/invite/seuconvite" target="_blank" rel="noopener noreferrer">
          <img src={discord} alt="Discord" />
        </a>
      </animated.div>
    </FooterContainer>
  );
}
