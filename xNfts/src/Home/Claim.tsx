import React from 'react'
import ReactXnft, { Button, Tab, Text, useNavigation, View } from "react-xnft";

export const Claim = () => {
  return (
    <View style={{ textAlign: "center", color: "white", alignItems: "center" }}>
      <Text style={{ textAlign: "center", color: "white" }}>
        Claim My Earnings
      </Text>
      <View style={{margin:'10%'}}>
        <Text> Panda Rewards - 0.2 </Text>
        <Button style={{margin:'1%'}}> Claim </Button>
      </View>

      <View style={{margin:'10%'}}>
        <Text> Gari Yeild Staking Rewards - 0.2 </Text>
        <Button style={{margin:'1%'}}> Claim </Button>
      </View>

      {/* <Component1 /> */}
    </View>
  );
};
