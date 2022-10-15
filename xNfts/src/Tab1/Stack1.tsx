import ReactXnft, { Image, Text, useNavigation, View, Button } from "react-xnft"
import React from "react"
//
// On connection to the host environment, warm the cache.
//
ReactXnft.events.on("connect", () => {
  // no-op
})

export function Stack1() {
  return (
    <View
      style={{
        textAlign: "center",
      }}
    >
      <Text>Stack 1111</Text>
      <Component1 />
      
      {/* <Component2 /> */}
    </View>
  )
}

function Component1() {
  const nav = useNavigation()
  const click = () => {
    nav.push("stack2")
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
        onClick={click}
      >
        Go to Stack 2
      </Button>
    </View>
  )
}

function Component2() {
  return (
    <View
      style={{
        textAlign: "center",
      }}
    >
      <Image
        style={{
          width: "25vh",
          height: "25vh",
          borderRadius: "25px",
          margin: "12px",
        }}
        src="https://arweave.net/8APPIUAigWaUpEt5jC10M1-dgNGaN9kbr1yNI1qv20U?ext=png"
      />
    </View>
  )
}