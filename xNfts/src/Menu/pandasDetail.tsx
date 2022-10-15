import React from 'react'
import ReactXnft, { Button, Image, Text, View } from "react-xnft";
import {THEME} from '../../utils/themes'
export const PandasDetail = ({data}) => {
   
  return (
    <View>
      <View
        style={{
          marginRight: "20px",
          marginLeft: "20px",
        }}
      >
        <Image
          style={{
            marginBottom: "24px",
            display: "block",
            borderRadius: "6px",
            width: "335px",
            height: "335px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          src={data.image}
        />
        <Text
          style={{
            textAlign:'center',
            color: THEME.colors.text,
            marginBottom: "10px",
          }}
        >
          {data.name}
        </Text>
        <Button
          style={{
            height: "48px",
            width: "335px",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "24px",
            marginBottom: "24px",
            backgroundColor: THEME.colors.stake,
			color: THEME.colors.text,
          }}
        >
          Stake
        </Button>
      </View>
    </View>
  );
};