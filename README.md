# UserOp Debugger Backend

## Overview
This project, `userop-debugger-backend`, is designed to handle operations related to user operations and error decoding. It's built on Node.js and utilizes various dependencies for efficient backend management.

## Getting Started
To get started with this project, follow these steps:

### Prerequisites
- Node.js installed on your machine.
- Yarn package manager (optional but recommended).

### Installation
1. Clone the repository to your local machine.
```
git clone https://github.com/bcnmy/userop-debugger-backend.git
```
2. Navigate to the cloned repository.
```
cd userop-debugger-backend
```
3. Install the dependencies.
```
yarn install
```

### Add Environment Variables
- Create a `.env` file in the root directory of the project.
- Add the following environment variables to the file:
```
BICONOMY_SA_V2_SUBGRAPH_URL = https://api.thegraph.com/subgraphs/name/shantanu-bico/sa-v2-factory-polygon
SUPPORTED_NETWORKS = ["137"]
```

### Running the Project
- To build the project, run:
```
yarn build
```

- To start the project in development mode, use:
```
yarn start:dev
```

## Usage
The application starts a server that listens for requests. You can interact with it using the provided API endpoints.

### Example API Request
**Endpoint:** `http://localhost:8000/api/v1/137`

**Request:**
```
{
	"jsonrpc": "2.0",
	"id": 2,
	"method": "eth_debugUserOperation",
	"params": [
		{
			"sender": "0x17025319319825a8891300040b7a280371172a10",
			"nonce": "0",
			"initCode": "0x000000a56aaca3e9a4c479ea6b6cd0dbcb6634f5df20ffbc0000000000000000000000000000001c5b32f37f5bea87bdd5374eb2ac54ea8e0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000242ede3bc00000000000000000000000003f7c8638b42e30a5da153fb32379df4658ce798b00000000000000000000000000000000000000000000000000000000",
			"callData": "0x00004680000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000016000000000000000000000000000000000000000000000000000000000000000030000000000000000000000001758f42af7026fbbb559dc60ece0de3ef81f665e0000000000000000000000001758f42af7026fbbb559dc60ece0de3ef81f665e0000000000000000000000001758f42af7026fbbb559dc60ece0de3ef81f665e00000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000002440d097c300000000000000000000000089e1340159928d17eb324d2ce6b77023eb0a6eb400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002440d097c300000000000000000000000089e1340159928d17eb324d2ce6b77023eb0a6eb400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002440d097c300000000000000000000000089e1340159928d17eb324d2ce6b77023eb0a6eb400000000000000000000000000000000000000000000000000000000",
			"callGasLimit": "25864",
			"verificationGasLimit": "398476",
			"preVerificationGas": "50392",
			"maxFeePerGas": "2850000000",
			"maxPriorityFeePerGas": "1900000000",
			"paymasterAndData": "0x",
			"signature": "0x00000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000001c5b32f37f5bea87bdd5374eb2ac54ea8e0000000000000000000000000000000000000000000000000000000000000041e35f5453f6241299c7b4aac7772513fabe4e8239fcc49ec410db9722cd0f543d23aa7e9c3ad710216ba95c59d9c308f6711691567aae65fe0741f9dd7dc0a93c1b00000000000000000000000000000000000000000000000000000000000000"
		},
		"0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
		{
			"code": -325432,
			"message": "AA21: User didn't pay prefund"
		}
	]
}
```
### Example API Response
```
{
	"jsonrpc": "2.0",
	"id": 2,
	"result": {
		"originalError": {
			"code": -325432,
			"message": "AA21: User didn't pay prefund"
		},
		"decodedErrors": [
			{
				"message": "Smart Account is supposed to pay for this userOp but it does not have enough native balance to pay for the gas.\n            Max 0.0036242994 Matic is required to pay for the gas.}",
				"errorSource": "SMART_ACCOUNT"
			}
		],
		"additionalInfo": {
			"entryPointAddress": "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
			"userOpDetails": {
				"maxTransactionFee": "0.0036242994 Matic",
				"gasPaidBy": "SMART_ACCOUNT",
				"smartAccount": {
					"provider": "BICONOMY",
					"erc7579Compatible": false,
					"version": "v2",
					"smartAccountAddress": "0x17025319319825a8891300040b7a280371172a10",
					"firstTransaction": true,
					"deploymentTransaction": true,
					"factoryAddress": "0x000000a56aaca3e9a4c479ea6b6cd0dbcb6634f5",
					"moduleUsedInDeployment": {
						"moduleAddress": "0x0000001c5b32f37f5bea87bdd5374eb2ac54ea8e",
						"provider": "BICONOMY",
						"name": "EcdsaOwnershipModule",
						"type": "VALIDATION",
						"erc7579Compatible": false
					},
					"moduleUsedInValidation": {
						"moduleAddress": "0x0000001c5b32f37f5bea87bdd5374eb2ac54ea8e",
						"provider": "BICONOMY",
						"name": "EcdsaOwnershipModule",
						"type": "VALIDATION",
						"erc7579Compatible": false
					}
				},
				"intent": {
					"executionType": "BATCH",
					"targetContracts": [
						{
							"address": "0x1758f42Af7026fBbB559Dc60EcE0De3ef81f665e",
							"value": "0",
							"callData": "0x40d097c300000000000000000000000089e1340159928d17eb324d2ce6b77023eb0a6eb4",
							"name": "",
							"action": {}
						},
						{
							"address": "0x1758f42Af7026fBbB559Dc60EcE0De3ef81f665e",
							"value": "0",
							"callData": "0x40d097c300000000000000000000000089e1340159928d17eb324d2ce6b77023eb0a6eb4",
							"name": "",
							"action": {}
						},
						{
							"address": "0x1758f42Af7026fBbB559Dc60EcE0De3ef81f665e",
							"value": "0",
							"callData": "0x40d097c300000000000000000000000089e1340159928d17eb324d2ce6b77023eb0a6eb4",
							"name": "",
							"action": {}
						}
					]
				}
			}
		}
	}
}
```

## License
This project is licensed under the MIT License - see the LICENSE file for details.