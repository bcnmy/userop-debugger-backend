import { Hex, decodeAbiParameters, encodeAbiParameters, keccak256, parseAbiParameters, recoverMessageAddress } from "viem";
import { ErrorSource, PaymasterInfo, PaymasterInfoExtended, PaymasterProvider, PaymasterType, UserOperation } from "../../../types";
import { IPaymaster, PaymasterInfoParams } from "../interface";
import { EntryPointFactory } from "../../entryPoint/factory";
import { IEntryPointService } from "../../entryPoint/interface/IEntryPointService";

export class BiconomySponsorshipPaymasterV1_1_0 implements IPaymaster {

    verifyingSigner: string = "0xc6dab8652e5e9749523ba948f42d5944584e4e73";
    name: string;
    address: string;
    type: PaymasterType;
    provider: PaymasterProvider;
    entryPointAddress: string;
    entryPointService: IEntryPointService;
    version: string;

    constructor(config: PaymasterInfoExtended) {
        this.name = config.name;
        this.address = config.paymasterAddress;
        this.type = config.type;
        this.provider = config.provider;
        this.entryPointAddress = config.entryPointAddress;
        this.entryPointService = EntryPointFactory.getEntryPointService(this.entryPointAddress);
        this.version = config.version;
    }

    async canHandleUserOp(userOp: UserOperation): Promise<boolean> {
        try {
            let paymasterAddressFromUserOp = this.entryPointService.getPaymasterAddress(userOp);
            if (paymasterAddressFromUserOp === this.address) {
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error in canHandleUserOp:", error);
            return false; // or handle error as appropriate for your system
        }
    }

    async getPaymasterInfo(param: PaymasterInfoParams): Promise<PaymasterInfo> {
        let { networkId: _networkId, userOp: _userOp } = param;
        let paymasterInfo: PaymasterInfo = {
            name: this.name,
            provider: this.provider,
            paymasterAddress: this.entryPointService.getPaymasterAddress(_userOp),
            type: this.type,
            version: this.version
        };

        // Extract more data from paymasterAndData as per Biconomy Sponsorship Paymaster v1.1.0
        if (_userOp.paymasterAndData) {
            const decoded = decodeAbiParameters(
                [
                    { name: 'paymasterId', type: 'address' },
                    { name: 'validUntil', type: 'uint48' },
                    { name: 'validAfter', type: 'uint48' },
                    { name: 'signature', type: 'bytes' },
                ],
                this.entryPointService.getPaymasterData(_userOp) as Hex
            );
            
            let hash = this._getHash(_userOp, _networkId, decoded[0], decoded[2], decoded[1]);
            const recoveredSigner = await this.recoverSigner(hash, decoded[3]);
            const isSignerCorrect = (this.verifyingSigner.toLowerCase() === recoveredSigner.toLowerCase());
            if(!isSignerCorrect) {
                paymasterInfo.error = {
                    errorSource: ErrorSource.PAYMASTER,
                    message: `Invalid signature for paymasterAndData provided. UserOp that was signed by payamster service was not the same as the one provided in the transaction.`,
                    suggestions: [
                        `Ensure you have updated the gas fields in the UserOp (verificationGasLimit, callGasLimit, preVerificationGasLimit) also as returned by the paymaster service.`,
                    ]
                }
            }
            paymasterInfo = {
                ...paymasterInfo,
                moreInfo: {
                    paymasterId: decoded[0],
                    validUntil: decoded[1],
                    validAfter: decoded[2],
                    signature: decoded[3],
                    verifyingSigner: recoveredSigner,
                    isSignerCorrect,
                }
            };

        }
        return paymasterInfo;
    }

    async recoverSigner(hash: Hex, signature: Hex): Promise<string> {
        return recoverMessageAddress({
            message: {raw: hash},
            signature: signature
          })
    }

    _getHash(userOp: UserOperation, networkId: string, paymasterId: string, validAfter: number, validUntil: number): Hex {
        const sender = userOp.sender as Hex;
        const chainId = networkId;
        const contractAddress = this.address;

        return keccak256(encodeAbiParameters(
            parseAbiParameters(
                "address, uint256, bytes32, bytes32, uint256, uint256, uint256, uint256, uint256, uint256, address, address, uint48, uint48"
            ),
            [
                sender, 
                BigInt(userOp.nonce), 
                keccak256(userOp.initCode as Hex),
                keccak256(userOp.callData as Hex),
                BigInt(userOp.callGasLimit),
                BigInt(userOp.verificationGasLimit),
                BigInt(userOp.preVerificationGas),
                BigInt(userOp.maxFeePerGas),
                BigInt(userOp.maxPriorityFeePerGas),
                BigInt(chainId),
                contractAddress as Hex,
                paymasterId as Hex,
                validUntil,
                validAfter
            ]
        ));
    }
}