import {useState, useEffect} from "react";
import axios from "axios";
import styled from "styled-components";
import Greeting from "Components/Greeting";

const Bg = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${props => props.url ? props.url : ""});
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  p{
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    font-size: .8rem;
    color: #ebebeb;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
`;


const Home =  () => {

  const [bgImg, setBgImg] = useState("");
    
  const getUnsplash = async () => {
    try {
      const {data: {results}} = await axios.get('https://api.unsplash.com/search/photos/?page=1&query=nature_background_1920_1080&client_id=tkiwMlXWnMrC1jPXEXw3XZr81WUcGPCbZNXT7KKxrLE');
      const ramdomNum = Math.round(Math.random() * 9);
      const ranImg = results[ramdomNum]
      setBgImg(ranImg);
    }catch (error) {
      console.error(error);
    }
  }

  useEffect(()=>{
    getUnsplash();
  }, [])
  
  return(
    <>
      <Bg url={!bgImg ? "" : bgImg.urls.full ? bgImg.urls.full : ""}><p>{!bgImg ? "" : bgImg.description ? bgImg.description : ""}</p></Bg>
      <Container>
        <Greeting />
      </Container>
    </>  
  );
}

export default Home;

