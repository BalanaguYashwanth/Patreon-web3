import React from 'react'
import ReactXnft, { Button, Tab, Text, TextField, useNavigation, View } from "react-xnft";
import {useFetch} from '../../data/useFetch'

export const GariStaking = () => {
  const { dust } = useFetch();
  const nav = useNavigation()
  return (
    <View style={{ color: "white", margin: "10px", textAlign: "center" }}>
      <Text style={{ margin: "20px" }}>Stake Gari Earn Yeild</Text>
      <View style={{ margin: "10px" }}>
        <Text> Gari Pool </Text>
        <View style={{ display: "flex", justifyContent: "space-around" }}>
          <Text>
            TVL
            <TextField />
          </Text>
          <Text>
            APP
            <TextField />
          </Text>
        </View>
      </View>
      <View  style={{ margin: "3%" }}>
        <Text> My Dust  {dust >0 ? <Text> {dust} </Text> : <Text> loading... </Text> } </Text>
        <Button style={{ margin: "10px" }} onClick={()=>nav.push('stakeDetail')} > STAKE </Button>
      </View>
      <View  style={{ margin: "3%" }}>
        <Text> My Gari Staked</Text>
        <Text> 0 </Text>
      </View>
      <View  style={{ margin: "3%" }}>
        <Text> My Rewards</Text>
        <Text> 0 </Text>
      </View>
      <View  style={{ margin: "3%" }}>
        <Text> Ready to Unstake </Text>
        <Button style={{ margin: "3%" }}  onClick={()=>nav.push('unStakedDetail')}> UNSTAKE </Button>
      </View>
    </View>
  );
};