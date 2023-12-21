
import { IUserOpController } from "../interfaces/IUserOpController";
import { UserOperation, DecodedUserOp } from "../types";

export class BiconomyProvider implements IUserOpController<any> {
    decodeUserOp(userOp: UserOperation): DecodedUserOp {
        this.validateRequest(userOp);
        throw new Error("Method not implemented.");
    }

    private async validateRequest(userOp: UserOperation): Promise<boolean> {
        userOp;
        // const requestParams = classToPlain(request);
        // const errors = await validate(requestParams);
        return true;
    }
}