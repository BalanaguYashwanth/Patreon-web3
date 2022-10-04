import { PublicKey,SYSVAR_RENT_PUBKEY } from "@solana/web3.js"
import { utils, web3, Wallet } from '@project-serum/anchor';
import { BN } from "@project-serum/anchor";
import {
    ASSOCIATED_TOKEN_PROGRAM_ID,
    getAssociatedTokenAddress,
    TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import kp from '../keypair.json'
export const Donate = ({getProvider,Program,idl,programID,patreonNewkeyPair,SystemProgram,walletAddress}) =>{

    let getBinaryFromWalletAddress = new PublicKey('B2X3R8oTmYB5cV3FBwQ7bbfrc46dhgCJAVmXkDzSurGM') //B2X3R8oTmYB5cV3FBwQ7bbfrc46dhgCJAVmXkDzSurGM //6xxbFNeTtygiMtYXQEy846n5U9Q6bTmwFtUmje9kBHoS
    //5NAbfxgXsVHYc86PFdJBg9zaXQBS5HuRHyLUdCeEzemF
    // console.log(getBinary.toString())

    let arr = Object.values(kp._keypair.secretKey)
    // arr=arr.slice(0,32)
    const secret = new Uint8Array(arr)
    let ownerkey = web3.Keypair.fromSecretKey(secret) 
   console.log('owner',ownerkey.publicKey.toString())
    // const initialize = async() =>{
    //     const provider = getProvider()
    //     const program = new Program(idl,programID,provider)
    //      const buffer  = provider.wallet.publicKey
    //     const [campaign] = await PublicKey.findProgramAddress(
    //         [
    //             utils.bytes.utf8.encode("CAMPAIGN_DEMO"),
    //             provider.wallet.publicKey.toBuffer(),
    //         ],
    //         program.programId
    //     );
    //     // console.log('campaign',campaign)
    //     try{
    //       const tx  = await program.rpc.initialize({accounts:{
    //         patreonDb:campaign,
    //         user:walletAddress,
    //         systemProgram:SystemProgram.programId
    //       },
    //      signers:[walletAddress]
    //       })
    //       console.log('tx',tx,'campaign',campaign.toString())
    //     }catch(err){
    //       console.log(err)
    //     }
    //   } 
    // const provider = getProvider()
    // console.log('get wallet keypair',provider.publicKey)

    const donateWallet = async () => {
      const provider = getProvider();
      const program = new Program(idl, programID, provider);
      try {
        const tx = program.rpc.donate(new BN(2 * web3.LAMPORTS_PER_SOL), {
          accounts: {
            patreonAccount: getBinaryFromWalletAddress,
            user: provider.publicKey,
            systemProgram: SystemProgram.programId,
          },
        //   signers: [patreonNewkeyPair],
        });
        console.log("donate tx success", tx);
        transfer_token()
      } catch (err) {
        console.log(err);
      }
    };
    // const provider = getProvider();
      // console.log("get wallet keypair", provider.wallet.signMessage());
    // console.log('web3',new web3.Transaction())
    console.log("get wallet user keypair", patreonNewkeyPair.publicKey.toString(),);

    const transfer_token = async () => {

    
      
        const provider = getProvider();
        console.log("get wallet user keypair", patreonNewkeyPair.publicKey.toString());
        const program = new Program(idl, programID, provider);
        const mintKeypair = new PublicKey(
          "9GBmKXH3RqfB69UZtXx13x7BxJDXDRHNfRAVHLVDM8KU"
        );
        // const transaction = new web3.Transaction();
        // const { signature } = await provider.signTransaction(transaction);
        // console.log("wallet", walletAddress);
        const ownerTokenAddress = await utils.token.associatedAddress({
          mint: mintKeypair,
          owner: new PublicKey('5NAbfxgXsVHYc86PFdJBg9zaXQBS5HuRHyLUdCeEzemF'),
        });
        const buyerTokenAddress = await utils.token.associatedAddress({
          mint: mintKeypair,
          owner: provider.publicKey,
        });
        console.log('wallet pubkey',provider.publicKey.toString())
        try {
          const tx = program.rpc.transferNft({
            accounts: {
              buyer: provider.publicKey,
              seller: new PublicKey('5NAbfxgXsVHYc86PFdJBg9zaXQBS5HuRHyLUdCeEzemF'),
              tokenHolder:new PublicKey('5NAbfxgXsVHYc86PFdJBg9zaXQBS5HuRHyLUdCeEzemF'),
              mint: mintKeypair,
              ownerTokenAccount:ownerTokenAddress,
            //   ownerAuthority:new PublicKey('5NAbfxgXsVHYc86PFdJBg9zaXQBS5HuRHyLUdCeEzemF'),
              buyerTokenAccount:buyerTokenAddress,
              buyerAuthority:provider.publicKey,
              systemProgram: SystemProgram.programId,
              tokenProgram: TOKEN_PROGRAM_ID,
              rent: SYSVAR_RENT_PUBKEY,
              associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
            },
            signers: [ownerkey],
          });
          console.log("donate tx success", await tx);
        } catch (err) {
          console.log(err);
        }
      };

    //   const transfer_token_frontend = async() =>{
    //     const transaction = new web3.Transaction().add(
    //         splToken.Token.createTransferInstruction(
    //           splToken.TOKEN_PROGRAM_ID,
    //           fromTokenAccount.address,
    //           toTokenAccount.address,
    //           fromWallet.publicKey,
    //           [],
    //           1
    //         )
    //       );
          
    //       // Sign transaction, broadcast, and confirm
    //       await web3.sendAndConfirmTransaction(connection, transaction, [fromWallet]);
    //   }


      const withdrawWallet = async() =>{
          const provider = getProvider()
          const program = new Program(idl,programID,provider)
          try{
            const tx = await program.rpc.withdraw(new BN(2 * web3.LAMPORTS_PER_SOL),{
                accounts:{
                    patreonAccount:getBinaryFromWalletAddress,
                      user:walletAddress
                }
                })
                console.log('withdraw tx success',tx)
          }catch(err){
              console.log(err)
          }
      }

    return(
        <div>
            {/* <button onClick={initialize}> Initialize </button> */} {/* need to replace with createPatreon but exists in another file in pages please check  */} 
            <button onClick={transfer_token}> Transfer </button>
            <button onClick={donateWallet}> Donate </button>
            <button onClick={withdrawWallet}> withdraw </button>
        </div>
    )
}
