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
      <div className="list">
        <div className="item">
          <img src={afrohair} alt="afrohair"/>
          <div className="content">
            <div className="title">Projet AFROHAIR</div>
            <div className="topic">Project Portfolio Frontend et Backend</div>
            <div className="tools">
              Frontend - HTML - CSS - React - TypeScript<br />
              Backend - Node.js - Knex.js - SQlite
            </div>
            <div className="description">For my final evaluation, I was tasked with creating a website from scratch, utilizing all the knowledge I had acquired throughout the course. It was incredibly rewarding to develop a fully functional site dedicated to the sale of natural hair products. This project allowed me to showcase my skills in front-end and back-end development, translations, and payment integrations. Its success has inspired me to pursue further specialization in full-stack development to enhance my skills even more.
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
            <div className="description">For our end-of-second-trimester evaluation, we took on the task of cloning the AirBNB website. This project significantly enhanced our front-end and back-end development skills. It was a comprehensive learning experience, deepening our understanding of full-stack web development.
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
            <div className="description">As our second evaluation project in the first trimester, we faced the challenge of building a command interpreter from scratch. It was a demanding project that tested our abilities. Successfully completing it demonstrated our growing skills in handling complex programming tasks.
            </div>
            <div className="buttom">
              <button>Github</button>
            </div>
          </div>
        </div>
        <div className="item">
          <img src={printf} alt="printf"/>
          <div className="content">
            <div className="title">Project PRINTF</div>
            <div className="topic">Project d’Evaluation fin du 1° trimestre</div>
            <div className="tools">C</div>
            <div className="description">Our first project aimed to showcase the skills we acquired in the first trimester, focusing on variables, strings, and memory allocation in C. This project involved creating our version of the printf function, highlighting our foundational understanding of C programming.
            </div>
            <div className="buttom">
              <button>Github</button>
            </div>
          </div>
        </div>
      </div>
      <div className="About">
        <h1>About me</h1>
        <div>
          <p>Hello, I'm Queise Carvalho! A programming student at Holberton School, I'm currently pursuing a specialization in full-stack development. Seeking new challenges, I transitioned from the administrative field to the world of programming. I've been living in France since 2016, where I worked as a paralegal for four years. However, I decided to make a career shift into technology and I'm thoroughly enjoying the journey. Being multilingual in Portuguese, French, English  and Spanish greatly aids in my studies and I'm keen on continuously advancing in this field.</p>

          <p>During the first cycle at Holberton School, I have acquired skills in a wide range of technologies and programming languages. Here are some of the key tools and languages I've learned:</p>

          <img src="https://skillicons.dev/icons?i=c,js,typescript,python,html,css,bootstrap,react,nodejs,mysql,git,github,vscode,figma,linux" />

        </div>

      </div>
    </HomepageContainer>
  );
}