import { Connection, PublicKey, clusterApiUrl,LAMPORTS_PER_SOL  } from '@solana/web3.js';
import { Program, AnchorProvider, web3, utils } from '@project-serum/anchor';
import { useEffect,useState } from 'react';
import {Buffer} from 'buffer'
import { programs } from "@metaplex/js"
import * as metadata from "@metaplex-foundation/mpl-token-metadata";
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import idl from '../idl.json'
import { Donate } from './donate';

window.Buffer = Buffer
const {SystemProgram,Keypair} = web3;

const network = clusterApiUrl("devnet")
const opts = {
  preflightCommitment:"processed",
}
const patreonNewkeyPair = Keypair.generate();
const connection = new Connection(network, opts.preflightCommitment);

// const mediaNFT = web3.Keypair.fromSecretKey(secret)
const programID = new PublicKey(idl?.metadata?.address)

export const Body = ({walletAddress}) => {

    const { solana } = window;
    const [link,setLink] = useState('') 
    const [mintAddress, setMintAddress] = useState([])
     const getProvider = () => {
      //Creating a provider, the provider is authenication connection to solana
      const connection = new Connection(network, opts.preflightCommitment);
      const provider = new AnchorProvider(
        connection,
        window.solana,
        opts.preflightCommitment
      );
      return provider;
    };
    
    useEffect(()=>{
      // getAccountInfo()
      // getTransactions()
    },[])

    const getBalanace=async ()=>{
        try{
            let provider = window.solana;
            let connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
            // After Connecting
           
            const walletBalance  = await connection.getBalance(provider.publicKey)
            console.log(
                `Wallet balance is ${(walletBalance) / LAMPORTS_PER_SOL} SOL`
              );
        }catch(err){
            console.error(err)
        }
    }

    const getAccountInfo = async () => {
      try {
        let provider = window.solana;
        let connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        // console.log("publickey", provider.publicKey.toString());
        const nftsmetadata = await metadata.Metadata.findDataByOwner(
          connection,
          provider.publicKey
        );
        if (nftsmetadata.length > 0) {
          let mintAddressData = [];
          for (let i in nftsmetadata) {
            mintAddressData.push(nftsmetadata[i].mint);
          }
          // console.log(mintAddressData)
          setMintAddress(mintAddressData)
        }
      } catch (err) {
        console.error(err);
      }
    };

    // const getTransactions = async() =>{
    //   try{
    //     let provider = window.solana;
    //     let connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    //     // console.log("publickey", provider.publicKey.toString());
    //     const transSignatures = await connection.getSignaturesForAddress(provider.publicKey);
    //     // console.log('transaction signatures',transSignatures)
    //     const transactions = [];
    //     for (let i = 0; i < transSignatures.length; i++) {
    //       const signature = transSignatures[i].signature;
    //       const time  = new Date(transSignatures[i].blockTime*1000)
    //       const confirmedTransaction = await connection.getTransaction(
    //         signature,
    //       );
    //       if (confirmedTransaction) {
    //         const { meta } = confirmedTransaction;
    //         const {transaction} = confirmedTransaction;
    //         // console.log('trasaction',transaction)
    //         if (meta) {
    //           const oldBalance = meta.preBalances;
    //           const newBalance = meta.postBalances;
    //           const wallet1 = transaction.message.accountKeys[0].toString()
    //           const wallet2 = transaction.message.accountKeys[1].toString()
    //           const amount = oldBalance[0] - newBalance[0];
    //           const transWithSignature = {
    //             signature,
    //             time,
    //             wallet1,
    //             wallet2,
    //             // ...confirmedTransaction,
    //             fees: meta?.fee,
    //             amount,
    //           };
    //           // console.log('transWithSignature',transWithSignature.transaction.message.accountKeys[0].toString(),transWithSignature.transaction.message.accountKeys[1].toString(),transWithSignature.transaction.message.accountKeys[2].toString())
             
    //           transactions.push(transWithSignature);
    //         }
    //       }
    //     }
    //     console.log('overall transaction information',transactions);
    //   }catch(err){
    //     console.log(err)
    //   }
    // }


    const getNFTParsedAccounts = async() =>{
      try {
        let provider = window.solana;
        let connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const filters = [
          {
            dataSize: 165,
          },
          {
            memcmp: {
              offset: 32, // number of bytes
              bytes: "H4rQnPaffjZaU8J1jZ781YB7XejN4L1MCPCX7G2qNLWM", //wallet address
            },
          },
        ]
        //provider.publicKey
        const tokenAccounts = await connection.getParsedProgramAccounts(TOKEN_PROGRAM_ID,{filters});
        tokenAccounts.forEach((account,i)=>{
          const parsedAccountInfo = account.account.data
          const address = parsedAccountInfo
          console.log(parsedAccountInfo)
        })
       
        
      }catch(err){
        console.log('err',err)
      }
    }



  return (
    <div>
      <h4> Your walletAddress - {walletAddress} </h4>
      <br />
     
      <Donate getProvider={getProvider} Program={Program} idl={idl} programID={programID} patreonNewkeyPair={patreonNewkeyPair} walletAddress={walletAddress} SystemProgram={SystemProgram}  />

      {mintAddress &&
        mintAddress.map(
          (address, index) =>
            address === "8yP77L6mnW3r7fbegeiwR5fps2vuF3xKVZTfwbL31otD" && (
              <div key={index}>
                <img src="https://i.pinimg.com/originals/13/01/7f/13017f759d2961d07a03190ef28286e7.jpg" />
                <br />
                {/* <iframe width="750" height="750" src="https://www.youtube.com/embed/nqye02H_H6I?controls=0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
                </div>
            )
        )}
    </div>
  );
};
