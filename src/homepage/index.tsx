/* eslint-disable react/no-unescaped-entities */
import { HomepageContainer } from "./styles";
import printf from "../assets/ printf.png";
import shell from "../assets/ Simple Shell.png";
import airbnb from "../assets/ Airbnb.png";
import afrohair from "../assets/Banner-afrohair.png";


export function Homepage(){
  return(
    < HomepageContainer>
      <h1>Projects</h1>
      <div className="carousel prev">
        <div className="list">
          <div className="item">
            <img src={printf} alt="printf"/>
            <div className="content">
              <div className="title">Project PRINTF</div>
              <div className="topic">Project d’Evaluation fin du 1° trimestre</div>
              <div className="tools">C</div>
              <div className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem reiciendis porro, velit facere, voluptatibus quos possimus sapiente, impedit explicabo earum maxime nihil voluptate voluptatum culpa mollitia nesciunt qui recusandae doloremque.
              </div>
              <div className="buttom">
                <button>Github</button>
              </div>
            </div>
          </div>
          <div className="item">
            <img src={shell} alt="shell"/>
            <div className="content">
              <div className="title">Project Simple Shell</div>
              <div className="topic">Project d’Evaluation fin du 1° trimestre</div>
              <div className="tools">C</div>
              <div className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem reiciendis porro, velit facere, voluptatibus quos possimus sapiente, impedit explicabo earum maxime nihil voluptate voluptatum culpa mollitia nesciunt qui recusandae doloremque.
              </div>
              <div className="buttom">
                <button>Github</button>
              </div>
            </div>
          </div>
          <div className="item">
            <img src={airbnb} alt="airbnb"/>
            <div className="content">
              <div className="title">Project AirBNB Clone</div>
              <div className="topic">Project d’Evaluation fin du 2° trimestre</div>
              <div className="tools">
                Pyhton - Flask - MySQL - JavaScript - HTML- CSS
              </div>
              <div className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem reiciendis porro, velit facere, voluptatibus quos possimus sapiente, impedit explicabo earum maxime nihil voluptate voluptatum culpa mollitia nesciunt qui recusandae doloremque.
              </div>
              <div className="buttom">
                <button>Github</button>
              </div>
            </div>
          </div>
          <div className="item">
            <img src={afrohair} alt="afrohair"/>
            <div className="content">
              <div className="title">Projet AFROHAIR</div>
              <div className="topic">Project Portfolio Frontend et Backend</div>
              <div className="tools">
                Frontend - HTML - CSS - React - TypeScript
                Backend - Node.js - Knex.js - SQlite
              </div>
              <div className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem reiciendis porro, velit facere, voluptatibus quos possimus sapiente, impedit explicabo earum maxime nihil voluptate voluptatum culpa mollitia nesciunt qui recusandae doloremque.
              </div>
              <div className="buttom">
                <button>Github</button>
              </div>
            </div>
          </div>
        </div>
        <div className="thumbnail">
          <div className="item">
            <img src={printf} alt="printf"/>
            <div className="content">
              <div className="title">
                Name Slider
              </div>
              <div className="description">
                descirption
              </div>
            </div>
          </div>
          <div className="item">
            <img src={shell} alt="shell"/>
            <div className="content">
              <div className="title">
                Name Slider
              </div>
              <div className="description">
                descirption
              </div>
            </div>
          </div>
          <div className="item">
            <img src={airbnb} alt="airbnb"/>
            <div className="content">
              <div className="title">
                Name Slider
              </div>
              <div className="description">
                descirption
              </div>
            </div>
          </div>
          <div className="item">
            <img src={afrohair} alt="afrohair"/>
            <div className="content">
              <div className="title">
                Name Slider
              </div>
              <div className="description">
                descirption
              </div>
            </div>
          </div>
        </div>
        <div className="arrows">
          <button id="prev">&lt;</button>
          <button id="next">&gt;</button>
        </div>
      </div>
    </HomepageContainer>
  );
}