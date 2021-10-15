import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom'
import axios from 'axios'
import './AuthPage.scss'
import {AuthContext} from '../../context/AuthContext';

const AuthPage = () => {
    const history = useHistory()
    const {login} = useContext(AuthContext)
    const [form, setForm] = useState({
        email: '',
        password: ''
    });


    const changeFormHandler = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const registerHandler = async () => {
        try {
            await axios.post('/api/auth/registration', {...form}, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            history.push('/')
        } catch (e) {
            console.log(e)
        }
    }

    const loginHandler = async () => {
        try {
            await axios.post('/api/auth/login', {...form}, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => login(response.data.token, response.data.userId))
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <BrowserRouter>
            <Switch>
                <React.Fragment>
                    <div className="container">
                        <div className="auth-page">
                            <Route path='/login'>
                                <h3 className="auth-page__title">Авторизация</h3>
                                <form className='form form-login' onSubmit={e => e.preventDefault()}>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <div>
                                                <input
                                                    height={40}
                                                    type="email"
                                                    name='email'
                                                    className="validate"
                                                    onChange={changeFormHandler}
                                                />
                                            </div>
                                            <label htmlFor="email">email</label>
                                        </div>
                                        <div className="input-field col s12">
                                            <div>
                                                <input
                                                    type="password"
                                                    name='password'
                                                    className="validate"
                                                    onChange={changeFormHandler}
                                                />
                                            </div>
                                            <label htmlFor="password">password</label>
                                        </div>
                                    </div>
                                    <div className="row group-btn">
                                        <button className='waves-effect waves-light btn btn blue'
                                                onClick={loginHandler}>Войти
                                        </button>
                                        <Link to="/registration" className="btn-outline btn-reg">Нет аккаунта?</Link>
                                    </div>
                                </form>
                            </Route>


                            <Route path='/registration'>
                                <h3 className="auth-page__title">Регистрация</h3>
                                <form className='form form-login' onSubmit={e => e.preventDefault()}>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input
                                                type="email"
                                                name='email'
                                                className="validate"
                                                onChange={changeFormHandler}
                                            />
                                            <label htmlFor="email">email</label>
                                        </div>
                                        <div className="input-field col s12">
                                            <input
                                                type="password"
                                                name='password'
                                                className="validate"
                                                onChange={changeFormHandler}
                                            />
                                            <label htmlFor="password">password</label>
                                        </div>
                                    </div>
                                    <div className="row group-btn">
                                        <button onClick={registerHandler}
                                                className='waves-effect waves-light btn blue'>Регистрация
                                        </button>
                                        <Link to="/login" className="btn-outline btn-reg">Уже есть аккаунт?</Link>
                                    </div>
                                </form>
                            </Route>
                        </div>
                    </div>
                </React.Fragment>
            </Switch>
        </BrowserRouter>
    );
}

export default AuthPage;
