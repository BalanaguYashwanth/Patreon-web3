import React from 'react'
import ReactXnft, { Button, Stack, Tab, Text, useNavigation, View } from "react-xnft";
import '../../utils/style.css'


export const MenuList = () => {
  const nav = useNavigation()
  const arr=[{name:'Pandas',clickFn:'pandas'},{name:'Gari staking',clickFn:'gariStaking'},{name:'User History',clickFn:'userHistory'},{name:'Play games',clickFn:'playGames'},{name:'Faqs',clickFn:'faq'}]

    return (
      <View style={{display:'flex', justifyContent:'space-around',textAlign:'center', alignItems:'center',flexDirection:'column', margin:'auto'}}>

        { arr.map( (value, index) => (
          <Button 
          onClick={()=>(nav.push(value.clickFn))}
          style={{ flex: 1,
            width:200,
            backgroundColor:'#DCDCDC',
            color: 'black',
            hover:'black',
            fontWeight: 1000,
            margin:'8%'
          }}> {value.name} </Button>
        ))}
      </View>
    );
  };