import React, {useState, useContext, useCallback, useEffect} from 'react';
import {AuthContext} from '../../context/AuthContext'
import './MainPage.scss'
import {TodoService} from "../../API/TodoService";

const MainPage = () => {
    const [text, setText] = useState('')
    const [todos, setTodos] = useState([])
    const {userId} = useContext(AuthContext)


    const getTodos = useCallback(() => {
        TodoService.getAllTodos(userId)
            .then(response => setTodos([...response.data]))
    }, [userId])

    const createTodo = useCallback( () => {
        TodoService.createTodo(text,userId)
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
            .then(()=>getTodos())
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
                        <div className="input-field col s12">
                            <input
                                value={text}
                                type="text"
                                name='input'
                                className='validate'
                                onChange={e => setText(e.target.value)}
                            />
                            <label htmlFor="input">Задача</label>
                        </div>
                    </div>
                    <div className="row">
                        <button
                            className='waves-effect waves-light btn blue'
                            onClick={createTodo}>
                            Добавить
                        </button>
                    </div>
                </form>
                <div className={'active-todos'}>
                    <h3>Активные задачи:</h3>
                    <button
                        className={'waves-effect waves-light btn blue'}
                        onClick={getTodos}>Обновить список задач
                    </button>
                </div>
                <div className="todos">
                    {todos.map((el, i) => {
                        let rootClass = ['row', 'flex', 'todos-item']
                        if (el.completed) {
                            rootClass.push('completed')
                        }
                        if (el.important) {
                            rootClass.push('important')
                        }
                        return (
                            <div className={rootClass.join(' ')} key={i}>
                                <div className="col todos-num">{i}</div>
                                <div className="col todos-text">{el.text}</div>
                                <div className="col todos-btns">
                                    <i onClick={() => toggleCompleted(el._id)}
                                       className="material-icons blue-text">check</i>
                                    <i onClick={() => toggleImportant(el._id)}
                                       className="material-icons orange-text">warning</i>
                                    <i onClick={() => removeTodo(el._id)} className="material-icons red-text">delete</i>
                                </div>
                            </div>)
                    })}
                </div>
            </div>
        </div>
    );
}

export default MainPage;
