import { UserOperation } from "../types"

export class RecommendationController {
    private userOperation!: UserOperation

    set userOp(userOp: UserOperation) {
        this.userOperation = userOp
    }

    get userOp() {
        return this.userOperation
    }
}