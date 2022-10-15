import ReactXnft, { Image, Text, useNavigation, View, Button } from "react-xnft"
import React from "react"
//
// On connection to the host environment, warm the cache.
//
ReactXnft.events.on("connect", () => {
  // no-op
})

export function Stack2() {
  return (
    <View
      style={{
        textAlign: "center",
      }}
    >
      <Text>Stack 2</Text>
      <Component1 />
    </View>
  )
}

function Component1() {
  const nav = useNavigation()
  const click = () => {
    nav.push("stack3")
  }

  return (
    <View
      style={{
        textAlign: "center",
      }}
    >
      <Button
        style={{
          textAlign: "center",
          color: "black",
          fontSize: "15px",
          fontWeight: 100,
          lineHeight: "150%",
          margin: "12px",
          width: "150px",
        }}
        onClick={() => click()}
      >
        Go to Stack 3
      </Button>
    </View>
  )
}