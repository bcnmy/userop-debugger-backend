import { EntryPointV6Address } from ".";
import { PaymasterConfig, PaymasterProvider, PaymasterType } from "../types";

export const paymasterConfig: PaymasterConfig = {
    "0x00000f79b7faf42eebadba19acc07cd08af44789": {
        paymasterAddress: "0x00000f79b7faf42eebadba19acc07cd08af44789",
        provider: PaymasterProvider.BICONOMY,
        type: PaymasterType.SPONSORSHIP_PAYMASTER,
        name: "Biconomy Sponsorship Paymaster",
        entryPointAddress: EntryPointV6Address.toLowerCase(),
        version: "1.1.0",
    },
    "0x000031dd6d9d3a133e663660b959162870d755d4": {
        paymasterAddress: "0x000031dd6d9d3a133e663660b959162870d755d4",
        provider: PaymasterProvider.BICONOMY,
        type: PaymasterType.SPONSORSHIP_PAYMASTER,
        name: "Biconomy Sponsorship Paymaster",
        entryPointAddress: EntryPointV6Address.toLowerCase(),
        version: "1.0.0",
    },
    "0x00000f7365ca6c59a2c93719ad53d567ed49c14c": {
        paymasterAddress: "0x00000f7365ca6c59a2c93719ad53d567ed49c14c",
        provider: PaymasterProvider.BICONOMY,
        type: PaymasterType.ERC20_TOKEN_PAYMASTER,
        name: "Biconomy Token Paymaster",
        entryPointAddress: EntryPointV6Address.toLowerCase(),
        version: "1.0.0",
    },
}