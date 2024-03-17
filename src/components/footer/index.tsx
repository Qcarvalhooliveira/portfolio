import { FooterContainer } from "./styles";
import logo from "../../assets/logo.png";
import discord from "../../assets/discord.png";

export function Footer() {

  return (
    <FooterContainer>
      <div className="icons-container">
        <img src={logo} alt="Logo" />
        <a href="https://discord.com/invite/seuconvite" target="_blank" rel="noopener noreferrer">
          <img src={discord} alt="Discord" />
        </a>
      </div>
      <div className="author">
        <p>
          ©2024 Queise Carvalho
        </p>
      </div>
    </FooterContainer>
  );
}
