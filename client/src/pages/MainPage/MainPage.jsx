import React, {useState, useContext, useCallback, useEffect} from 'react';
import {AuthContext} from '../../context/AuthContext'
import './MainPage.scss'
import {TodoService} from "../../API/TodoService";
import {TodoItem} from "../../components/TodoItem.jsx/TodoItem";

const MainPage = () => {
    const [text, setText] = useState('')
    const [todos, setTodos] = useState([])
    const {userId} = useContext(AuthContext)


    const getTodos = useCallback(() => {
        TodoService.getAllTodos(userId)
            .then(response => setTodos([...response.data]))
    }, [userId])

    const createTodo = useCallback(() => {
        TodoService.createTodo(text, userId)
            .then(() => {
                getTodos()
                setText('')
            })
    }, [text, userId, getTodos])

    const removeTodo = useCallback(async (id) => {
        TodoService.removeTodo(id)
            .then(() => getTodos())
    }, [getTodos])

    const toggleCompleted = useCallback(async (id) => {
        TodoService.toggleCompleted(id)
            .then(() => getTodos())
    }, [getTodos])

    const toggleImportant = useCallback(async (id) => {
        TodoService.toggleImportant(id)
            .then(() => getTodos())
    }, [getTodos])


    useEffect(() => {
        getTodos()
        // eslint-disable-next-line
    }, [userId]);

    return (
        <div className='container'>
            <div className="main-page">
                <h4>Добавить задачу</h4>
                <form className='form form-login' onSubmit={e => e.preventDefault()}>
                    <div className="row">
                        <div>
                            <div className="input-field col s12">
                                <input
                                    value={text}
                                    type="text"
                                    name='input'
                                    id={'input-addTodo'}
                                    className='validate'
                                    onChange={e => setText(e.target.value)}
                                />
                                <label htmlFor="input-addTodo">Задача</label>
                            </div>

                        </div>
                    </div>
                    <div className="row add">
                        <button
                            className='waves-effect waves-light btn blue '
                            onClick={createTodo}>
                            Добавить
                        </button>
                    </div>
                </form>
                <div className={'active-todos'}>
                    <h3>Активные задачи:</h3>
                    {/*<button*/}
                    {/*    className={'waves-effect waves-light btn blue'}*/}
                    {/*    onClick={getTodos}>Обновить список задач*/}
                    {/*</button>*/}
                </div>
                <div className="todos">
                    {todos.map((el, i) => <TodoItem
                        el={el}
                        key={el._id}
                        removeTodo={removeTodo}
                        toggleCompleted={toggleCompleted}
                        toggleImportant={toggleImportant}
                    />)}
                </div>
            </div>
        </div>
    );
}

export default MainPage;
