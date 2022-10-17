import React from 'react'
import ReactXnft, { Tab, Text, View } from "react-xnft";
import { THEME } from '../utils/themes';
import { DegodsIcon, GodsIcon } from "../utils/Icon";
import { Home } from './Home';
import {Tab1} from './Tab1'
import { MenuList } from './Menu/MenuLists';
import {Menu} from './Menu'

// On connection to the host environment, warm the cache.
//
ReactXnft.events.on("connect", () => {
  // no-op
});

export function App() {
  return (
    <View style={{ height: "100%", backgroundColor: "#111827" }}>
      <Tab.Navigator
        options={({ route }) => {
          return {
            tabBarIcon: ({ focused }) => {
              const color = focused ? "orange" : "yellow";
              if (route.name === "HOME") {
                return <Tab.Icon element={<DegodsIcon fill={color} />} />;
              }
              if (route.name === "MENU") {
                return <Tab.Icon element={<GodsIcon fill={color} />} />;
              }
              else {
                return <Tab.Icon element={<GodsIcon fill={color} />} />;
              }
            },
          };
        }}
      >
        <Tab.Screen name="HOME" component={Home} />
        <Tab.Screen name="MENU" component={Menu} />
      </Tab.Navigator>
    </View>
  );
}
