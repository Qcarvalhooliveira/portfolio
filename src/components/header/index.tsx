import { HeaderContainer } from "./styles";
import background from '../../assets/background.png';
import linkedin from '../../assets/linkedin.png';
import github from '../../assets/github.png';

export function Header(){
  return(
    <HeaderContainer style={{ backgroundImage: `url(${background})` }}>
      <div className="side-links">
        <a href="https://www.linkedin.com/in/queise-carvalho-de-oliveira-50359749/" target="_blank" rel="noopener noreferrer"><img src={linkedin} alt="linkedin" /></a>
        <a href="https://github.com/Qcarvalhooliveira" target="_blank" rel="noopener noreferrer"><img src={github} alt="github" /></a>
      </div>
      <div className="navigation">
        <button>Projects</button>
        <button>About me</button>
        <button>Contact</button>
      </div>
      <button>
        <a href="https://www.linkedin.com/in/queise-carvalho-de-oliveira-50359749/"
          target="_blank"
          rel="noopener noreferrer">
          Resume</a>
      </button>
    </HeaderContainer>

  );
}