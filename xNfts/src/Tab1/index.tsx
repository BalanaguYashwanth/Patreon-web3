import React from "react"
import ReactXnft, { Stack } from "react-xnft"
import { Stack1 } from "./Stack1"
import { Stack2 } from "./Stack2"
import { Stack3 } from "./Stack3"

ReactXnft.events.on("connect", () => {})

export const Tab1 = () => {
  return (
    <Stack.Navigator
      initialRoute={{ name: "stack1" }}
      options={({ route }) => {
        switch (route.name) {
          case "stack1":
            return { title: "One" }
          case "stack2":
            return { title: "Two" }
          case "stack3":
            return { title: "Three" }
          default:
            throw new Error("unknown route")
        }
      }}
      style={{}}
    >
      <Stack.Screen
        name="stack1"
        component={(props: any) => <Stack1 {...props} />}
      />
      <Stack.Screen
        name="stack2"
        component={(props: any) => <Stack2 {...props} />}
      />
      <Stack.Screen
        name="stack3"
        component={(props: any) => <Stack3 {...props} />}
      />
    </Stack.Navigator>
  )
}