import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import CadastroPeriodo from './pages/cadPeriodo/cadPeriodo.js';
import CadastroCursos from './pages/cadCurso/cadCurso.js'
import Menu from './pages/menu/menu.js'

const router = createBrowserRouter([
  {path:"/", element:<Menu />},
  {path:'/curso',element:<CadastroCursos/>},
  {path:'/periodo', element:<CadastroPeriodo/>}
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router}/>
    {
      /*
        <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Menu />}>
                        <Route  path="CadCursos" element={<CadastroCursos />}/>
                    </Route>
                </Routes>
      </BrowserRouter>
      */
    }
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
