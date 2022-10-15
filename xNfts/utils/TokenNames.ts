
export const CoinDetails = (coin:string):string => {
  switch (coin) {
    case "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v":
      return "USD COIN";
    case "DUSTawucrTsGU8hcqRdHDCbuYhCPADMLM2VcCb8VnFnQ":
      return "DUST";
    default:
      return "unknown";
  }
};

let arrList = [
  "My Numbers NFT - 4",
  "Pandas Stacked - 2",
  "Claim Rewards - 23",
  "My Dust - 100",
  "Gari Staked - 20",
  "Claim Yeild - 2",
  "Boosted Rewards - 5",
];

let arrListSample = [
  "Numbers NFT(s) - 4",
  "Numbers Stacked - 0",
  "Dust - 100",
  "Dust Staked - 0",
];