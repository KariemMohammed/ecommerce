import { createContext, useState } from "react";

 export let CounterContext = createContext(0);
  export default function CounterContextProvider(props){
    const [counter1 , setCounter]=useState(0)
    const [UserName , setUserName]=useState('Kareem')
    function changeCounter(){
        setCounter(Math.random)
    }
    return <CounterContext.Provider value={{counter1,UserName,changeCounter}}>
        {props.children}

    </CounterContext.Provider>
  }
  
