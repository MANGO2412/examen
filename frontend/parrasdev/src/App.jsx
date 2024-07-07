//importing  libraries 
import { useState } from 'react';
import {ProtectedRoute,ProtectedRoot} from './auth/ProtectedRoute';
import {AuthLayout} from './auth/AuthLayout';
import {Route,createBrowserRouter,createRoutesFromElements} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import './App.css';
import TaskList from './pages/TaskList';



//view error
function ErrorBoundary(){
  return <div>error</div>
}

export const Rutas=createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthLayout/>} >
       <Route element={<ProtectedRoot/>}>
        <Route path='/' element={<Login/>}/> 
        <Route path='/TaskList' element={<TaskList/>}/>
       </Route>
        
        {/* <Route path='/' element={<ProtectedRoute/>}>
             <Route path='TaskList' element={<TaskList/>}/>
             <Route path='game' element={<Game/>}/>
             <Route path='glossary' element={<Glossary/>}/>
             <Route path='perfil' element={<Perfil/>}/>
        </Route> */}
        {/* handler error 404 routes */}
        <Route path='/*' element={<ErrorBoundary/>}/>
    </Route>
  )
);