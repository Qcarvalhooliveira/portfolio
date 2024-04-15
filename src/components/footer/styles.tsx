// No seu arquivo styles.tsx
import styled from 'styled-components';

export const FooterContainer = styled.footer`
  width: 100%;
  height: 200px;
  background: rgb(242,11,218);
  background: linear-gradient(90deg, rgba(242,11,218,1) 0%, rgba(128,15,116,1) 35%, rgba(33,1,30,1) 100%);
  position: absolute;
  overflow: hidden; // Add this to contain the ripples within the footer

  .icons-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 60rem;
    padding: 50px;
    position: relative; 
  }

  img {
    height: 50px;
  }

  .author p {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-family: 'Bungee Hairline'; 
    font-weight: 700;
  }
  .ink {
  border-radius: 100%;
  border: 5px solid rgba(228, 167, 204, 0.1); 
  background: transparent;
  transform: scale(0);
  animation: ripple 0.85s ease-out forwards;
}

@keyframes ripple {
  0% {
    opacity: 0.6;
    transform: scale(0);
  }
  100% {
    opacity: 0;
    transform: scale(2);
  }
}

  @media screen and (max-width: 768px) {
    .icons-container {
      gap: 30rem;
      position: relative; 
    }
  }

  @media screen and (max-width: 480px) {
    .icons-container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 14rem;
      position: relative; 

      img {
        height: 40px;
      }
    }
  }
`;
