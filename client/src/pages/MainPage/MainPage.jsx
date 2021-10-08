import React, { useState, useContext, useCallback, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import './MainPage.scss'

const MainPage = () => {
    const [text, setText] = useState('')
    const { userId } = useContext(AuthContext)
    const [todos, setTodos] = useState([])

    const getTodos = useCallback(async () => {
        try {
            await axios.get('/api/todo', {
                headers: {
                    "Content-Type": "application/json"
                },
                params: { userId }
            })
                .then(response => setTodos(response.data))
        } catch (e) {
            console.log(e)
        }
    }, [userId])

    const createTodo = useCallback(async () => {
        if (!text) return
        try {
            await axios.post('/api/todo/add', {text, userId}, {
                headers: { "Content-Type": "application/json" 
                }
            }).then(response => {
                setTodos([...todos], response.data)
                getTodos()
                setText(' ')
            })
        } catch (e) {
            console.log(e)
        }
    }, [text, userId, todos, getTodos])

    const removeTodo = useCallback(async(id)=>{
        try{
            await axios.delete(`/api/todo/delete/${id}`,{id}, {headers:{"Content-Type":"application/json"}})
            .then(()=>getTodos())
        }catch(e){
            console.log(e)
        }
    },[getTodos])

    const toggleCompleted = useCallback(async(id)=>{
        try{
            await axios.put(`/api/todo/completed/${id}`,{id},{headers:{"Content-Type":"application/json"}})
                .then(response=>{
                    setTodos([...todos],response.data)
                    getTodos()
                })
        }catch(e){
            console.log(e)
        }
    },[getTodos,todos])

    const toggleImportant = useCallback(async(id)=>{
        try{
            await axios.put(`/api/todo/important/${id}`,{id},{headers:{"Content-Type":"application/json"}})
                .then(response=>{
                    setTodos([...todos],response.data)
                    getTodos()
                })
        }catch(e){
            console.log(e)
        }
    },[getTodos,todos])

    useEffect(() =>{
        getTodos()
    }, [getTodos]);

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
                            className='waves-effect waves-light btn blue' onClick={createTodo}>
                            Добавить
                        </button>
                    </div>
                </form>

                <h3>Активные задачи:</h3>
                <div className="todos">
                    {todos.map((el, i) => {
                        let rootClass = ['row','flex','todos-item']
                        if(el.completed){
                            rootClass.push('completed')
                        }
                        if(el.important){
                            rootClass.push('important')
                        }
                        return ( 
                            <div className={rootClass.join(' ')} key={i}>
                                <div className="col todos-num">{i}</div>
                                <div className="col todos-text">{el.text}</div>
                                <div className="col todos-btns">
                                    <i onClick={()=>toggleCompleted(el._id)} className="material-icons blue-text">check</i>
                                    <i onClick={()=>toggleImportant(el._id)} className="material-icons orange-text">warning</i>
                                    <i onClick={()=>removeTodo(el._id)} className="material-icons red-text">delete</i>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default MainPage;
