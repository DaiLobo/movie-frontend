import {Routes, BrowserRouter, Route} from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/Home"
import Movie from "./pages/Movie";
import Session from "./pages/Session";

//Routes - tudo que for declarado ali é uma rota ou faz parte de uma ou é filho de uma rota
//BrowserRouter - é um sistema de rota que deve ser passado para o router. existe o hashrouter tbm
//                nele é dito como que a rota deve ser usada
//Route - Nele é descrito a rota. path é o caminho q usuario vai usar para abrir a rota.
//element é o componente que vai ser carregado nessa rota. 
//para o element tem que usar notação jsx, deve ser importado o componente não a função simplesmente


const Router = () => {
    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route element={<Home/>} index />
                <Route path="/movie" element={<Movie/>} />
                <Route path="/session" element={<Session/>} />
            </Route>
        </Routes>
    </BrowserRouter>
    );
};

export default Router;