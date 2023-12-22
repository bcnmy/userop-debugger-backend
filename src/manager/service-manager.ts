import { supportedNetworks } from "../config";
import { PaymasterDecoderService } from "../service/paymasterDecoder";
import { SmartAccountDecoderService } from "../service/smartAccountDecoder";
import { UserOpDecoderService } from "../service/userOpDecoder";
import { IUserOpDecoder } from "../service/userOpDecoder/interface/IUserOpDecoder";

const userOpDecoderMap = new Map<string, IUserOpDecoder>();

supportedNetworks.forEach((id: number) => {
    let networkId = id.toString();

    let smartAccountDecoder = new SmartAccountDecoderService({ networkId });
    let paymasterDecoder = new PaymasterDecoderService({ networkId });
    userOpDecoderMap.set(networkId, new UserOpDecoderService({
        networkId,
        smartAccountDecoder,
        paymasterDecoder
    }));
});

export function getUserOpDecoderService(networkId: string): IUserOpDecoder | undefined {
    return userOpDecoderMap.get(networkId);
}