import { config } from "dotenv";
import { resolve } from "path";
import { NetworkConfig } from "../types";
config({ path: resolve(__dirname, "../../.env") });

export const SERVER_PORT = Number(process.env.PORT) || 8000;
export const BASE_URL = process.env.BASE_URL
export const EntryPointV6Address = "0x5ff137d4b0fdcd49dca30c7cf57e578a026d2789";

export const supportedNetworks: number[] = process.env.SUPPORTED_NETWORKS ? JSON.parse(process.env.SUPPORTED_NETWORKS) : [137];
export const networkConfig: NetworkConfig = {
    "137" : {
        entryPointV6: EntryPointV6Address.toLowerCase(),
        nativeSymbol: "Matic"
    }
}
