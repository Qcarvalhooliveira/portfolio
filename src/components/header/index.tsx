import { HeaderContainer } from "./styles";
import background from '../../assets/background.png';
export function Header(){
  return(
    <HeaderContainer style={{ backgroundImage: `url(${background})` }}>
      <div className="navigation">
        <button>Projects</button>
        <button>About me</button>
        <button>Contact</button>
      </div>
      <button>Resume</button>
    </HeaderContainer>

  );
}