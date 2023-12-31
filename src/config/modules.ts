import { ModuleConfig, ModuleProvider, ModuleType } from "../types";

export const moduleConfig: ModuleConfig = {
    "0x0000001c5b32f37f5bea87bdd5374eb2ac54ea8e": {
        moduleAddress: "0x0000001c5b32f37f5bea87bdd5374eb2ac54ea8e",
        name: "EcdsaOwnershipModule",
        type: ModuleType.VALIDATION,
        erc7579Compatible: false,
        provider: ModuleProvider.BICONOMY,
    }
}