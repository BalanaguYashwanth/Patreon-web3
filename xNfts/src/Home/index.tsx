import React from 'react'
import ReactXnft, { Stack, Tab, Text, View } from "react-xnft";
import { Claim } from './Claim';
import { Lists } from './Lists';
import {Pandas} from '../Menu/Pandas'
import {HomeRedirect} from './HomeRedirect'

ReactXnft.events.on("connect", () => {})

export const Home = () => {
  return (
    <Stack.Navigator
      initialRoute={{ name: "list" }}
      options={({ route }) => {
        switch (route.name) {
          case "list":
            return {
              title: "My Lists",
            };
          case "claim":
            return {
              title: "claim",
            };
          case "menuList":
            return {
              title: "Pandas Home",
            };
          default:
            throw new Error("unknown route");
        }
      }}
      style={{}}
    >
      <Stack.Screen
        name="list"
        component={(props: any) => <Lists {...props} />}
      />
      <Stack.Screen
        name="claim"
        component={(props: any) => <Claim {...props} />}
      />
      <Stack.Screen
        name="menuList"
        component={(props: any) => <HomeRedirect {...props} />}
      />
    </Stack.Navigator>
  );
};