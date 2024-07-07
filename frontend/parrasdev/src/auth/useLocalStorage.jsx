
import {useState} from 'react'

export const useLocalStorage=(keyname,defualtValue)=>{
    const [storedValue,setStoredValue]=useState(()=>{
        try {
            const value=window.localStorage.getItem(keyname);

            if(value){
                return JSON.parse(value)
            }else{
                window.localStorage.setItem(keyname,JSON.stringify(defualtValue))
                return defualtValue
            }

        } catch (error) {
            return defualtValue
        }
    });

    const setvalue=(newValue)=>{
        try {
            window.localStorage.setItem(keyname,JSON.stringify(newValue))
        } catch (err) {}
        setStoredValue(newValue)
    }


    return [storedValue,setvalue]
}
