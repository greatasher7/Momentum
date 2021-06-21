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
    text-shadow: 0 0 .5rem #333;
`;

const Time = styled.div`
    font-size: 7rem;
    margin-top: -2rem;
    margin-bottom: 1.5rem;
`;

const NameBox = styled.h1`
    display: ${props => props.isUser ? "none" : "block"};
    font-size: 1.2rem;
    text-align: center;
    form{
        input{
            opacity: .6;
            margin-top: .5rem;
            border: 0px;
            border-bottom: 1px solid #fff;
            background: none;
            padding: .5rem 1rem;
            font-size: 1.2rem;
            width: 50%;
            text-align: center;
            color: #fff;
            text-shadow: 0 0 .5rem #333;
            &:focus{
                outline: none;
            }
        }
    }
`;

const GreetMessage = styled.h1`
    font-size: 1.2rem;
    display: ${props => props.isUser ? "block" : "none"};
`


const Greeting = ({userName, addName}) => {

    const [name, setName] = useState("");

    const onChange = (e) => {
        setName(e.target.value);
    }
    
    const onSubmit = (e) => {
        e.preventDefault();
        addName(name);
        setName("");
    }

    return(
        <Container>
            <Time><Moment interval={1000} format="HH:mm" /></Time>
            <NameBox isUser={userName}>What's your name?<form onSubmit={onSubmit}><input type="text" value={name} onChange={onChange} /></form></NameBox>
            <GreetMessage isUser={userName}>Good to see you, {userName}</GreetMessage>
        </Container>
    );
}

const mapStateToProps = (state) => {
    return {
        userName: state.nameReducer.name,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addName : (text) => dispatch(add(text))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Greeting);