import React from 'react'
import ReactXnft, { Button, Stack, Tab, Text, View } from "react-xnft";
import { Pandas } from './Pandas';
import { GariStaking } from './GariStaking';
import { MenuList } from './MenuLists';
import { PlayGames } from './PlayGames';
import { Faq } from './Faq';
import { UserHistory } from './UserHistory';
import { PandasDetail } from './pandasDetail';
import { StakeDetail } from './stakeDetail';
import { UnStakeDetail } from './unStakeDetail';
import { MenuRedirect } from './MenuRedirect';

ReactXnft.events.on("connect", () => {})

export const Menu = () => {
  return (
    <Stack.Navigator
      initialRoute={{ name: "list" }}
      options={({ route }) => {
        switch (route.name) {
          case "menuList":
            return {
              title: "Menu List",
            };
          case "pandas":
            return {
              title: "Panda NFTs",
            };
          case "pandasDetail":
            return{
              title:"Pandas Detail"
            }
          case "stakeDetail":
            return{
              title:"Stake Gari"
            }
          case "unStakedDetail":
            return{
              title:'UnStake Gari'
            }
          case "gariStaking":
            return {
              title: "Gari Staking",
            };
          case "userHistory":
            return {
              title: "User History",
            };
          case "playGames":
            return {
              title: "Play Games",
            };
          case "faq":
            return{
              title:'FAQs'
            }
          case 'list':
            return{
              title:'Menu Redirect'
            }
          default:
            throw new Error("unknown route");
        }
      }}
      style={{}}
    >
      <Stack.Screen
        name="menuList"
        component={(props: any) => <MenuList {...props} />}
      />
      <Stack.Screen
        name="pandas"
        component={(props: any) => <Pandas {...props} />}
      />
      <Stack.Screen
        name="pandasDetail"
        component={(props: any) => <PandasDetail {...props} />}
      />
      <Stack.Screen
        name="gariStaking"
        component={(props: any) => <GariStaking {...props} />}
      />
       <Stack.Screen
        name="userHistory"
        component={(props: any) => <UserHistory {...props} />}
      />
       <Stack.Screen
        name="playGames"
        component={(props: any) => <PlayGames {...props} />}
      />
       <Stack.Screen
        name="faq"
        component={(props: any) => <Faq {...props} />}
      />
      <Stack.Screen
        name="stakeDetail"
        component={(props: any) => <StakeDetail {...props} />}
      />
       <Stack.Screen
        name="unStakedDetail"
        component={(props: any) => <UnStakeDetail {...props} />}
      />
      <Stack.Screen
        name="list"
        component={(props: any) => <MenuRedirect {...props} />}
      />
    </Stack.Navigator>
  );
};