# Adding a New Paymaster Provider

To integrate a new Paymaster Provider to the project, follow these steps:

## Step 1: Add New Types

1. **Update the PaymasterProvider Enum:**
   - Navigate to the `src/types/paymaster.ts` file.
   - Add your new provider's name to the `PaymasterProvider` enum.
   - Example:
     ```typescript
     export enum PaymasterProvider {
       // Existing providers...
       YOUR_PROVIDER_NAME = "YOUR_PROVIDER_NAME",
     }
     ```

## Step 2: Modify Supported Providers in Configuration

1. **Update Network Configuration:**
   - Go to the `src/config/index.ts` file.
   - Modify the `networkConfig` variable.
   - Add your new enum to the `paymasterProvider` field for each network that will support this new provider.
   - Example:
     ```typescript
     const networkConfig = {
       // Existing network configurations...
       'networkId': {
         // Other settings...
         paymasterProvider: [
           // Existing providers...
           PaymasterProvider.YOUR_PROVIDER_NAME,
         ],
       },
     };
     ```

_More steps to add a new Paymaster Provider will be added soon._
