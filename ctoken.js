var accounts = [];
var currentAccount = "";
var contract;
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
        "inputs": [
            {
                "internalType": "uint256",
                "name": "numerator",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "denominator",
                "type": "uint256"
            }
        ],
        "name": "ERC2981InvalidDefaultRoyalty",
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
        "name": "ERC2981InvalidDefaultRoyaltyReceiver",
        "type": "error"
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
                "name": "numerator",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "denominator",
                "type": "uint256"
            }
        ],
        "name": "ERC2981InvalidTokenRoyalty",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "receiver",
                "type": "address"
            }
        ],
        "name": "ERC2981InvalidTokenRoyaltyReceiver",
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
        "inputs": [],
        "name": "CONTENT_MANAGER_ROLE",
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
        "name": "MINTER_ROLE",
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
        "name": "ROYALTY_MANAGER_ROLE",
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
                "name": "ctokenId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "vtokenId",
                "type": "uint256"
            }
        ],
        "name": "attachVTokenToCToken",
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
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "internalType": "uint256[]",
                "name": "ids",
                "type": "uint256[]"
            },
            {
                "internalType": "uint256[]",
                "name": "amounts",
                "type": "uint256[]"
            }
        ],
        "name": "batchBurn",
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
                "internalType": "uint256[]",
                "name": "ids",
                "type": "uint256[]"
            },
            {
                "internalType": "uint256[]",
                "name": "amounts",
                "type": "uint256[]"
            },
            {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
            }
        ],
        "name": "batchMint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address[]",
                "name": "recipients",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "ids",
                "type": "uint256[]"
            },
            {
                "internalType": "uint256[]",
                "name": "amounts",
                "type": "uint256[]"
            }
        ],
        "name": "batchTransfer",
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
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "burn",
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
                "internalType": "uint256[]",
                "name": "ids",
                "type": "uint256[]"
            },
            {
                "internalType": "uint256[]",
                "name": "values",
                "type": "uint256[]"
            }
        ],
        "name": "burnBatch",
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
                "name": "curationNote",
                "type": "string"
            }
        ],
        "name": "curateContent",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "buyer",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
            }
        ],
        "name": "executeSale",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            }
        ],
        "name": "exists",
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
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "getContentRights",
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
        "name": "getCurationNoteForToken",
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
                "name": "ctokenId",
                "type": "uint256"
            }
        ],
        "name": "getITokenForCToken",
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
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "getTokenData",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "parentTokenId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "weight",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct CToken.TokenData",
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
                "name": "ctokenId",
                "type": "uint256"
            }
        ],
        "name": "getVTokensForCToken",
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
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
            },
            {
                "internalType": "uint256",
                "name": "itokenId",
                "type": "uint256"
            },
            {
                "internalType": "uint96",
                "name": "royaltyAmount",
                "type": "uint96"
            }
        ],
        "name": "mintWithVerification",
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
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "salePrice",
                "type": "uint256"
            }
        ],
        "name": "royaltyInfo",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
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
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "rights",
                "type": "string"
            }
        ],
        "name": "setContentRights",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "ctokenId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "itokenId",
                "type": "uint256"
            }
        ],
        "name": "setITokenForCToken",
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
                "name": "parentTokenId",
                "type": "uint256"
            }
        ],
        "name": "setParentToken",
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
                "name": "newTokenURI",
                "type": "string"
            }
        ],
        "name": "setTokenURI",
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
                "name": "weight",
                "type": "uint256"
            }
        ],
        "name": "setTokenWeight",
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
        "name": "totalSupply",
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
                "name": "id",
                "type": "uint256"
            }
        ],
        "name": "totalSupply",
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
            },
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "internalType": "uint96",
                "name": "newRoyaltyAmount",
                "type": "uint96"
            }
        ],
        "name": "updateRoyaltyInfo",
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
                "name": "newTokenURI",
                "type": "string"
            }
        ],
        "name": "updateTokenURI",
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
    }
]; // Your ABI goes here

function initializeWeb3() {
    if (typeof window.ethereum !== "undefined") {
        web3 = new Web3(window.ethereum);
        window.ethereum.on("accountsChanged", handleAccountsChanged);
        window.ethereum.on("chainChanged", handleChainChanged);
    } else {
        alert("No web3? You should consider trying MetaMask!");
        web3 = new Web3(new Web3.providers.HttpProvider("https://rpc-mumbai.maticvigil.com:80001"));
    }
}

function handleAccountsChanged(newAccounts) {
    if (newAccounts.length === 0) {
        console.log("Please connect to MetaMask.");
        updateStatusBar("Please connect to MetaMask.")
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
        accounts = await window.ethereum.request({method: "eth_requestAccounts"});
        currentAccount = accounts[0];
        console.log("Connected to MetaMask. Current Account:", currentAccount);
        displayCurrentAccount(currentAccount);
        connectToContract();
    } catch (error) {
        console.error("Error connecting to MetaMask:", error.message);
    }
}

function connectToContract() {
    contract = new web3.eth.Contract(contractABI, contractAddress);
}

document.addEventListener("DOMContentLoaded", function () {
    initializeWeb3();
    connectToMetaMask().catch(console.error);
});

function displayCurrentAccount(account) {
    const accountElement = document.getElementById("currentAccount");
    if (accountElement) {
        accountElement.textContent = "Connected Account: " + account;
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

async function mintWithVerification() {
    const to = document.getElementById("mintToAddress").value;
    const id = parseInt(document.getElementById("mintTokenId").value);
    const amount = parseInt(document.getElementById("mintAmount").value);
    const data = document.getElementById("mintData").value;
    const itoken = parseInt(document.getElementById("mintToItokenId").value);
    const royaltyAmount = parseFloat(document.getElementById("royaltyAmount").value);

    try {
        await contract.methods
            .mintWithVerification(to, id, amount, data, itoken, royaltyAmount)
            .send({from: currentAccount, gas: 300000});
        console.log("Batch mint executed successfully");
        updateStatusBar("Batch mint executed successfully")
    } catch (error) {
        console.error("Error in batch mint:", error);
    }
}

async function batchMint() {
    const to = document.getElementById("batchMintRecipients").value.split(',');
    const ids = document.getElementById("batchMintTokenIds").value.split(',').map(Number);
    const amounts = document.getElementById("batchMintAmounts").value.split(',').map(Number);
    const data = "0x"; // Placeholder

    try {
        await contract.methods
            .batchMint(to, ids, amounts, data)
            .send({from: currentAccount});
        console.log("Batch mint executed successfully");
        updateStatusBar("Batch mint executed successfully")
    } catch (error) {
        console.error("Error in batch mint:", error);
    }
}

async function burnToken() {
    const tokenId = document.getElementById("burnTokenId").value;
    const amount = document.getElementById("burnAmount").value;

    try {
        await contract.methods.burn(tokenId, amount).send({from: currentAccount, gas: 100000});
        console.log("Token burned successfully");
        updateStatusBar("Token burned successfully")
    } catch (error) {
        console.error("Error in burning token:", error);
    }
}

async function curateContent() {
    const tokenId = parseInt(document.getElementById("curationTokenId").value);
    const curationNote = document.getElementById("curationData").value;

    try {
        await contract.methods
            .curateContent(tokenId, curationNote)
            .send({from: currentAccount});
        console.log("Content curated successfully");
        updateStatusBar("Content curated successfully")
    } catch (error) {
        console.error("Error in content curation:", error);
    }
}

async function updateTokenURI() {
    const tokenId = parseInt(document.getElementById("metadataTokenId").value);
    const newTokenURI = document.getElementById("metadataURI").value;

    try {
        await contract.methods
            .setTokenURI(tokenId, newTokenURI)
            .send({from: currentAccount});
        console.log("Token URI updated successfully");
        updateStatusBar("Token URI updated successfully")
    } catch (error) {
        console.error("Error updating Token URI:", error);
    }
}

async function batchTransfer() {
    const recipients = document.getElementById("batchTransferRecipients").value.split(',');
    const ids = document.getElementById("batchTransferIds").value.split(',').map(Number);
    const amounts = document.getElementById("batchTransferAmounts").value.split(',').map(Number);

    try {
        await contract.methods
            .batchTransfer(recipients, ids, amounts)
            .send({from: currentAccount});
        console.log("Batch transfer executed successfully");
        updateStatusBar("Batch transfer executed successfully")
    } catch (error) {
        console.error("Error in batch transfer:", error);
    }
}

async function batchBurn() {
    const ids = document.getElementById("batchBurnTokenIds").value.split(',').map(Number);
    const amounts = document.getElementById("batchBurnAmounts").value.split(',').map(Number);

    try {
        await contract.methods
            .batchBurn(currentAccount, ids, amounts)
            .send({from: currentAccount});
        console.log("Batch burn executed successfully");
        updateStatusBar("Batch burn executed successfully")
    } catch (error) {
        console.error("Error in batch burn:", error);
    }
}

async function transferToken() {
    const to = document.getElementById("transferToAddress").value;
    const tokenId = document.getElementById("transferTokenId").value;
    const amount = document.getElementById("transferAmount").value;

    try {
        await contract.methods.transfer(to, tokenId, amount).send({from: currentAccount, gas: 100000});
        console.log("Token transferred successfully");
        updateStatusBar("Token transferred successfully")
    } catch (error) {
        console.error("Error in transferring token:", error);
    }
}

async function safeTransferFrom() {
    const from = currentAccount; // Assuming current account is the sender
    const to = document.getElementById("transferToAddress").value;
    const id = parseInt(document.getElementById("transferTokenId").value);
    const value = parseInt(document.getElementById("transferAmount").value);
    const data = "0x"; // Placeholder

    try {
        await contract.methods
            .safeTransferFrom(from, to, id, value, data)
            .send({from: currentAccount});
        console.log("Token safely transferred");
        updateStatusBar("Token safely transferred")
    } catch (error) {
        console.error("Error in safe transfer:", error);
    }
}

async function setContentRights() {
    const tokenId = parseInt(document.getElementById("contentRightsTokenId").value);
    const rights = document.getElementById("contentRights").value;

    try {
        await contract.methods
            .setContentRights(tokenId, rights)
            .send({from: currentAccount});
        console.log("Content rights set successfully");
        updateStatusBar("Content rights set successfully")
    } catch (error) {
        console.error("Error setting content rights:", error);
    }
}

async function updateRoyaltyInfo() {
    const tokenId = parseInt(document.getElementById("royaltyTokenId").value);
    const recipient = document.getElementById("royaltyReceiver").value;
    const newRoyaltyAmount = parseInt(document.getElementById("royaltyPercentage").value);

    try {
        await contract.methods
            .updateRoyaltyInfo(tokenId, recipient, newRoyaltyAmount)
            .send({from: currentAccount});
        console.log("Royalty info updated successfully");
        updateStatusBar("Royalty info updated successfully")
    } catch (error) {
        console.error("Error updating royalty info:", error);
    }
}

async function executeSale() {
    const buyer = document.getElementById("saleBuyerAddress").value;
    const tokenId = parseInt(document.getElementById("saleTokenId").value);
    const amount = parseInt(document.getElementById("saleAmount").value);
    const price = web3.utils.toWei(document.getElementById("salePrice").value, 'ether');

    try {
        await contract.methods
            .executeSale(buyer, tokenId, amount, price)
            .send({from: currentAccount, value: price});
        console.log("Sale executed successfully");
        updateStatusBar("Sale executed successfully")
    } catch (error) {
        console.error("Error executing sale:", error);
    }
}

async function setApprovalForAll() {
    const operator = document.getElementById("approvalOperatorAddress").value;
    const approved = document.getElementById("approvalStatus").checked; // Assuming a checkbox

    try {
        await contract.methods
            .setApprovalForAll(operator, approved)
            .send({from: currentAccount});
        console.log("Approval for all set successfully");
        updateStatusBar("Approval for all set successfully")
    } catch (error) {
        console.error("Error setting approval for all:", error);
    }
}

async function grantRole() {
    const selectedRole = document.getElementById("grantRoleSelect").value;
    const role = web3.utils.keccak256(selectedRole);
    const account = currentAccount;

    try {
        await contract.methods
            .grantRole(role, account)
            .send({from: currentAccount});
        console.log("Role granted successfully");
        updateStatusBar("Role granted successfully")
    } catch (error) {
        console.error("Error granting role:", error);
    }
}

async function revokeRole() {
    const selectedRole = document.getElementById("revokeRoleSelect").value;
    const role = web3.utils.keccak256(selectedRole);
    const account = document.getElementById("revokeRoleAccountAddress").value;

    try {
        await contract.methods
            .revokeRole(role, account)
            .send({from: currentAccount});
        console.log("Role revoked successfully");
        updateStatusBar("Role revoked successfully")
    } catch (error) {
        console.error("Error revoking role:", error);
    }
}

async function displayTokenData() {
    const tokenId = parseInt(document.getElementById("displayTokenId").value);

    try {
        const tokenData = await contract.methods
            .getTokenData(tokenId)
            .call();
        console.log("Token Data:", tokenData);
        // Update your UI with tokenData here
    } catch (error) {
        console.error("Error fetching token data:", error);
    }
}

