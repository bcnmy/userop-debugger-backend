# Adding a New Smart Account Provider

To integrate a new Smart Account Provider to the project, follow these steps:

## Step 1: Add New Types

1. **Update the SmartAccountProvider Enum:**
   - Navigate to the `src/types/smartAccount.ts` file.
   - Add your new provider's name to the `SmartAccountProvider` enum.
   - Example:
     ```typescript
     enum SmartAccountProvider {
       // Existing providers...
       YOUR_PROVIDER_NAME,
     }
     ```

## Step 2: Modify Supported Providers in Configuration

1. **Update Network Configuration:**
   - Go to the `src/config/index.ts` file.
   - Modify the `networkConfig` variable.
   - Add your new enum to the `supportedSAProviders` field for each network that will support this new provider.
   - Example:
     ```typescript
     const networkConfig = {
       // Existing network configurations...
       'networkId': {
         // Other settings...
         supportedSAProviders: [
           // Existing providers...
           SmartAccountProvider.YOUR_PROVIDER_NAME,
         ],
       },
     };
     ```

## Step 3: Add Provider Files

1. **Create Provider Implementation:**
   - Navigate to the `src/service/smartAccountDecoder/providers` folder.
   - Add a new file for your provider with the naming convention `[PROVIDER]SADecoder.ts`.
     - For example, if your provider name is `Foo`, the file name should be `FooSADecoder.ts`.
   - Implement the `ISmartAccountDecoder.ts` interface in your new file.
   - Add your logic according to the methods defined in the interface.

_More steps to add a new Paymaster Provider will be added soon._
