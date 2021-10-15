import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {privateRoutes, publicRoutes} from "./RoutePath";

export const useRoutes = (isLogin) => {
    return (
        isLogin
            ? <Switch>
                {privateRoutes.map(el => <Route key={el.path} component={el.component} exact={el.exact} path={el.path}/>)}
                <Redirect to='/'/>
            </Switch>
            : <Switch>
                {publicRoutes.map(el => <Route key={el.path} component={el.component} exact={el.exact} path={el.path}/>)}
                <Redirect to='/login'/>
            </Switch>
    )
}