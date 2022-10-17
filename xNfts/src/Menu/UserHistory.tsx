import React from 'react'
import ReactXnft, { Button, Text, View } from "react-xnft";

export const UserHistory = () => {
  return (
    <View
      style={{
        textAlign: "center",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <View>
        <Button style={{margin:'10px'}}> Gari </Button>
        
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItem: "center",
            justifyContent: "space-between",
            margin : '0 auto', 
            gap: '25px',
          }}
        >
          <View>
            <Text> Amount of stake </Text>
            <Text> 0 </Text>
            <Button> View TX </Button>
          </View>
          <View>
            <Text> Amount of unStake </Text>
            <Text> 0 </Text>
            <Button> View TX </Button>
          </View>
          <View>
            <Text> Rewards Claimed </Text>
            <Text> 0 </Text>
            <Button> View TX </Button>
          </View>
        </View>
      </View>
      <View>
        <Button style={{margin:'10px'}}> Panda </Button>
       
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItem: "center",
            justifyContent: "space-between",
            margin : '0 auto', 
            gap: '25px',
          }}
        >
          <View>
            <Text> Time of stake </Text>
            <Text> 0 </Text>
            <Button> View TX </Button>
          </View>
          <View>
            <Text> Time of unStake </Text>
            <Text> 0 </Text>
            <Button> View TX </Button>
          </View>
          <View>
            <Text> Time of claim </Text>
            <Text> 0 </Text>
            <Button> View TX </Button>
          </View>
        </View>
      </View>
    </View>
  );
};