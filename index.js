const { ethers } = require("ethers");

async function connect() {
  if (typeof window.ethereum !== "undefined") {
    await ethereum.request({ method: "eth_requestAccounts" });
  }
}

async function execute() {
  /**To execute a fn we need a
      address,
      contract ABI,
      function,
      node connection
     */

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  // address of contract deployed in the local hardhat blockhain

  // get abi of deployed contract from contracts json file in deployments
  const abi = [
    {
      inputs: [
        {
          internalType: "string",
          name: "_name",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "_favoriteNumber",
          type: "uint256",
        },
      ],
      name: "addPerson",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      name: "nameToFavoriteNumber",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "people",
      outputs: [
        {
          internalType: "uint256",
          name: "favoriteNumber",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "name",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "retrieve",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_favoriteNumber",
          type: "uint256",
        },
      ],
      name: "store",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  // provider is metamask aka window.ethereum, ie we are using this as our rpc url
  /**we can also put the HTTP server rpc url, but we want to connect with users metamask, we want to connect
   * with whatever network they are working with we dont always wanna force them to our localhost blockchain
   */

  // signer - when somebody execute a txn somebody needs to sign it.
  const signer = provider.getSigner();
  // This is going to get the connected account into our ethers

  const contract = new ethers.Contract(contractAddress, abi, signer);
  /**This means we're gonna be interacting with this contractAddress, using this abi, and any fn called
    will be called by the signer
    whoever connects() to the smart contract will be the signer and they are the one gonna call these fns
   */
  await contract.store(42); //calling the store fn and passing a parameter
}

module.exports = {
  connect,
  execute,
};
