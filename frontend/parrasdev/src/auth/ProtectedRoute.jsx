import { Navigate,Link,useOutlet } from "react-router-dom";
import {useAuth} from './UseAuth';
//import Nav from "../pages/Nav";

export function  ProtectedRoute(){
    const {user,logout}=useAuth()
    const outlet=useOutlet();

    if(user){
        return (
            <div>
             <Nav></Nav>
             {outlet}
            </div>
        )
    }

    return <Navigate to="/"/>
}

export function ProtectedRoot(){
    const {user,logout}=useAuth()
    const outlet=useOutlet();
    
    if(user){
       return <Navigate to="/home"/> 
    }

    return (
        <div>
         {outlet}
        </div>
    )

}