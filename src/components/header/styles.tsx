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
       

      button {
      background: transparent;
      border: none;
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
    top: 50%; 
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

@media screen and (max-width: 768px) {

  .HeaderContainer .backgroundImage {
    max-width: 768px;
    max-height:auto;
    background-position: 35% 80%;

  }

}
  

`;
