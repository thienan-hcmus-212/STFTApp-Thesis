import React, { createContext } from 'react'

const MainAppNavigationStackContext = createContext()

const MainAppNavigationStackProvider = (props) => {
    return(
        <MainAppNavigationStackContext.Provider value={{navigation: props.value}}>
            {props.children}
        </MainAppNavigationStackContext.Provider>
    )
}

export { MainAppNavigationStackProvider, MainAppNavigationStackContext }