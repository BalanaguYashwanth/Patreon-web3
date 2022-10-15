import React from 'react'
import ReactXnft, { Stack, Tab, Text, View } from "react-xnft";
import { GariStaking } from '../Home/GariStaking';
import { Pandas } from '../Home/Pandas';

ReactXnft.events.on("connect", () => {})

export const Home = () => {
    return (
      <View style={{ color:'green'}} >
        <Text> HOME </Text>
        <Stack.Navigator
            initialRoute={{name:'pandas'}}
            options={({ route }) => {
              switch (route.name) {
                case "pandas":
                  return {
                    title: "Pandas",
                  };
                case "gariStaking":
                  return {
                    title: "gariStaking",
                  };
                default:
                  throw new Error("unknown route");
              }
            }}
            style={{}}
          >
              <Stack.Screen name="pandas" component={(props: any) => <Pandas {...props}  />}/>
              <Stack.Screen name="gariStaking" component={(props:any) => <GariStaking {...props} />}/>
          </Stack.Navigator>
      </View>
    );
  };