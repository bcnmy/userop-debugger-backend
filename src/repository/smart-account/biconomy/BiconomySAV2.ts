import { networkConfig } from "../../../config";
import { SubGraphClient } from "../../../service/subgraph";
import { SubGraphClientFactory } from "../../../service/subgraph/factory";
import { BiconomySAVersion, SmartAccountInfo, SmartAccountProvider, UserOperation } from "../../../types";
import { isDeploymentTransaction, isFirstTransaction } from "../../../utils";
import { ModuleFactory } from "../../modules/factory";
import { ISmartAccount } from "../interface";
import { Hex, decodeAbiParameters } from 'viem'

export type BiconomySAV2Config = {
    networkId: string;
}

/**
 * BiconomySAV2 is the implementation of ISmartAccount for Biconomy Smart Account V2.
 * It uses subgraph to fetch the smart account information and see if the given userOp.sender
 * belongs to Biconomy Smart Account V2.
 * It also provides methods to decode the user operation and get the smart account info.
 */
export class BiconomySAV2 implements ISmartAccount {

    client: SubGraphClient;
    version: BiconomySAVersion = BiconomySAVersion.v2;
    networkId: string;

    constructor(config: BiconomySAV2Config) {
        this.networkId = config.networkId;
        this.client = SubGraphClientFactory.createClient(this._getSubGraphUri());
    }
    
    async canHandleUserOp(userOp: UserOperation): Promise<boolean> {
        try {
            const result = await this._fetchAccountInfo(userOp.sender);
            return result.length > 0;
        } catch (error) {
            console.debug("Error in canHandleUserOp:", error);
            return false;
        }
    }

    async getSmartAccountInfo(userOp: UserOperation): Promise<SmartAccountInfo> {
        let smartAccountInfo: SmartAccountInfo = {
            provider: SmartAccountProvider.BICONOMY,
            erc7579Compatible: false,
            version: this.version.toString(),
            smartAccountAddress: userOp.sender,
            firstTransaction: isFirstTransaction(userOp),
            deploymentTransaction: isDeploymentTransaction(userOp),
        };

        // Extract factory address from init code given if initCode is not 0x, first 20 bytes of initCode is factory address
        if(smartAccountInfo.firstTransaction) {
            smartAccountInfo.factoryAddress = userOp.initCode.slice(0, 42);
        }

        let accountInfo = await this._getAccountInfoFromSubGraph(userOp);
        if(accountInfo.initialAuthModule) {
            // Get the moudle implementation from MoudleFactory
            let module = ModuleFactory.getModule(this.networkId, accountInfo.initialAuthModule.toLowerCase());
            smartAccountInfo.moduleUsedInDeployment = await module?.getModuleInfo(userOp);
            console.log("Auth Module during deployment found with name:", module?.getName());
        }
        let validationModuleAddress = await this._getValidationModuleAddress(userOp);
        if(validationModuleAddress) {
            let module = ModuleFactory.getModule(this.networkId, validationModuleAddress.toLowerCase());
            smartAccountInfo.moduleUsedInValidation = await module?.getModuleInfo(userOp);
            console.log("Validation Module found with name:", module?.getName());
        }
        return smartAccountInfo;
    }

    // Private Methods

    private async _getValidationModuleAddress(userOp: UserOperation): Promise<string | null> {
        try {
            if (!userOp.signature || userOp.signature === '0x') {
                throw new Error('No signature found in UserOperation');
            }

            // Assuming the signature format is [bytes, address] as in Solidity
            const decoded = decodeAbiParameters(
                [
                    { name: 'signature', type: 'bytes' },
                    { name: 'validationModule', type: 'address' }
                ],
                userOp.signature as Hex
            );
            return decoded[1];
        } catch (error) {
            console.debug("Error in getValidationModuleAddress:", error);
            return null;
        }
    }

    private _getSubGraphUri(): string {
        return networkConfig[this.networkId].BICONOMY[this.version].subgraphUri;
    }

    private async _getAccountInfoFromSubGraph(userOp: UserOperation): Promise<any> {
        try {
            const result = await this._fetchAccountInfo(userOp.sender);
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            console.debug("Error in getAccountInfo:", error);
            return null;
        }
    }

    private async _fetchAccountInfo(sender: string): Promise<any[]> {
        const query = this._getSmartAccountSubgraphQuery(sender);
        const result = await this.client.query(query);
        return result.data.accountCreations;
    }

    private _getSmartAccountSubgraphQuery(sender: string) : string {
        return `{
            accountCreations(where: {account:"${sender}"}) {
                id
                account
                initialAuthModule
                index
            }
        }`;
    }
}