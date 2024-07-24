# BAAG Rewards Claim Guide

## Table of contents
1) [**Smart Contract Addresses**](#smart-contract-addresses)
2) [**Get information about MOR rewards**](#how-much-mor-have-i-earned-as-rewards)
3) [**Claim MOR rewards**](#how-to-claim-rewards)
4) [**Get MOR on Arbitrum chain**](#how-to-verify-that-i-have-received-tokens)
5) [**Add MOR to Metamask**](#add-mor-to-metamask)

---

## Introduction
This guide will walk you through the process of claiming BAAG rewards on the Ethereum chain and obtaining them on the Arbitrum chain. The Metamask wallet is used as a reference in this guide, but the logic remains the same for other Web3 wallets.

---

## Smart Contract Addresses
**Ethereum:**  
Distribution contract: [**insert**](insert)

**Arbitrum:**  
BAAG Token: [**insert**](insert)

---

## How much MOR have I earned as rewards?
You need to go to the [Distribution](insert) contract, open the **"Contract"** tab, then the **"Read as Proxy"** tab.  

Don't forget to connect your wallet by clicking on the **"Connect to Web3"** button.

The rewards are earned every block and to check the amount, you need to call the `2.getCurrentUserReward` function and input parameters:
- `poolId_ (uint256)`: pool identifier; enter `0` for capital providers pool or `1` for code providers pool;
- `user_ (address)`: user wallet address.
  
Click "**Query**"  

As a result, you will find out how many unclaimed rewards there are at the moment.  
Amount is in WEI and you can use this unit converter calculator https://eth-converter.com.

<img src="/Graphics/Docs%20Graphics/English/MOR%20Claim%20Test%20Guide/rewards.png" width=55% height=55%>

---

## How to claim rewards?
You need to go to the [Distribution](insert) contract, open the **"Contract"** tab, then the **"Write as Proxy"** tab.  

Don't forget to connect your wallet by clicking on the **"Connect to Web3"** button. Make sure your wallet has enough ETH to cover gas fees.

Find and call the `claim()` function and input the following parameters:
- `claim`: **0.001** - this is the amount of ETH that you will send with the transaction to pay for mint on the destination network. Any excess will be returned to you;
- `poolId_`: pool identifier; enter `0` for capital providers pool or `1` for code providers pool;
- `receiver_(address)`: Input the address that will receive the minted MOR tokens. 

> [!WARNING]  
> **Ensure the address is correct, as this action is irreversible.**

Click **"Write"** and confirm the transaction.  

<img src="/Graphics/Docs%20Graphics/English/MOR%20Claim%20Test%20Guide/claim.png" width=55% height=55%>

>[!NOTE]
> **After your Ethereum transaction is confirmed, it may take up to 15 minutes for MOR to appear in your wallet on the Arbitrum chain.**
>
> **This function claims the whole available balance, you can not claim in parts.**

---

## How to verify that I have received tokens?
Switch your wallet to the Arbitrum chain. If the Arbitrum chain is not added yet, use [ChainList](https://chainlist.org/?search=Arbitrum) and click **"Add to Metamask".**

Go to [BAAG](insert) token contract. Open the **"Contract**" tab, then the **"Read Contract"** tab. 

It is necessary to call the function `6. balanceOf()` and specify in the `account (address)` field your wallet address. 

Click "**Query**"

As a result, you will find out how many BAAG tokens are in the wallet, reflected in WEI.  
To convert WEI you can use this tool https://eth-converter.com.

<img src="/Graphics/Docs%20Graphics/English/MOR%20Claim%20Test%20Guide/mor%20balance.png" width=55% height=55%>

---

## Add BAAG to Metamask
To add BAAG token to your Metamask wallet token list, you need to follow steps from the [guide](https://support.metamask.io/managing-my-tokens/custom-tokens/how-to-display-tokens-in-metamask/#how-to-add-a-custom-token) and add BAAG smart contract address: `insert`.

<img src="/Graphics/Docs%20Graphics/English/MOR%20Claim%20Test%20Guide/import%20MOR.png" width=45% height=45%>
  
---

> [!TIP]  
> **In case you face difficulties, find something unclear, or have questions, you can get assistance in the** [**Based Agent Discord server**](https://discord.gg/m2Qud5GDqp).
>
> **Information on how to deposit or withdraw stETH through the Smart Contract is in this** [**guide**](insert).

## Beware of scams, Based Agent has no tech support team, no support tickets and will not commence any airdrops. Anyone who message you with proposal to help is likely a scammer.
