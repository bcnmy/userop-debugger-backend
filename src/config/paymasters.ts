import { EntryPointV6Address } from ".";
import { PaymasterConfig, PaymasterProvider, PaymasterType } from "../types";

export const paymasterConfig: PaymasterConfig = {
    "0x00000f79b7faf42eebadba19acc07cd08af44789": {
        paymasterAddress: "0x00000f79b7faf42eebadba19acc07cd08af44789",
        provider: PaymasterProvider.BICONOMY,
        type: PaymasterType.SPONSORSHIP_PAYMASTER,
        name: "Biconomy Sponsorship Paymaster v1.1.0",
        entryPointAddress: EntryPointV6Address.toLowerCase(),
    }
}