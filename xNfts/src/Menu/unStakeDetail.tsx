import React, { useState } from 'react'
import ReactXnft, { Button, Tab, Text, TextField, useNavigation, View } from "react-xnft";
import { useFetch } from '../../data/useFetch';

export const UnStakeDetail = () => {
  const { dust } = useFetch();
  const [maxFlag, setMaxFlag] = useState(false)
  const nav = useNavigation()
  return (
    <View
    style={{
        textAlign: "center",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      
      <View 
        style={{
            display: "flex",
            justifyContent: "space-around",
          }}
      >
        <TextField placeholder="Enter amount to unstake" value={maxFlag ? dust : '' } style={{ margin:'10px'}}/>
        <Button onClick={()=>setMaxFlag(!maxFlag)}>MAX </Button>
      </View>
      <Button onClick={()=>nav.pop()}> UnStake Now</Button>
    </View>
  );
};