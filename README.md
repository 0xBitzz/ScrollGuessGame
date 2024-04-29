# ScrollGuessGame
## Overview

This project contains a Solidity smart contract named ScrollGuessGame deployed on the [Scroll Sepolia network](https://sepolia.scrollscan.com//address/0x780A53e13dcda56DEBce245E60645a8e59CDA993#code). ScrollGuessGame is a simple game contract where players can guess a number between 1 and 10. If their guess matches a randomly generated number, they win double the amount they bet. Otherwise, their bet is credited to the contract.

## Features

Betting: Players can bet a fixed amount of 0.01 Ether on a number between 1 and 10.

Reward: If the player's guess matches the randomly generated number, they receive double the bet amount.

## Getting Started

To interact with the ScrollGuessGame contract:
- Visit [Scroll Guess Game](https://scroll-guess-game.vercel.app/)
- Connect your EVM-compatible wallet.
- Switch to the Scroll Sepolia network.
- Interact with the contract.

## Contract Details

- Contract Address: 0x780A53e13dcda56DEBce245E60645a8e59CDA993


## Usage
- Placing a Bet

  Send exactly 0.01 Ether to the contract address.
  Call the placeBet(uint256 _guess) function with your guess as a parameter (1 to 10).

- Claiming a Reward

    Wait for the random number to be revealed.
    If your guess matches the random number, call the claimReward() function to claim your reward.
