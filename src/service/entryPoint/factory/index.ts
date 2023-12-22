import { EntryPointV6 } from "../EntryPointV6";
import { IEntryPointService } from "../interface/IEntryPointService";
import { EntryPointV6Address } from "../../../config";

const entryPointMap: {[key: string]: IEntryPointService} = {
    [EntryPointV6Address]: new EntryPointV6()
}

export class EntryPointFactory {
    public static getEntryPointService(entryPointAddress: string): IEntryPointService {
        return entryPointMap[entryPointAddress?.toLowerCase()];
    }
}