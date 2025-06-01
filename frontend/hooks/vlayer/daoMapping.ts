import { keccak256, stringToBytes } from "viem";

// {
//   name: "GatedDAO",
//   iconURL: "/logos/maker-mkr-logo.png",
//   token: "DAO",
//   tokenAddress: "0x7b33F3F4EB34B30cC9239869c95018Cf486DB678",
//   emailDomain: "gateddao.com",
//   expectedDomain: "gmail.com",
//   domainHash: keccak256(stringToBytes("gmail.com")),
// },
// {
//   name: "MakerDAO",
//   iconURL: "/logos/maker-mkr-logo.png",
//   token: "MKR",
//   tokenAddress: "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2",
//   emailDomain: "makerdao.com",
//   expectedDomain: "gmail.com",
//   domainHash: keccak256(stringToBytes("outlook.com")),
// },
export type DAO = {
  name: string;
  iconURL: string;
  expectedDomain: string;
  emailDomain: string;
  token: string;
  domainHash: string;
  tokenAddress: string;
};

export type Pool = DAO & {
  poolId: string;
};

export const DAO_MAPPING: DAO[] = [
  {
    name: "GatedDAO",
    iconURL: "/logos/gated-pool-logo.jpeg",
    token: "DAO",
    tokenAddress: "0x54FA517F05e11Ffa87f4b22AE87d91Cec0C2D7E1",
    emailDomain: "gateddao.com",
    expectedDomain: "gmail.com",
    domainHash: keccak256(stringToBytes("gmail.com")),
  },
  {
    name: "Compound DAO",
    iconURL: "/logos/compound-comp-logo.png",
    token: "COMP",
    tokenAddress: "0x489c5CB7fD158B0A9E7975076D758268a756C025",
    emailDomain: "compound.finance",
    expectedDomain: "compound.finance",
    domainHash: keccak256(stringToBytes("compound.finance")),
  },
  {
    name: "Uniswap DAO",
    iconURL: "/logos/uniswap-uni-logo.png",
    token: "UNI",
    tokenAddress: "0xa0194c01b45bA58482DC70446CB41Af62dd21a47",
    emailDomain: "uniswap.org",
    expectedDomain: "uniswap.org",
    domainHash: keccak256(stringToBytes("uniswap.org")),
  },
  {
    name: "Aave DAO",
    iconURL: "/logos/aave-aave-logo.png",
    token: "AAVE",
    tokenAddress: "0xC364dc740ecB6C411aE0de8e130c0199bA875724",
    emailDomain: "aave.com",
    expectedDomain: "aave.com",
    domainHash: keccak256(stringToBytes("aave.com")),
  },
  {
    name: "Yearn Finance DAO",
    iconURL: "/logos/yearn-finance-yfi-logo.png",
    token: "YFI",
    tokenAddress: "0x5b41A5c0Df16551f5edeAa2B2eDe2135F1a824DF",
    emailDomain: "yearn.finance",
    expectedDomain: "yearn.finance",
    domainHash: keccak256(stringToBytes("yearn.finance")),
  },
  {
    name: "Aragon DAO",
    iconURL: "/logos/aragon-ant-logo.png",
    token: "ANT",
    tokenAddress: "0xD7b45CbC28BA9ba8653665d5FB37167a2Afe35D9",
    emailDomain: "aragon.org",
    expectedDomain: "aragon.org",
    domainHash: keccak256(stringToBytes("aragon.org")),
  },
  {
    name: "Balancer DAO",
    iconURL: "/logos/balancer-bal-logo.png",
    token: "BAL",
    tokenAddress: "0xC870a3dc444bF970Da13979E9CFAc1a01c198eac",
    emailDomain: "balancer.fi",
    expectedDomain: "balancer.fi",
    domainHash: keccak256(stringToBytes("balancer.fi")),
  },
  {
    name: "Synthetix DAO",
    iconURL: "/logos/synthetix-snx-logo.png",
    token: "SNX",
    tokenAddress: "0x01fa8dEEdDEA8E4e465f158d93e162438d61c9eB",
    emailDomain: "synthetix.io",
    expectedDomain: "synthetix.io",
    domainHash: keccak256(stringToBytes("synthetix.io")),
  },
  {
    name: "Gitcoin DAO",
    iconURL: "/logos/gitcoin-gtc-logo.png",
    token: "GTC",
    tokenAddress: "0xbe1d0dB61E7562d88eF1FAb7436d02b6d00ce728",
    emailDomain: "gitcoin.co",
    expectedDomain: "gitcoin.co",
    domainHash: keccak256(stringToBytes("gitcoin.co")),
  },
  {
    name: "ENS DAO",
    iconURL:
      "/logos/ethereum-name-service-ens-logo.png",
    token: "ENS",
    tokenAddress: "0x63355a2ff725B11B6d82071c9FD710C0DCc71900",
    emailDomain: "ens.domains",
    expectedDomain: "ens.domains",
    domainHash: keccak256(stringToBytes("ens.domains")),
  },
  {
    name: "Lido DAO",
    iconURL: "/logos/lido-dao-ldo-logo.png",
    token: "LDO",
    tokenAddress: "0x1cD40deb4196D219097499031922Ff690F9ea813",
    emailDomain: "lido.fi",
    expectedDomain: "lido.fi",
    domainHash: keccak256(stringToBytes("lido.fi")),
  },
  {
    name: "Gnosis DAO",
    iconURL: "/logos/gnosis-gno-logo.png",
    token: "GNO",
    tokenAddress: "0xb9533D0548E87bf07eE4bAeb7B485Ba310902676",
    emailDomain: "gnosis.io",
    expectedDomain: "gnosis.io",
    domainHash: keccak256(stringToBytes("gnosis.io")),
  },
  {
    name: "1inch DAO",
    iconURL: "/logos/1inch-1inch-logo.png",
    token: "1INCH",
    tokenAddress: "0x958b482c4E9479a600bFFfDDfe94D974951Ca3c7",
    emailDomain: "1inch.io",
    expectedDomain: "1inch.io",
    domainHash: keccak256(stringToBytes("1inch.io")),
  },
];
