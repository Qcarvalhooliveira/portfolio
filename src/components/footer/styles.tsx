// No seu arquivo styles.tsx
import styled from 'styled-components';

export const FooterContainer = styled.footer`
  width: 100%;
  height: 200px;
  background-color: #800F74;
  position: absolute;

  .icons-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 60rem;
    padding: 50px;
  }

  img {
    height: 50px;
  }

  .author p {
    display:flex;
    align-items:center;
    justify-content: center;
    color: #fff;
    font-family: 'Bungee Hairline'; 
    font-weight: 700;

  }

@media screen and (max-width: 768px) {
  
  .icons-container{
    gap: 30rem;
  }
}

@media screen and (max-width: 480px) {
  
  .icons-container {
    display:flex;
    align-items:center;
    justify-content: center;
    gap: 14rem;

    img {
    height: 40px;
  }
}
}

`;
