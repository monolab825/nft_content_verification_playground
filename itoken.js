var accounts = [];
var currentAccount = "";
var contract;
var validationMap = {};

// Contract address and ABI
const contractAddress = "0x1Fb2266B6A6dfFF9877C586f092e1D69fB7cBAa7";
const contractABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "name_",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "symbol_",
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
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "ERC721IncorrectOwner",
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
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ERC721InsufficientApproval",
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
    "name": "ERC721InvalidApprover",
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
    "name": "ERC721InvalidOperator",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "ERC721InvalidOwner",
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
    "name": "ERC721InvalidReceiver",
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
    "name": "ERC721InvalidSender",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ERC721NonexistentToken",
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
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "approved",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
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
        "indexed": true,
        "internalType": "bytes32",
        "name": "claimId",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "claimType",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "issuer",
        "type": "address"
      }
    ],
    "name": "ClaimAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "claimId",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "claimType",
        "type": "uint256"
      }
    ],
    "name": "ClaimRemoved",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "didDocumentUri",
        "type": "string"
      }
    ],
    "name": "DIDDocumentURISet",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "newDidDocumentUri",
        "type": "string"
      }
    ],
    "name": "DIDDocumentURIUpdated",
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
        "internalType": "bytes32",
        "name": "key",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "purpose",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "keyType",
        "type": "uint256"
      }
    ],
    "name": "KeyAdded",
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
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "CLAIM_ISSUER_ROLE",
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
    "name": "IDENTITY_ADMIN_ROLE",
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
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "claimType",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "scheme",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "issuer",
        "type": "address"
      },
      {
        "internalType": "bytes",
        "name": "signature",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      },
      {
        "internalType": "string",
        "name": "uri",
        "type": "string"
      }
    ],
    "name": "addClaim",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "purpose",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "keyType",
        "type": "uint256"
      },
      {
        "internalType": "bytes32",
        "name": "key",
        "type": "bytes32"
      }
    ],
    "name": "addKey",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
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
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "burnNFT",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getApproved",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "claimId",
        "type": "bytes32"
      }
    ],
    "name": "getClaim",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "claimType",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "scheme",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "issuer",
            "type": "address"
          },
          {
            "internalType": "bytes",
            "name": "signature",
            "type": "bytes"
          },
          {
            "internalType": "bytes",
            "name": "data",
            "type": "bytes"
          },
          {
            "internalType": "string",
            "name": "uri",
            "type": "string"
          }
        ],
        "internalType": "struct IToken.Claim",
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
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getCurrentWeight",
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
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getDIDDocumentURI",
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
        "internalType": "bytes32",
        "name": "keyId",
        "type": "bytes32"
      }
    ],
    "name": "getKey",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "purpose",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "keyType",
            "type": "uint256"
          },
          {
            "internalType": "bytes32",
            "name": "key",
            "type": "bytes32"
          }
        ],
        "internalType": "struct IToken.Key",
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
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getNFT",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "uri",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "didDocumentUri",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "weight",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "lastUpdated",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "decayRate",
            "type": "uint256"
          }
        ],
        "internalType": "struct IToken.NFT",
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
        "name": "owner",
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
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "isApprovedOrOwner",
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
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "uri",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "didDocumentUri",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "initialWeight",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "initialDecayRate",
        "type": "uint256"
      }
    ],
    "name": "mintNFT",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
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
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "bytes32",
        "name": "claimId",
        "type": "bytes32"
      }
    ],
    "name": "removeClaim",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "bytes32",
        "name": "keyId",
        "type": "bytes32"
      }
    ],
    "name": "removeKey",
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
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
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
        "name": "tokenId",
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
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "didDocumentUri",
        "type": "string"
      }
    ],
    "name": "setDIDDocumentURI",
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
    "inputs": [],
    "name": "symbol",
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
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
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
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "newDecayRate",
        "type": "uint256"
      }
    ],
    "name": "updateDecayRate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "newWeight",
        "type": "uint256"
      }
    ],
    "name": "updateNFTWeight",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Initialize Web3 and set up event listeners
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
    updateStatusBar("You switched your account to:", currentAccount);
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
  }
}

function connectToContract() {
  contract = new web3.eth.Contract(contractABI, contractAddress);
  createValidationMap(contractABI);
}

// Create Validation Map from ABI
function createValidationMap(abi) {
  abi.forEach((item) => {
    if (item.type === "function") {
      validationMap[item.name] = item.inputs.map((input) => input.type);
    }
  });
}

// Validation function
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

  return true; // All inputs are valid
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
      return true; // Assume valid for types not explicitly checked
  }
}

// Function Implementations
async function addKey() {
  const tokenId = document.getElementById("addKeyId").value;
  const purpose = document.getElementById("keyPurpose").value;
  const keyType = document.getElementById("keyType").value;
  const keyData = document.getElementById("keyData").value;

  if (!validateInputs("addKey", [tokenId, purpose, keyType, keyData])) {
    console.error("Validation failed for addKey");
    return;
  }

  try {
    await contract.methods
      .addKey(tokenId, purpose, keyType, web3.utils.asciiToHex(keyData))
      .call();
    updateStatusBar("Key added successfully", {});
  } catch (error) {
    console.error("Error adding key:", error);
    updateStatusBar("Error adding key. Please check the console for details.", {}, true);
  }
}

async function removeKey() {
  const tokenId = document.getElementById("removeKeyTokenId").value;
  const keyId = document.getElementById("removeKeyId").value;

  if (!validateInputs("removeKey", [tokenId, keyId])) {
    console.error("Validation failed for removeKey");
    return;
  }

  try {
    await contract.methods.removeKey(tokenId, keyId).call();
    updateStatusBar("Key removed successfully", {});
  } catch (error) {
    console.error("Error removing key:", error);
    updateStatusBar("Error removing key. Please check the console for details.", {}, true);
  }
}

async function addClaim() {
  const tokenId = document.getElementById("addClaimTokenId").value;
  const claimType = document.getElementById("claimType").value;
  const scheme = document.getElementById("claimScheme").value;
  const issuer = document.getElementById("issuer").value;
  const signature = document.getElementById("signature").value;
  const claimData = document.getElementById("claimData").value;
  const uri = document.getElementById("claimUri").value;

  if (
    !validateInputs("addClaim", [
      tokenId,
      claimType,
      scheme,
      issuer,
      signature,
      claimData,
      uri,
    ])
  ) {
    console.error("Validation failed for addClaim");
    return;
  }

  try {
    await contract.methods
      .addClaim(tokenId, claimType, scheme, issuer, signature, claimData, uri)
      .send({ from: currentAccount });
    updateStatusBar("Claim added successfully", {});
  } catch (error) {
    console.error("Error adding claim:", error);
    updateStatusBar("Error adding claim. Please check the console for details.", {}, true);
  }
}

async function removeClaim() {
  const tokenId = document.getElementById("removeClaimTokenId").value;
  const claimId = document.getElementById("removeClaimId").value;

  if (!validateInputs("removeClaim", [tokenId, claimId])) {
    console.error("Validation failed for removeClaim");
    return;
  }

  try {
    await contract.methods
      .removeClaim(tokenId, claimId)
      .send({ from: currentAccount });
    updateStatusBar("Claim removed successfully");
  } catch (error) {
    console.error("Error removing claim:", error);
  }
}

// User Interface Feedback Functions
function displayCurrentAccount(account) {
  const accountContainer = document.getElementById("currentAccount");
  accountContainer.innerHTML = `<p><strong>Current Account:</strong> ${account}</p>`;
}

// Read NFT details
async function getNFTDetails() {
  const tokenId = document.getElementById("tokenId").value;

  if (!validateInputs("getNFT", [tokenId])) {
    alert("Invalid Token ID");
    return;
  }

  try {
    const nftDetails = await contract.methods.getNFT(tokenId).call();
    updateStatusBar("NFT Details : ",nftDetails);
  } catch (error) {
    console.error("Error retrieving NFT details:", error.data.message ?? error);
    if (error.data.message) alert(error.data.message);
  }
}



// Mint a new NFT
async function mintNFT() {
  const to = document.getElementById("to").value;
  const newTokenId = document.getElementById("newTokenId").value;
  const uri = document.getElementById("uri").value;
  const didDocumentUri = document.getElementById("didDocumentUri").value;
  const initialWeight = document.getElementById("initialWeight").value;
  const initialDecayRate = document.getElementById("initialDecayRate").value;

  if (
    !validateInputs("mintNFT", [
      to,
      newTokenId,
      uri,
      didDocumentUri,
      initialWeight,
      initialDecayRate,
    ])
  ) {
    alert("Invalid input for minting NFT");
    return;
  }

  try {
    await contract.methods
      .mintNFT(
        to,
        newTokenId,
        uri,
        didDocumentUri,
        initialWeight,
        initialDecayRate
      )
      .send({ from: currentAccount, value: 0, gas: 5000000 })
      .on("transactionHash", (hash) =>
        updateStatusBar("Transaction Hash: " + hash)
      )
      .on("confirmation", (confirmationNumber, receipt) =>
        updateStatusBar("Confirmation: " + confirmationNumber)
      )
      .on("receipt", (receipt) => updateStatusBar("Receipt:", receipt))
      .on("error", (error, receipt) => {
        console.error("Error:", error);
        updateStatusBar(
          "Error minting NFT. Please check the console for details."
        );
      });
  } catch (error) {
    console.error("Error minting NFT:", error);

  }
}


// Update NFT attributes
async function updateNFTAttributes() {
  const updateTokenId = document.getElementById("updateTokenId").value;
  const newWeight = document.getElementById("newWeight").value;
  const newDecayRate = document.getElementById("newDecayRate").value;

  if (
    !validateInputs("updateNFTWeight", [updateTokenId, newWeight]) &&
    !validateInputs("updateDecayRate", [updateTokenId, newDecayRate])
  ) {
    alert("Invalid input for updating NFT attributes");
    return;
  }

  try {
    await contract.methods
      .updateNFTWeight(updateTokenId, newWeight)
      .send({ from: currentAccount });
    await contract.methods
      .updateDecayRate(updateTokenId, newDecayRate)
      .send({ from: currentAccount });

  } catch (error) {
    console.error("Error updating NFT attributes:", error);
  }
}


// Display the current account on the page
function displayCurrentAccount(account) {
  const accountContainer = document.getElementById("currentAccount");
  accountContainer.innerHTML = `<p><strong>حساب متصل:</strong> ${account}</p>`;
}


async function burnNFT() {
  const tokenId = document.getElementById("burnTokenId").value;

  if (!validateInputs("burnNFT", [tokenId])) {
    alert("Invalid Token ID for burning NFT");
    return;
  }

  try {
    let isOwner = await contract.methods
      .isApprovedOrOwner(currentAccount, tokenId)
      .call();
    if (!isOwner){ 
      alert("You do not own this token.");
    }else {
      await contract.methods
        .burnNFT(tokenId)
        .send({ from: currentAccount, gas: 500000 });
    }
  } catch (error) {
    alert("ERROR : NFT is burned already.");
    console.error("Error burning NFT:", error);
  }
}

async function grantRole() {
  const address = document.getElementById("grantRoleAddress").value;
  const roleName = document.getElementById("grantRoleName").value;
  const role = web3.utils.keccak256(roleName);

  if (!validateInputs("grantRole", [role, address])) {
    alert("Invalid inputs for granting role");
    return;
  }

  try {
    await contract.methods
      .grantRole(role, address)
      .send({ from: currentAccount });
    updateStatusBar("Role granted successfully");
  } catch (error) {
    console.error("Error granting role:", error);
  }
}

async function revokeRole() {
  const address = document.getElementById("revokeRoleAddress").value;
  const roleName = document.getElementById("revokeRoleName").value;
  const role = web3.utils.keccak256(roleName);

  if (!validateInputs("revokeRole", [role, address])) {
    alert("Invalid inputs for revoking role");
    return;
  }

  try {
    await contract.methods
      .revokeRole(role, address)
      .send({ from: currentAccount });
    updateStatusBar("Role revoked successfully");
  } catch (error) {
    console.error("Error revoking role:", error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  initializeWeb3();
  connectToMetaMask().catch(console.error);
});



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
