import MainPage from "../pages/MainPage/MainPage";
import AuthPage from "../pages/AuthPage/AuthPage";

export const privateRoutes = [
    {path:'/', component:MainPage, exact:true},
]

export const publicRoutes = [
    {path:'/login', component:AuthPage, exact:true},
]