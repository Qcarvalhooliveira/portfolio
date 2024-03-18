/* eslint-disable react/no-unescaped-entities */
import { HeaderContainer } from "./styles";
import { useState, useEffect } from 'react';
import background from '../../assets/background.png';
import linkedin from '../../assets/linkedin.png';
import github from '../../assets/github.png';
import scrolldown from '../../assets/Scrolldonw.png';

export function Header(){
  const [typedText, setTypedText] = useState('');
  const fullText = "Passionate about technology and innovation 💡, I am on a continuous journey 🚀 to enhance my skills in Web Development 💻.";
  const typingDelay = 100;
  const readingTime = 5000;
  const restartDelay = 2000;

  useEffect(() => {
    const typeText = (index = 0, currentText = '') => {
      if (index < fullText.length) {
        const nextText = currentText.slice(0, -1) + fullText[index] + '|';
        setTypedText(nextText);
        setTimeout(() => typeText(index + 1, nextText), typingDelay);
      } else {
        const finalText = currentText.slice(0, -1);
        setTypedText(finalText);

        setTimeout(() => {
          typeText();
        }, readingTime + restartDelay);
      }
    };

    typeText();

    return () => {
      setTypedText('');
    };
  }, [fullText, readingTime, typingDelay, restartDelay]);

  const scrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);


  return(
    <HeaderContainer style={{ backgroundImage: `url(${background})` }}>
      <div className="side-links">
        <a href="https://www.linkedin.com/in/queise-carvalho-de-oliveira-50359749/" target="_blank" rel="noopener noreferrer"><img src={linkedin} alt="linkedin" /></a>
        <a href="https://github.com/Qcarvalhooliveira" target="_blank" rel="noopener noreferrer"><img src={github} alt="github" /></a>
      </div>
      <div className="intro">
        Hi! I'm Queise
        <span>{typedText}</span>
      </div>
      <button onClick={scrollDown} className="scroll-down-btn">
        <img src={scrolldown} alt="Scroll down" />
      </button>
      <div className="navigation">
        <a href="#projects">Projects</a>
        <a href="#about">About me</a>
        <a href="#contact">Contact</a>
      </div>
      <button className="resume">
        <a href="https://drive.google.com/file/d/13P2-2AIEvRDEEqn2M9G8diYO3-Bj75wf/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer">
          Resume</a>
      </button>
      <div className="menu-icon" onClick={toggleMenu}>
        &#9776;
      </div>
      {isMenuOpen && (
        <div className="mobile-menu">
          <a href="#projects" onClick={toggleMenu}>Projects</a>
          <a href="#about" onClick={toggleMenu}>About me</a>
          <a href="#contact" onClick={toggleMenu}>Contact</a>
          <a href="https://drive.google.com/file/d/13P2-2AIEvRDEEqn2M9G8diYO3-Bj75wf/view?usp=sharing" target="_blank" onClick={toggleMenu} rel="noreferrer">Resume</a>
          <a href="https://www.linkedin.com/in/queise-carvalho-de-oliveira-50359749/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://github.com/Qcarvalhooliveira" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      )}
    </HeaderContainer>

  );
}