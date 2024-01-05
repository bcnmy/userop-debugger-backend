# Adding a New Smart Account Provider

To integrate a new Smart Account Provider to the project, follow these steps:

## 1. Add New Provider Name
- Add a new Smart Account provider name in [src/types/smartAccount.ts](https://github.com/bcnmy/userop-debugger-backend/blob/main/src/types/smartAccount.ts#L35) file under `enum SmartAccountProvider`.
- Optionally, you can define your version enum as well in this file to track different versions of your smart account.

## 2. Create Provider Folder
- In [src/repository/smart-account](https://github.com/bcnmy/userop-debugger-backend/tree/main/src/repository/smart-account) folder, create a new folder for the new provider.
  - For example, if the new smart account provider name is `foo`, create a folder named `foo`.

## 3. Add Provider Smart Account Class
- Add a new file named `fooV1.ts` in the folder created in step 2, if the version of your smart account is v1.
- This file should export a class that implements `ISmartAccount` interface located in [src/repository/smart-account/interface/index.ts](https://github.com/bcnmy/userop-debugger-backend/blob/main/src/repository/smart-account/interface/index.ts) file.

## 4. Update SmartAccount Factory Class
- Go to [src/repository/smart-account/factory/index.ts](https://github.com/bcnmy/userop-debugger-backend/blob/main/src/repository/smart-account/factory/index.ts) file.
- In the static block, update the `smartAccountNetworkMap` variable to create the new instance of your smart account provider class created in step 3 for a given `networkId` and version.

  **Code snippet:**
  ```javascript
  supportedNetworks.forEach((networkId) => {
      // If a different implementation is needed for a network, this can be handled here
      this.smartAccountNetworkMap[networkId] = {
          [SmartAccountProvider.BICONOMY]: {
              [BiconomySAVersion.v2]: () => new BiconomySAV2({ networkId }),
              // Add other versions here
          },
          // ADD YOUR NEW PROVIDER SMART ACCOUNT CLASS INSTANCE HERE
      };
  });
  ```
   
## 5. Add Smart Account Decoder and Resolver Classes
- Go to the [src/service/smartAccountDecoder/providers](https://github.com/bcnmy/userop-debugger-backend/tree/main/src/service/smartAccountDecoder/providers/) folder.
- Create a folder with your provider's name and create two classes, one resolver class and one decoder class.
  - If your provider's name is `foo`, the file names should be `FooResolver.ts` and `FooSADecoder.ts`.
### Create Resolver
- In your resolver class, export a class that implements the `ISmartAccountResolver` interface located in the [src/service/smartAccountDecoder/interface](https://github.com/bcnmy/userop-debugger-backend/tree/main/src/service/smartAccountDecoder/interface) folder.
  - This resolver class's `resolve` method should return an instance of your decoder class if the given `userOp` belongs to your provider.
### Create Decoder
- In your decoder class, export a class that implements the `ISmartAccountDecoder` interface located in the [src/service/smartAccountDecoder/interface](https://github.com/bcnmy/userop-debugger-backend/tree/main/src/service/smartAccountDecoder/interface) folder.
  - In the `decodeSmartAccount` and `decodeIntent` methods, you can define your logic to decode the `UserOp` and `Intent` respectively.
> **Note**: Usually, you should keep the decoding logic in your SA implementation class defined in the repository folder and delegate the decoding logic to that. Check the existing implementations for reference.

## 6. Register Your Resolver Class
- Go to the [src/manager/service-manager.ts](https://github.com/bcnmy/userop-debugger-backend/blob/main/src/manager/service-manager.ts) file.
- Create an instance of your resolver class and update the `smartAccountResolverMap` variable.

  **Example code**:
  ```javascript
  // Add Biconomy Resolver for Biconomy SA v2
  smartAccountResolverMap.get(networkId)?.push(new BiconomyResolver({
      networkId,
      version: BiconomySAVersion.v2
  }));
  ```
## Update Config
- Go to the [src/config/network.ts](https://github.com/bcnmy/userop-debugger-backend/blob/main/src/config/network.ts) file.
- Add your provider to the `supportedSAProviders` field in the `networkConfig` constant against each supported network.

  **Example code:**
  ```javascript
  export const networkConfig: NetworkConfig = {
      "137": {
          entryPointV6: EntryPointV6Address.toLowerCase(),
          nativeSymbol: "Matic",
          supportedSAProviders: [SmartAccountProvider.BICONOMY, /* ADD YOUR PROVIDER HERE */],
          // ...
      }
      // ...
  }
  ```

- Add your provider-specific configuration also in the networkConfig variable. This configuration is to be consumed by your SA implementation class.

  **Example code:**
  ```javascript
   export const networkConfig: NetworkConfig = {
       "137": {
           .... other fields ...
           [SmartAccountProvider.BICONOMY]: {
               [BiconomySAVersion.v2]: {
                   subgraphUri: process.env.BICONOMY_SA_V2_SUBGRAPH_URL || "",
                   humanReadableABI: [
                       'function execute(address dest, uint256 value, bytes calldata func)',
                       'function executeBatch(address[] calldata dest, uint256[] calldata value, bytes[] calldata func)',
                       'function execute_ncC(address dest, uint256 value, bytes calldata func)',
                       'function executeBatch_y6U(address[] calldata dest, uint256[] calldata value, bytes[] calldata func)',
                   ]
               }
           }
           .... other fields ...
       }
   }
  ```
