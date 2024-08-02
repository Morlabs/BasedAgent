# Bounty ID 8 - Update Reviewer Signup Process to Include Wallet Connection

## Overview

### Bounty Title
Update Reviewer Signup Process to Include Wallet Connection

### Bounty Description
Enhance the reviewer signup process by adding the ability to connect their cryptocurrency wallet. Connecting their wallet proves ownership and enables the system to ensure the contributor signs the BasedAgent terms. In addition, the associated wallet shall also be used for the purpose of assigning weights to the contributor . The implementation should be similar to the wallet connection process used by [Mor Software](https://www.mor.software/).

### Objectives
- Update the reviewer signup process to include a wallet connection step.
- Ensure the system can verify ownership of the connected wallet.
- Ensure the system requires the user sign a transaction to agree to the BasedAgent terms. 
- Implement support for the same wallets as [Mor Software](mor.software).

### Acceptance Criteria
- **Wallet Connection**:
  - Add a wallet connection step to the reviewer signup process.
  - Support various wallet types as implemented by Mor Software.
  - Verify the ownership of the connected wallet.
- **Weight Allocation**:
  - The connected wallet for allocating weights to the reviewer.
- **User Experience**:
  - Ensure a seamless and user-friendly experience during the signup process.
  - Maintain consistency with the existing design and user interface.

## Deliverables
- An updated reviewer signup process that includes wallet connection.
- Source code repository (GitHub) with clear instructions on how to deploy the updated signup process.
- Documentation outlining the wallet connection process, supported wallets, and weight allocation methodology.
- A demo URL where the updated signup process can be tested.

## Technical Requirements
- **Frontend**: React
- **Backend**: Node.js
- **Database**: PostgreSQL
- **Wallet Integration**: Support for various cryptocurrency wallets (e.g., MetaMask, WalletConnect) as used by Mor Software

## Dependencies
- **Wallet Connection Libraries**: Integrate libraries such as `web3.js`, `ethers.js`, or WalletConnect to facilitate wallet connections.
