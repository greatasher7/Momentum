import {useState} from "react";
import styled from "styled-components";
import Moment from 'react-moment';

const Container = styled.section`
    grid-column: 2/3;
    grid-row: 2/3;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Time = styled.div`
    font-size: 7rem;
    margin-bottom: 2rem;
`;

const GreetMessage = styled.p`
    font-size: 1.5rem;
`




const Greeting = () => {

    const [ranNum, setRanNum] = useState("")

    return(
        <Container>
            <Time><Moment interval={1000} format="hh:mm" /></Time>
            <GreetMessage>Good to see you, Buddy</GreetMessage>
        </Container>
    );
}

export default Greeting;