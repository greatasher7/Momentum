import { useState } from 'react';
import { connect } from "react-redux";
import { addTodo, removeTodo } from "Store";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faThList } from '@fortawesome/free-solid-svg-icons'


const Container = styled.section`
    position: absolute;
    right: 0;
    top: 0;
    width: 30%;
    height: 100vh;
    background-color: rgba(0, 0, 0, .5);
    padding: 3rem;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    transition: transform 1s;
    transform: ${props => props.isVisible ? "translateX(0)" : "translateX(100%)"};
`;

const Tab = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 4rem;
    position: absolute;
    right: 100%;
    top: 2rem;
    background-color: rgba(224, 247, 64, .5);
    cursor: pointer;
    border-radius: 5px 0 0 5px;
`;

const Title = styled.h2`
    font-size: 2rem;
    margin-bottom: 2rem;
`;

const TodoForm = styled.form`
    input{
        background: none;
        border: none;
        border-bottom: 1px solid #fff;
        text-align: right;
        padding: .5rem 1rem;
        font-size: 1rem;
        color: #fff;
        &::placeholder{
            color: #fff;
            opacity: .5;
        }
        &:focus{
            outline: none;
            &::placeholder{
                color: transparent;
            }
        }
    }
`;

const TodoList = styled.ul`
    padding: 2rem 1rem;
    li{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-bottom: 1rem;
        font-size: .8rem;
        strong{
            cursor: pointer;
            font-size: 1rem;
            margin-left: .5rem;
        }
    }
`;
 
const Todos = ({todos, addTodo, removeTodo}) => {

    const [todo, setTodo] = useState("");
    const [isVisible, setVisible] = useState(false);

    const handleVisible = () => {
        isVisible ? setVisible(false) : setVisible(true);
    }

    const onChange = (e) => {
        setTodo(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        addTodo(todo);
        setTodo("");
    }

    const onRemove = (e) => {
        removeTodo(e.currentTarget.id);
    }

    return(
        <Container isVisible={isVisible}>
            <Tab onClick={handleVisible} ><FontAwesomeIcon icon={faThList} /></Tab>
            <Title>Todos</Title>
            <TodoForm onSubmit={onSubmit}><input type="text" placeholder="Write todos here" onChange={onChange} value={todo} /></TodoForm>
            <TodoList>{todos.map(todo => (
                <li key={todo.id}><span>{todo.text}</span><strong onClick={onRemove} id={todo.id}><FontAwesomeIcon icon={faTimes} /></strong></li>
            ))}</TodoList>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return{
        todos: state.Reducer.todos
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        addTodo: (text) => dispatch(addTodo(text)),
        removeTodo: (id) => dispatch(removeTodo(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Todos);