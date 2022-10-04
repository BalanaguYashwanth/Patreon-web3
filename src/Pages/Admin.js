import { Connection, PublicKey, clusterApiUrl,LAMPORTS_PER_SOL  } from '@solana/web3.js';
import { AnchorProvider, web3,Program,BN } from '@project-serum/anchor';
// import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { useEffect,useState } from 'react';
import {Buffer} from 'buffer'
import '../App.css'
import idl from '../idl.json'
import { utils } from '@project-serum/anchor';
import { sendAndConfirmTransaction } from "@solana/web3.js";
import kp from '../keypair.json'
import {
  AccountLayout,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,NATIVE_MINT,
  createAssociatedTokenAccountInstruction,
  getAccount,createInitializeMintInstruction,
  createMint,getOrCreateAssociatedTokenAccount,
  mintTo, createAssociatedTokenAccount,
   getAssociatedTokenAddress, 
   transfer} from "@solana/spl-token"
window.Buffer = Buffer
const programID = new PublicKey(idl?.metadata?.address)
window.Buffer = Buffer
const {SystemProgram,Keypair} = web3;
// const patreonNewkeyPair = Keypair.generate();

const network = clusterApiUrl("devnet")
const opts = {
  preflightCommitment:"processed",
}



let arr = Object.values(kp._keypair.secretKey)
// arr=arr.slice(0,32)
const secret = new Uint8Array(arr)
let patreonNewkeyPair = web3.Keypair.fromSecretKey(secret) //convert in fromSecretkey if doesn't works original - fromSeed
const connection = new Connection(network, opts.preflightCommitment);

console.log('patreonNewkeyPair',patreonNewkeyPair, 'patreonNewkeyPair user wallet',patreonNewkeyPair.publicKey.toString())

export const Admin = () => {
    const [walletAddress, setWalletAddress] = useState("");
    const [completeWalletAddress, setCompleteWalletAddress] = useState("")
    const [checkWalletPresent, setCheckWalletPresent] = useState(false)
    const [Loading,setLoading] = useState(false)
    const [transactionsList, setTransactionsList] = useState([])
    const [patreonJson,setPatreonJson] = useState({
      name:'',
      description:'',
      amount_contributed:''
    })


    const connectwallet = async() =>{
        const {solana} = window
        if(solana)
        {
          const response = await solana.connect();
        //    console.log("wallet address", response);
          setCompleteWalletAddress(response)
          setWalletAddress(response.publicKey);
        }else{
          alert('phantom not connected')
        }
      }

    const getProvider = () =>{
      const conection = new Connection(clusterApiUrl("devnet"),'processed');
      const provider = new AnchorProvider(
        conection,
        window.solana,
        'processed'
      )
      return provider
    }

    const submitForm = async() =>{
      try{
        const provider = getProvider()
        const program = new Program(idl,programID,provider)
        const [campaign] = await PublicKey.findProgramAddress(
          [
            utils.bytes.utf8.encode("PATREON_DEMO"),
            provider?.wallet?.publicKey?.toBuffer(),
          ],
          program.programId
        );
        console.log('campaign',campaign.toString())
       const tx = await program.rpc.createPatreon(patreonJson?.name,patreonJson?.description,new BN(patreonJson?.amount *  web3.LAMPORTS_PER_SOL),{
         accounts:{
          patreonDb:campaign,
          user:walletAddress,
          systemProgram:SystemProgram.programId
         }
       })
       console.log('tx',tx)
      }catch(err){
        console.log('err',err)
      }
    }

  // const getTransactions = async () => {
  //   try {
  //       setLoading(true)
  //     let provider = await window.solana;
  //     let connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  //   //   console.log("publickey", provider.publicKey.toString());
  //     const transSignatures = await connection.getSignaturesForAddress(
  //       provider.publicKey
  //     );
  //   //   console.log('transaction signatures',transSignatures)
  //     const transactions = [];
  //     for (let i = 0; i < transSignatures.length; i++) {
  //       const signature = transSignatures[i].signature;
  //       const formattedTime = new Date(transSignatures[i].blockTime * 1000)
  //       const time = parseInt((new Date(transSignatures[i].blockTime * 1000) / 1000).toFixed(0));
  //       const differenceDays = Math.round((new Date().getTime() - new Date(transSignatures[i].blockTime * 1000).getTime()) / (1000 * 60 * 60 * 24))
  //       const confirmedTransaction = await connection.getTransaction(signature);
  //       if (confirmedTransaction) {
  //         const { meta } = confirmedTransaction;
  //         const { transaction } = confirmedTransaction;
  //         // console.log('trasaction',transaction)
  //         if (meta) {
  //           const oldBalance = meta.preBalances;
  //           const newBalance = meta.postBalances;
  //           const wallet1 = transaction.message.accountKeys[0].toString();
  //           const wallet2 = transaction.message.accountKeys[1].toString();
  //           const amount = (oldBalance[0] - newBalance[0])/ LAMPORTS_PER_SOL;
  //           const transWithSignature = {
  //             signature,
  //             time,
  //             formattedTime,
  //             wallet1,
  //             wallet2,
  //             differenceDays,
  //             // ...confirmedTransaction,
  //             fees: meta?.fee,
  //             amount,
  //           };
  //           // console.log('transWithSignature',transWithSignature.transaction.message.accountKeys[0].toString(),transWithSignature.transaction.message.accountKeys[1].toString(),transWithSignature.transaction.message.accountKeys[2].toString())
  //           transactions.push(transWithSignature);
  //         }
  //       }
  //     }
  //     setTransactionsList(transactions)
  //     console.log("overall transaction information", transactions);
  //   } catch (err) {
  //     console.log(err);
  //   }finally{
  //       setLoading(false)
  //   }
  // };


  const checkIfPhantomWalletPresent = async() => {
    const { solana } = window;
    if (solana) {
      if (solana.isPhantom) {
        setCheckWalletPresent(true)
        const response = await solana.connect({onlyIfTrusted:true})
        setWalletAddress(response.publicKey)
      }else{
        alert("please connect to phantom wallet");
      }
    }
  };

  const initializaTokenPDA = async() =>{
    let transaction = new web3.Transaction()
    const provider = getProvider()
    const program = new Program(idl,programID,provider)

    let mintA = await createMint(connection, patreonNewkeyPair,patreonNewkeyPair.publicKey, null, 0);

    let myToken_acctA = await getOrCreateAssociatedTokenAccount(connection,patreonNewkeyPair,mintA,patreonNewkeyPair.publicKey)
    await mintTo(connection,patreonNewkeyPair,mintA,myToken_acctA.address,patreonNewkeyPair.publicKey,5)
    let amount =1;

     // state PDA for token
    const [user_pda_state, bump_state] = await web3.PublicKey.findProgramAddress(
      [ provider?.wallet?.publicKey?.toBuffer(),myToken_acctA?.address?.toBuffer(),Buffer.from("state")],
      programID
    );


    if(await connection.getAccountInfo(user_pda_state)==null){
      transaction.add(await program.methods.initializestatepda(bump_state)
      .accounts({
        statepda:user_pda_state,
        owner:walletAddress,
        depositTokenAccount:myToken_acctA.address,
        systemProgram: SystemProgram.programId
      }).signers([patreonNewkeyPair])
      .instruction())
    }
    console.log('tx',transaction)
    patreonNewkeyPair = [patreonNewkeyPair]
    // await sendAndConfirmTransaction(connection,transaction,patreonNewkeyPair);
    

  }

  useEffect(() => {
    // fetchData()
    // console.log(window.solana)
    const load =  () => {
       checkIfPhantomWalletPresent();
    };
    window.addEventListener("load", load);
    return( () => window.removeEventListener("unload", load));
  }, [walletAddress]);

  const fetchData = async() =>{ //fetch from smart contracts
    const provider = getProvider()
    const program = new Program(idl, programID, provider)
    // const program = new Program(idl,programID,provider)
    console.log(program.account)
    console.log(patreonNewkeyPair.publicKey.toString())
    // console.log('program',await program.account.patreonDb.fetch(patreonNewkeyPair.publicKey))
    await Promise.all(
      ((await connection.getProgramAccounts(programID)).map(async(tx,index)=>( //no need to write smartcontract to get the data, just pulling all transaction respective programID and showing to user
        {
        ...(await program.account.patreonDb.fetch(tx.pubkey)),
          pubkey:tx.pubkey.toString(),
      }
      )))
  ).then(result=>{
    console.log(result)
  }).catch(err=>{
    console.log('err',err)
  })
}

  
  return (
    <div className="App">
      <h2> <u> ADMIN PATREON PORTAL </u> </h2>

      {walletAddress ? (
          <div className="container">
          <input type="text" className="form-control my-3"  placeholder="Enter Name" onChange={(e)=>setPatreonJson({...patreonJson,name:e.target.value})} />
          <textarea className="form-control my-3"  rows="3" placeholder='Enter Description' onChange={(e)=>setPatreonJson({...patreonJson, description:e.target.value})} ></textarea>
          <input type="number" className="form-control my-3"  placeholder="Enter Amount"  onChange={(e)=>setPatreonJson({...patreonJson, amount_contributed:e.target.value})} />
          <button onClick={submitForm} className='btn btn-secondary my-3'> submit </button>
        </div>
      ) : (
        <button onClick={connectwallet} className="btn btn-secondary">
          CONNECT WALLET
        </button>
      )}
      <button onClick={initializaTokenPDA} > initializaTokenPDA </button>
      {Loading && <p> {"loading..."} </p>}
    </div>
  );
}

// amount: 4000005000
// fees: 5000
// signature: "5VFBYbKhK3X5urFpwKc43B1RUq9KmrZfP7N586MUvzx9THpCxTbg4THEoLXLnnq2AQrJugCYdND7ECLm11XWXNfx"
// time: Wed Sep 21 2022 21:58:38 GMT+0530 (India Standard Time) {}
// wallet1: "H4rQnPaffjZaU8J1jZ781YB7XejN4L1MCPCX7G2qNLWM"
// wallet2: "GwwSjUEXAn8fAAgsc5fNBAdkiJT7GuccFR69pD6zBH4s"