import React from 'react'
import ReactXnft, { Button, Tab, Text, useNavigation, View } from "react-xnft";
import {Home} from './index'

export const HomeRedirect = () =>{
    const nav = useNavigation()
    // nav.pop()
    nav.push('list')
    return(
        <Home />
    )
}