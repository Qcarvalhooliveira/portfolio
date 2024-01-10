import styled from "styled-components";

export const HomepageContainer = styled.div`

.carousel {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
}

.carousel .list .item {
    position: absolute;
    inset: 0 0 0 0;
}

.carousel .list .item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.carousel .list .item .content {
    position: absolute;
    top: 20%;
    width: 1140px;
    max-width: 80%;
    left: 50%;
    transform: translateX(-50%);
    padding-right: 30%;
    box-sizing: border-box;
    color: #fff;
    text-shadow: 0 5px 10px #000400;
}

.carousel .list .item .content .title {
    font-weight: bold;
    letter-spacing: 10px;
}

.carousel .list .item .content .topic,
.carousel .list .item .content .tools {
    font-weight: bold;
    font-size: 1em;
    line-height: 1.3em;

}

/* thumbnail
----------------*/

.thumbnail {
    position: absolute;
    bottom: 50px;
    left: 50%;
    width: max-content;
    z-index: 100;
    display: flex;
    gap: 20px;
}

.thumbnail .item {
    width: 150px;
    height: 220px;
    flex-shrink: 0;
    position: relative;
}

.thumbnail .item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;

}

.thumbnail .item .content {
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
}

.thumbnail .item .content .title {
    font-weight: bold;
}

/* arrow 
-----------*/

.arrows {
    position: absolute;
    top: 80%;
    right: 52%;
    width: 300px;
    max-width: 30%;
    display: flex;
    gap: 10px;
    align-items: center;    
}

.arrows button {
    width: 40px;
    height: 40px;
    border-radius: 50%; 
    background-color: #eee4;
    border: none;
    font-family: monospace;
    color: #fff;
    font-weight: bold;
    font-size: large;
    transition: .5s;
    z-index: 100;
}

.arrows button:hover {
    background-color: #eee;
    color: #555;
}

.carousel .list .item:nth-child(1) {
    z-index: 1;
}

.carousel .list .item:nth-child(1) .title,
.carousel .list .item:nth-child(1) .topic,
.carousel .list .item:nth-child(1) .tools,
.carousel .list .item:nth-child(1) .description,
.carousel .list .item:nth-child(1) .buttom {
    transform: translateY(50px);
    filter: blur(20px);
    opacity: 0;
    animation: showContent 0.5s 1s linear 1 forwards;
}

@keyframes showContent {
    to {
        opacity: 1;
        filter: blur(0);
        transform: translateY(0);
    }
}

.carousel .list .item:nth-child(1) .topic {
    animation-delay: 1.2s;
}

.carousel .list .item:nth-child(1) .tools {
    animation-delay: 1.4s;
}

.carousel .list .item:nth-child(1) .description {
    animation-delay: 1.6s;
}

.carousel .list .item:nth-child(1) .buttom {
    animation-delay: 1.8s;
}

/* effect next click 
-------------------------*/

.carousel.next .list .item:nth-child(1) img {
    width: 150px;
    height: 220px;
    position: absolute;
    left: 50%;
    bottom: 50px;
    border-radius: 20px;
    animation: showImage 0.5s linear 1 forwards;
}

@keyframes showImage {
    to {
        width: 100%;
        height: 100%;
        left: 0;
        bottom: 0;
        border-radius: 0;
    }
}

.carousel.next .thumbnail .item:nth-last-child(1) {
    width: 0;
    overflow: hidden;
    animation: showThumbnail .5s linear 1 forwards;
}

@keyframes showThumbnail {
    to {
        width: 150px;
    }
}

.carousel.next .thumbnail {
    transform: translateX(150px);
    animation: transformThumbnail .5s linear 1 forwards;
}

@keyframes transformThumbnail {
    to{
        transform: translateX(0);
    }    
}

/* effect prev clic */
.carousel.prev .list .item:nth-child(2) {
    z-index: 2;

}
.carousel.prev .list .item:nth-child(2) img{
    position: absolute;
    bottom:0;
    left: 0;
    animation: outImage 0.5s linear 1 forwards;

}
@keyframes outImage{
    
}


`;