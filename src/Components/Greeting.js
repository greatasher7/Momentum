import {useState} from "react";
import styled from "styled-components";
import {connect} from "react-redux"
import Moment from 'react-moment';
import { add } from "Store";


const Container = styled.section`
    grid-column: 2/3;
    grid-row: 2/3;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Time = styled.div`
    font-size: 6rem;
    margin-top: -2rem;
    margin-bottom: 2rem;
`;

const NameBox = styled.div`
    font-size: 1.2rem;
    text-align: center;
    form{
        input{
            opacity: .6;
            margin-top: 1rem;
            border: 0px;
            border-bottom: 1px solid #ccc;
            background: none;
            padding: .5rem 1rem;
            color: #ebebeb;
            font-size: 1.2rem;
            width: 50%;
            text-align: center;
            &:focus{
                outline: none;
            }
        }
    }
`;

const GreetMessage = styled.p`
    font-size: 1.2rem;
    display: none;
`


const Greeting = ({state, addName}) => {

    const [name, setName] = useState("");

    const onChange = (e) => {
        setName(e.target.value);
    }
    
    const onSubmit = (e) => {
        e.preventDefault();
        addName(name);
        setName("");
        console.log(state);
    }

    return(
        <Container>
            <Time><Moment interval={1000} format="HH:mm" /></Time>
            <NameBox>What's your name?<form onSubmit={onSubmit}><input type="text" value={name} onChange={onChange} /></form></NameBox>
            <GreetMessage>Good to see you, Buddy</GreetMessage>
        </Container>
    );
}

const mapStateToProps = (state) => {
    return {
        name: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addName : (text) => dispatch(add(text))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Greeting);