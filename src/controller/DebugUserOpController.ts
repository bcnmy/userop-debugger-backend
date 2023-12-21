import { UserOpDecoderService } from "../service/userOpDecoder";
import { IUserOpDecoder } from "../service/userOpDecoder/interface/IUserOpDecoder";
import { JsonRpcError } from "../types";
import { IJsonRpcController } from "./interface/IJsonRpcController";

let userOpDecoderService = new UserOpDecoderService();

class DebugUserOpController implements IJsonRpcController {

    userOpDecoderSerice: IUserOpDecoder;

    constructor(userOpDecoderSerice: IUserOpDecoder) {
        this.userOpDecoderSerice = userOpDecoderSerice;
    }
    
    async handleParams(params: any[]) {
        console.log("Handling debugUserOp params")
        let userOperation = params[0];
        let entryPointAddress = params[1] as string; // Assuming the second param is the entry point address
        let errorObject = params[2] as JsonRpcError; // Assuming the third param is the error object
        console.log(userOperation);
        console.log(entryPointAddress);
        console.log(errorObject);
        
        // let decodedUserOp = await this.userOpDecoderSerice.decodeUserOp(userOperation);
        // Call respective service files here like userOpDecoder, errorDecoder and recommendation service
        return "OK";
    }
}

export default new DebugUserOpController(userOpDecoderService);