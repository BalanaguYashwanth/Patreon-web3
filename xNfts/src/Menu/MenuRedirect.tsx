import React from 'react'
import ReactXnft, { Button, Tab, Text, useNavigation, View } from "react-xnft";
import { MenuList } from './MenuLists';
import { Pandas } from './Pandas';


export const MenuRedirect = () =>{
    const nav = useNavigation()
    // nav.pop()
    nav.push('menuList')
    // return(
    //     <Pandas />
    // )
}