import './App.scss';

import Navbar from './components/Navbar/Navbar';
import { BrowserRouter } from 'react-router-dom'
import { useRoutes } from './routes/routes.js'
import { AuthContext } from './context/AuthContext'
import { useAuth } from './hooks/authHook';


function App() {
  const { login, logout, token, userId, isReady } = useAuth()
  const isLogin = !!token
  const routes = useRoutes(isLogin) 
  return (
    <div className="app">
      <AuthContext.Provider value={{login, logout, token, userId, isReady, isLogin}}>
        <BrowserRouter>
          <Navbar />
          {routes}
        </BrowserRouter>
      </AuthContext.Provider>

    </div>
  );
}

export default App;
