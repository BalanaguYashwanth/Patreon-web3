import React, { useState } from 'react'
import ReactXnft, { Button, Tab, Text, TextField, useNavigation, View } from "react-xnft";
import { useFetch } from '../../data/useFetch';


export const StakeDetail = () => {
  const { dust } = useFetch();
  const [maxFlag, setMaxFlag] = useState(false)
  const nav = useNavigation()
  return (
    <View
    style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      
      <View 
        style={{
            display: "flex",
            justifyContent: "space-around",
          }}
      >
        {/* <Text> {dust} </Text> */}
        <TextField placeholder="Enter amount to stake" value={maxFlag ? dust : '' } style={{ margin:'10px'}} />
        <Button onClick={()=>setMaxFlag(!maxFlag)}>MAX </Button>
      </View>
      <View  
      style={{
        textAlign: "center",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
      >
        <Text>
          Min Staking Amount
          <TextField />
        </Text>
        <Text>
          Unlock Date
          <TextField />
        </Text>
        <Text>
          App
          <TextField />
        </Text>
      </View>

      <Button onClick={()=>nav.pop()}> Stake Now</Button>
    </View>
  );
};