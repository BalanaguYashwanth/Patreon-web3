import React, { useEffect, useState } from 'react'
import ReactXnft, { usePublicKey, useConnection, Image  } from "react-xnft";
import { PublicKey, Connection,clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import axios from 'axios'
import { CoinDetails } from '../utils/TokenNames';

const useFetch =  () => {
    const [walletDetails, setWalletDetails] = useState([{name:'',balance:0}]);
    const [dust, setDust] = useState(0)
    const [totalNfts, setTotalNfts] = useState(0)
    const publicKey = usePublicKey();
    const xNFTConnection = useConnection();
    const endPoint = xNFTConnection["_rpcEndpoint"];
    const connection = new Connection(endPoint, "confirmed");
    const Address = publicKey.toString();
    
    useEffect(()=>{
      setTimeout( allDatas(),1000)
       
    },[])

    async function allDatas(){
        const filters = [
            {
              dataSize: 165,
            },
            {
              memcmp: {
                offset: 32,
                bytes: Address,
              },
            },
          ];
      
          const accounts = await connection.getParsedProgramAccounts(
              TOKEN_PROGRAM_ID,
              { filters }
            );
          
      
          // console.log("accounts", accounts);
          let totalNftsNum = 0;
          let arrWalletDetails = [];
          for (let i in accounts) {
            let details = accounts[i].account?.data?.parsed?.info;
            if (parseInt(details.tokenAmount.decimals) > 0) {
              if(CoinDetails(details?.mint) === 'DUST'){
                setDust(details?.tokenAmount?.amount / LAMPORTS_PER_SOL)
              }
              arrWalletDetails.push({
                type: "TOKEN",
                name: CoinDetails(details?.mint),
                mintAddress: details?.mint,
                balance: details?.tokenAmount?.amount / LAMPORTS_PER_SOL,
              });
            } else {
              totalNftsNum = totalNftsNum + 1;
              const mintDustKey = new PublicKey(details?.mint);
              let tokenmetaPubkey = await Metadata.getPDA(mintDustKey);
              const tokenmeta = await Metadata.load(connection, tokenmetaPubkey);
              const nftData = await axios.get(tokenmeta?.data?.data?.uri);
              arrWalletDetails.push({
                type: "NFT",
                name: tokenmeta?.data?.data?.name,
                symbol: tokenmeta?.data?.data?.symbol,
                image: nftData?.data?.image,
                mintAddress: details?.mint,
                balance: details?.tokenAmount?.amount,
              });
            }
          }
          setTotalNfts(totalNftsNum)
          setWalletDetails(arrWalletDetails)
    }
   
    return {totalNfts, walletDetails,dust}
  };

export {useFetch}