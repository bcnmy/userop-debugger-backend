import { EntryPointV6 } from "../EntryPointV6";
import { IEntryPointService } from "../interface/IEntryPointService";
import { EntryPointV6Address } from "../../../config";

export class EntryPointFactory {
    
    private static entryPointMap: {[key: string]: IEntryPointService};

    static {
        EntryPointFactory.entryPointMap = {
            [EntryPointV6Address]: new EntryPointV6()
        }
    }

    public static getEntryPointService(entryPointAddress: string): IEntryPointService {
        return EntryPointFactory.entryPointMap[entryPointAddress?.toLowerCase()];
    }
}