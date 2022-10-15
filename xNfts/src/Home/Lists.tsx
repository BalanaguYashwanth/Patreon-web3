import React from 'react'
import ReactXnft, {  Button, Text, useNavigation, View  } from "react-xnft";
import { useFetch } from '../../data/useFetch';

ReactXnft.events.on("connect", () => {
  // no-op
});

export const Lists = () => {
  const { walletDetails, totalNfts } = useFetch();

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "space-around",
        textAlign: "center",
        flexDirection: "column",
        margin: "auto",
      }}
    >
      <View>
        {walletDetails.length > 0 && walletDetails[0].name ? (
          walletDetails.map((data, index) => (
            <View>
              {data.name === "DUST" && (
                <Text key={index} style={{ margin: "8%" }}>
                  Dust-{data.balance}{" "}
                </Text>
              )}
            </View>
          ))
        ) : (
          <Text> Loading... </Text>
        )}
      </View>

      <Text style={{ margin: "8%" }}>Dust Staked - 0 </Text>
      {totalNfts > 0 ? (
        <Text style={{ margin: "8%" }}>NFT(s) - {totalNfts} </Text>
      ) : (
        <Text> NFT(s) - loading... </Text>
      )}
      <Text style={{ margin: "8%" }}>NFT(s) Stacked - 0 </Text>
      <ClaimButton />
    </View>
  );
};


const ClaimButton = () =>{
    const nav = useNavigation()
    return(
        <Button style={{color:'yellow', alignSelf:'center'}} onClick={()=>nav.push('claim')} > Claim </Button>
    )
}