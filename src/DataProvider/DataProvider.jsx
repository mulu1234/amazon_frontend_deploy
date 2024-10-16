import React, {createContext} from "react"
import { useReducer } from "react"
import { initialstate,reducer } from "../Utility/reducer"

export const DataContext = createContext()
export const DataProvider = ({children})=>{
    return (
        <DataContext.Provider value = {useReducer(reducer,initialstate)}>
            {children}
        </DataContext.Provider>
    )
}
