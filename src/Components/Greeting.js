import {useState} from "react";
import styled from "styled-components";
import {connect} from "react-redux"
import Moment from 'react-moment';
import moment from 'moment';
import { addName, removeName } from "Store";

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
    font-size: 1.3rem;
    text-align: center;
    form{
        input{
            margin-top: .5rem;
            border: 0px;
            border-bottom: 1px solid #fff;
            background: none;
            margin-top: -1rem;
            padding: .5rem 1rem;
            font-size: 1.3rem;
            text-align: center;
            color: #fff;
            text-shadow: 0 0 .2rem #333;
            &::placeholder{
                color: #fff;
            }
            &:focus{
                outline: none;
                &::placeholder{
                    color: transparent;
                    text-shadow: none;
                }
            }
        }
    }
`;

const GreetMessage = styled.h1`
    font-size: 1.2rem;
    display: ${props => props.isUser ? "block" : "none"};
`

const Rename = styled.p`
    display: ${props => props.isUser ? "block" : "none"};
    margin-top: 1rem;
    opacity: .5;
    padding: .2rem 0;
    border-bottom: 2px solid #ccc;
    cursor: pointer;
`;

const Greeting = ({ userName, addName, removeName }) => {

    const [name, setName] = useState("");
    const nowHour = moment().format("HH");

    const onChange = (e) => {
        setName(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        addName(name);
        setName("");
    }

    const rename = () => {
        removeName();
    }

    return(
        <Container>
            <Time><Moment interval={1000} format="HH:mm" /></Time>
            <NameBox isUser={userName}><form onSubmit={onSubmit}><input type="text" value={name} placeholder="What's your name?" onChange={onChange} /></form></NameBox>
            <GreetMessage isUser={userName}>{
                nowHour >= 18 && nowHour < 22 ?
                "Good Evening" : nowHour >= 21 || nowHour < 6 ?
                "Good Night" : nowHour >= 6 && nowHour < 12 ?
                "Good Morning" : "Good Afternoon"
            }, {userName}</GreetMessage>
            <Rename isUser={userName} onClick={rename}>Rename</Rename>
        </Container>
    );
}

const mapStateToProps = (state) => {
    return {
        userName: state.Reducer.name,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addName : (text) => dispatch(addName(text)),
        removeName : () => dispatch(removeName())
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Greeting);