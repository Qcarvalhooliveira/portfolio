import styled from "styled-components";

export const HeaderContainer = styled.header`

display: flex;
align-items: flex-start;
justify-content: space-between;
padding: 4rem;
height:100vh;
font-family: 'Bungee';

background: no-repeat;
background-size: cover;
  

:first-child{
    display:flex;
    align-items: center;
    justify-content:center;
    img {
        height: 4rem;
        width: 4rem;
    }

 
}
.navigation{
       display: flex;
       align-items: center;
       justify-content:space-between;
       gap: 1rem;       

      a {
      background: transparent;
      border: none;
      text-decoration: none;
      text-align: center;
      padding: 0.5rem 1rem;
      color: #fff;
      width: 130px;
      height: 35px;
      border-radius: 22px;
      font-weight: 600;
      font-size: 14px;
      box-shadow: 3px 3px 10px 3px rgba(0.25,0.25,0.25,0.25);
      padding: 0.5rem 1rem;
      font-family: 'Bungee', sans-serif;
    
      cursor: pointer;
      transition:0.3s;
      &:hover {
         
         background:transparent;
         color: #800F74;
       
       }
   
    }
    }

  .resume {
    display: flex;
    align-items:center;
    justify-content:center;
    cursor: pointer;
   

    max-width: 130px;
    height: 35px;
    border-radius: 22px;
    background-color: #cb6ce6;
    color: #fff;
    border: none;
    font-family: 'Source Sans Pro', sans-serif; 
    font-weight: 600;
    font-size: 14px;
    box-shadow: 3px 3px 10px 3px rgba(0.25,0.25,0.25,0.25);
    padding: 0.5rem 1rem;
    font-family: 'Bungee', sans-serif;
    transition: 0.3s;

    a{
      color: #fff;
      text-decoration: none;
    }

      &:hover {
         
        background: #800F74;
      }

}

.side-links {
    
    position: fixed;
    left: 10px; 
    top: 42%; 
    display: flex;
    flex-direction: column;
    gap: 15px; 

    a {
      color: #fff; 
      text-decoration: none; 

    a:hover {
      color: #cb6ce6; 
    }
  }
}

.intro {
    position: absolute;
    left: 120px; 
    top: 35%;
    display: flex;
    flex-direction: column;
    color: #fff;
    font-size: 24px; 
    font-weight: 600;
    max-width: 450px; 
    max-height: 200px; 

    span {
      font-family: 'Bungee Hairline', sans-serif;
      color: #fff;
      font-weight: 600;
      font-size: 24px

    }
      
}

.scroll-down-btn {
  position: absolute; 
  background: none; 
  border: none; 
  cursor: pointer; 
  left: 170px; 
  top: 80%;
  display: flex;
  flex-direction: column;
 
  img{
    max-width: 5rem;
    height: 5rem;
  }

}

.scroll-up-btn {
  position: absolute; 
  background: none; 
  border: none; 
  cursor: pointer; 
  right: 70px;
  top: 53%;
  display: flex;
  flex-direction: column;
 
  img{
    max-width: 5rem;
    height: 5rem;
  }

}

.menu-icon {
    display: none;
    font-size: 30px;
    cursor: pointer;
  }

  .mobile-menu {
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    width: 200px;
    height: 100vh;
    background-color: #fff;
    box-shadow: -2px 0px 5px rgba(0,0,0,0.5);
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 10px;
  }


@media screen and (max-width: 768px) {

  background-size: auto 100%;
  background-position: 38%;

  .scroll-down-btn {
    left: 600px; 
    top: 85%;
  }

  .scroll-up-btn {
    left: 675px;
  }
}

@media screen and (max-width: 480px) {
  background-size: auto 100%;
  background-position: 50%;

  .side-links {
    display: none;
  }

  .scroll-down-btn {
    display: none;
  }

  .scroll-up-btn {
    display: none;
  }

  .navigation {
    display: none;
  }

  .resume {
    display: none;
  }


  .intro {
    position: absolute;
    left: 0;
    top: 30%;
    width: 100%; 
    padding: 15px;
    max-height: 200px; 
    display: flex;
    flex-direction: column;
    color: #fff;
    font-size: 24px; 
    font-weight: 600;
    

    span {
      font-family: 'Bungee Hairline', sans-serif;
      color: #fff;
      font-weight: 600;
      font-size: 24px

    }
  }
    .menu-icon {
      display: block;
      position: absolute;
      right: 20px;
      top: 20px;
      color: #fff;
    }

  .mobile-menu {
    display: flex;
    position: fixed;
    flex-direction: column;
    padding: 20px;
    gap: 10px;

    a {
      text-decoration: none;
      color: #800F74;

    }

  .close-icon {
    margin-left: auto;
    cursor: pointer;
    font-size: 24px;
    padding: 5px;
    width: 30px;
    height: 30px;
    color: #800F74;
    border: 1px solid #800F74;
    border-radius: 100%;
    background-color: #dfb3eb;
  }
}
}
`;