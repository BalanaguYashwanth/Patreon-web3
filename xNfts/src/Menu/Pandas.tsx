import React from 'react'
import ReactXnft, { Button, Image, Text, useNavigation, View } from "react-xnft";
import {useFetch} from '../../data/useFetch'
ReactXnft.events.on("connect", () => {
  // no-op
})

export const Pandas = () => {
  const datas = useFetch();
  const nav = useNavigation();

  return (
    <View>
      {/* {datas &&
        datas.walletDetails.map((data) => (
          <View>{data.type === "NFT" && <Image src={data.image} />}</View>
        ))} */}

      <View
        style={{
          marginRight: "20px",
          marginLeft: "20px",
          marginBottom: "38px",
        }}
      >
        <View
          style={{
            margin: "2px",
            marginTop: "8px",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          {datas.walletDetails.length > 0 && datas.walletDetails[0].name ? (
            datas.walletDetails.map(
              (data, index) =>
                data.type === "NFT" && (
                  <View>
                    <Button
                      key={index}
                      onClick={() => nav.push("pandasDetail", { data })}
                      style={{
                        padding: 0,
                        width: "157.5px",
                        height: "157.5px",
                        borderRadius: "6px",
                      }}
                    >
                      <Image
                        src={data.image}
                        style={{
                          borderRadius: "6px",
                          width: "157.5px",
                        }}
                      />
                    </Button>
                    <View
                      style={{
                        alignItems:'center',
                        textAlign:'center',
                        margin: "3px",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: "12px",
                          lineHeight: "19.08px",
                        }}
                      >
                        {data.name}
                      </Text>
                      <Button style={{margin:'2px'}}>
                          stake
                        </Button>
                    </View>
                  </View>
                )
            )
          ) : (
            <Text> loading.... </Text>
          )}
        </View>
      </View>
    </View>
  );
};



// {datas && datas.walletDetails.map((data) => (            
//   (
//     <View>
//       <Button
//         key={g.tokenMetaUriData.image}
//         onClick={() => clickGod(g)}
//         style={{
//           padding: 0,
//           width: "157.5px",
//           height: "157.5px",
//           borderRadius: "6px",
//         }}
//       >
//         <Image
//           src={g.tokenMetaUriData.image}
//           style={{
//             borderRadius: "6px",
//             width: "157.5px",
//           }}
//         />
//       </Button>
//     </View>
//   ))


{/* <View
style={{
  marginTop: "3px",
  display: "flex",
  justifyContent: "space-between",
}}
>
<Text
  style={{
    fontSize: "12px",
    lineHeight: "19.08px",
  }}
>
  {g.tokenMetaUriData.name.slice("DeGod ".length)}
</Text>
<View style={{ display: "flex" }}>
  <View
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      marginRight: "2px",
    }}
  >
    {g.isStaked ? <LockIcon /> : <UnlockIcon />}
  </View>
  <Text
    style={{
      fontSize: "12px",
      lineHeight: "19.08px",
    }}
  >
    {g.isStaked ? "Staked" : "Unstaked"}
  </Text>
</View>
</View> */}