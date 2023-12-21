import { UserOperation, DecodedUserOp } from "../../types";
import { IUserOpDecoder } from "./interface/IUserOpDecoder";

export class UserOpDecoderService implements IUserOpDecoder {
    
    async decodeUserOp(userOp: UserOperation): Promise<DecodedUserOp> {
        console.log("Decoding user operation", userOp);
        // Use SmartAccountDecoder and Paymaster Decoder instances to decodeUserOp
        throw new Error("Method not implemented.");
    }
    
}