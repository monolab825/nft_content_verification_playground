var accounts = [];
var currentAccount = "";
var contract;
var validationMap = {};

const contractAddress = "0xD80a5152624773b07eE1A7C07965faD44e78654f";
const contractABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "uri",
        "type": "string"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "AccessControlBadConfirmation",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "neededRole",
        "type": "bytes32"
      }
    ],
    "name": "AccessControlUnauthorizedAccount",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "balance",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "needed",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ERC1155InsufficientBalance",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "approver",
        "type": "address"
      }
    ],
    "name": "ERC1155InvalidApprover",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "idsLength",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "valuesLength",
        "type": "uint256"
      }
    ],
    "name": "ERC1155InvalidArrayLength",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "ERC1155InvalidOperator",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      }
    ],
    "name": "ERC1155InvalidReceiver",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "ERC1155InvalidSender",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "ERC1155MissingApprovalForAll",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidInitialization",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotInitializing",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ReentrancyGuardReentrantCall",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "ApprovalForAll",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint64",
        "name": "version",
        "type": "uint64"
      }
    ],
    "name": "Initialized",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "vtokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "newParentVTokenId",
        "type": "uint256"
      }
    ],
    "name": "ParentVTokenUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "previousAdminRole",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "newAdminRole",
        "type": "bytes32"
      }
    ],
    "name": "RoleAdminChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "RoleGranted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "RoleRevoked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "ids",
        "type": "uint256[]"
      },
      {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "values",
        "type": "uint256[]"
      }
    ],
    "name": "TransferBatch",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "TransferSingle",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "value",
        "type": "string"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "URI",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "vtokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "newDetails",
        "type": "string"
      }
    ],
    "name": "VTokenDetailsUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "vtokenId",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "ctokenId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "itokenId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "verificationDetails",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "weight",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "parentVTokenId",
            "type": "uint256"
          }
        ],
        "indexed": false,
        "internalType": "struct VToken.VerificationData",
        "name": "data",
        "type": "tuple"
      }
    ],
    "name": "VTokenMinted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "vtokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "enum VToken.VerificationStatus",
        "name": "newStatus",
        "type": "uint8"
      }
    ],
    "name": "VTokenStatusUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "vtokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "newWeight",
        "type": "uint256"
      }
    ],
    "name": "VTokenWeightUpdated",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "ADVANCED_VERIFIER_ROLE",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "DEFAULT_ADMIN_ROLE",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "VERIFIER_ROLE",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address[]",
        "name": "accounts",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "ids",
        "type": "uint256[]"
      }
    ],
    "name": "balanceOfBatch",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_ctokenId",
        "type": "uint256"
      }
    ],
    "name": "getAllVTokensForCToken",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_parentVTokenId",
        "type": "uint256"
      }
    ],
    "name": "getChildVTokens",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      }
    ],
    "name": "getRoleAdmin",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_vtokenId",
        "type": "uint256"
      }
    ],
    "name": "getVerificationInfo",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "ctokenId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "itokenId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "verificationDetails",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "weight",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "parentVTokenId",
            "type": "uint256"
          }
        ],
        "internalType": "struct VToken.VerificationData",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "grantRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "hasRole",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "initialize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_ctokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_itokenId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_details",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_weight",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_parentVTokenId",
        "type": "uint256"
      }
    ],
    "name": "mintVToken",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nextVTokenId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "callerConfirmation",
        "type": "address"
      }
    ],
    "name": "renounceRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "revokeRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256[]",
        "name": "ids",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "values",
        "type": "uint256[]"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "safeBatchTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_vtokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_newParentVTokenId",
        "type": "uint256"
      }
    ],
    "name": "updateParentVToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_vtokenId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_newDetails",
        "type": "string"
      }
    ],
    "name": "updateVTokenDetails",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_vtokenId",
        "type": "uint256"
      },
      {
        "internalType": "enum VToken.VerificationStatus",
        "name": "_newStatus",
        "type": "uint8"
      }
    ],
    "name": "updateVTokenStatus",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_vtokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_newWeight",
        "type": "uint256"
      }
    ],
    "name": "updateVTokenWeight",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "uri",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "verifications",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "ctokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "itokenId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "verificationDetails",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "weight",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "parentVTokenId",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

function initializeWeb3() {
  if (typeof window.ethereum !== "undefined") {
    web3 = new Web3(window.ethereum);
    window.ethereum.on("accountsChanged", handleAccountsChanged);
    window.ethereum.on("chainChanged", handleChainChanged);
  } else {
    updateStatusBar("No web3? You should consider trying MetaMask!");
    web3 = new Web3(
      new Web3.providers.HttpProvider("https://rpc-mumbai.maticvigil.com:80001")
    );
  }
}

function handleAccountsChanged(newAccounts) {
  if (newAccounts.length === 0) {
    updateStatusBar("Please connect to MetaMask.");
  } else {
    currentAccount = newAccounts[0];
    displayCurrentAccount(currentAccount);
  }
}

function handleChainChanged(_chainId) {
  window.location.reload();
}

async function connectToMetaMask() {
  try {
    accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    currentAccount = accounts[0];
    updateStatusBar("Connected to MetaMask. Current Account:", currentAccount);
    displayCurrentAccount(currentAccount);
    connectToContract();
  } catch (error) {
    console.error("Error connecting to MetaMask:", error.message);
    alert("Error connecting to MetaMask:");
  }
}

function connectToContract() {
  contract = new web3.eth.Contract(contractABI, contractAddress);
  createValidationMap(contractABI);
}

function createValidationMap(abi) {
  abi.forEach((item) => {
    if (item.type === "function") {
      validationMap[item.name] = item.inputs.map((input) => input.type);
    }
  });
}

function validateInputs(functionName, inputs) {
  if (!validationMap[functionName]) {
    console.error("Function not found in ABI");
    return false;
  }

  let expectedTypes = validationMap[functionName];
  if (inputs.length !== expectedTypes.length) {
    console.error("Incorrect number of inputs");
    return false;
  }

  for (let i = 0; i < inputs.length; i++) {
    if (!validateType(inputs[i], expectedTypes[i])) {
      console.error(
        `Input ${i} does not match the expected type ${expectedTypes[i]}`
      );
      return false;
    }
  }

  return true;
}

function validateType(value, type) {
  switch (type) {
    case "uint256":
      return /^\d+$/.test(value);
    case "address":
      return web3.utils.isAddress(value);
    case "bytes":
      return /^0x[0-9a-fA-F]*$/.test(value);
    default:
      return true;
  }
}

async function mintVToken() {
  const ctokenId = document.getElementById("ctokenId").value;
  const itokenId = document.getElementById("itokenId").value;
  const details = document.getElementById("details").value;
  const weight = document.getElementById("weight").value;
  const parentVTokenId = document.getElementById("parentVTokenId").value;

  if (
    !validateInputs("mintVToken", [
      ctokenId,
      itokenId,
      details,
      weight,
      parentVTokenId,
    ])
  ) {
    return;
  }

  try {
    await contract.methods
      .mintVToken(ctokenId, itokenId, details, weight, parentVTokenId)
      .send({ from: currentAccount, gas: 1000000 });
    updateStatusBar("VToken minted successfully");
  } catch (error) {
    console.error("Error minting VToken:", error);
    alert("Error minting VToken:");
    alert("Error minting VToken:");
  }
}

async function updateVTokenWeight() {
  const updateVTokenId = document.getElementById("updateVTokenId").value;
  const newWeight = document.getElementById("newWeight").value;

  if (!validateInputs("updateVTokenWeight", [updateVTokenId, newWeight])) {
    return;
  }

  try {
    await contract.methods
      .updateVTokenWeight(updateVTokenId, newWeight)
      .send({ from: currentAccount, gas: 1000000 });
    updateStatusBar("VToken weight updated successfully");
  } catch (error) {
    console.error("Error updating VToken weight:", error);
    alert("Error updating VToken weight:");
  }
}

async function updateVTokenStatus() {
  const updateStatusVTokenId = document.getElementById(
    "updateStatusVTokenId"
  ).value;
  const newStatus = document.getElementById("newStatus").value;

  if (
    !validateInputs("updateVTokenStatus", [updateStatusVTokenId, newStatus])
  ) {
    return;
  }

  try {
    await contract.methods
      .updateVTokenStatus(updateStatusVTokenId, newStatus)
      .send({ from: currentAccount, gas: 1000000 });
    updateStatusBar("VToken status updated successfully");
  } catch (error) {
    console.error("Error updating VToken status:", error);
    alert("Error updating VToken status:");
  }
}

async function updateParentVToken() {
  const updateParentVTokenId = document.getElementById(
    "updateParentVTokenId"
  ).value;
  const newParentVTokenId = document.getElementById("newParentVTokenId").value;

  if (
    !validateInputs("updateParentVToken", [
      updateParentVTokenId,
      newParentVTokenId,
    ])
  ) {
    return;
  }

  try {
    await contract.methods
      .updateParentVToken(updateParentVTokenId, newParentVTokenId)
      .send({ from: currentAccount, gas: 1000000 });
    updateStatusBar("VToken parent updated successfully");
  } catch (error) {
    console.error("Error updating VToken parent:", error);
    alert("Error updating VToken parent:");
  }
}

async function getChildVTokens() {
  const parentVTokenIdChild = document.getElementById(
    "parentVTokenIdChild"
  ).value;

  if (!validateInputs("getChildVTokens", [parentVTokenIdChild])) {
    return;
  }

  try {
    const childVTokens = await contract.methods
      .getChildVTokens(parentVTokenIdChild)
      .call({ from: currentAccount });
    updateStatusBar("Child VTokens:", childVTokens);
  } catch (error) {
    console.error("Error getting child VTokens:", error);
    alert("Error getting child VTokens:");
  }
}

async function getAllVTokensForCToken() {
  const ctokenIdAll = document.getElementById("ctokenIdAll").value;

  if (!validateInputs("getAllVTokensForCToken", [ctokenIdAll])) {
    return;
  }

  try {
    const allVTokens = await contract.methods
      .getAllVTokensForCToken(ctokenIdAll)
      .call({ from: currentAccount });
    updateStatusBar("All VTokens for CToken:", allVTokens);
  } catch (error) {
    console.error("Error getting all VTokens for CToken:", error);
    alert("Error getting all VTokens for CToken:");
  }
}

async function updateVTokenDetails() {
  const updateDetailsVTokenId = document.getElementById(
    "updateDetailsVTokenId"
  ).value;
  const newDetails = document.getElementById("newDetails").value;

  if (
    !validateInputs("updateVTokenDetails", [updateDetailsVTokenId, newDetails])
  ) {
    return;
  }

  try {
    await contract.methods
      .updateVTokenDetails(updateDetailsVTokenId, newDetails)
      .send({ from: currentAccount, gas: 1000000 });
    updateStatusBar("VToken details updated successfully");
  } catch (error) {
    console.error("Error updating VToken details:", error);
    alert("Error updating VToken details:");
  }
}

async function getVerificationInfo() {
  const verificationInfoVTokenId = document.getElementById(
    "verificationInfoVTokenId"
  ).value;

  if (!validateInputs("getVerificationInfo", [verificationInfoVTokenId])) {
    return;
  }

  try {
    const verificationInfo = await contract.methods
      .getVerificationInfo(verificationInfoVTokenId)
      .call({ from: currentAccount });
    updateStatusBar("Verification Info for VToken:", verificationInfo);
  } catch (error) {
    console.error("Error getting verification info:", error);
    alert("Error getting verification info:");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  initializeWeb3();
  connectToMetaMask().catch(console.error);
});

function displayCurrentAccount(account) {
  const accountElement = document.getElementById("currentAccount");
  if (accountElement) {
    accountElement.textContent = "حساب متصل : " + account;
  }
}

function updateStatusBar(message, verificationInfo = {}, isError = false) {
  const statusBar = document.getElementById("statusBar");
  let verificationHTML = verificationInfo;
  if (!(verificationInfo instanceof Array))
    verificationHTML = Object.keys(verificationInfo)
      .filter((key) => isNaN(key))
      .map((key) => {
        if (key === "__length__") return "";
        return `<p><strong>${key}:</strong> ${String(
          verificationInfo[key]
        )}</p>`;
      })
      .join("\n");
  else
    verificationHTML = Object.keys(verificationInfo)
      .map((key) => {
        if (key === "__length__") return "";
        return `<p><strong>Item ${key}:</strong> ${String(
          verificationInfo[key]
        )}</p>`;
      })
      .join("\n");
  statusBar.innerHTML = `${message}<div style="margin:10px">\n${verificationHTML}</div>`;
  statusBar.style.color = isError ? "red" : "green";
}
