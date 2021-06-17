import styled from "styled-components";
import Greeting from "Components/Greeting";

const Bg = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f7b89e;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
`;


const Home =  () => {
  return(
    <>
      <Bg />
      <Container>
        <Greeting />
      </Container>
    </>  
  );
}

export default Home;

