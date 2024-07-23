# Code Contributor Guide To Earning Weights & Their Implied Value for BasedAgent

## TL;DR

The emissions for Code Contributors are calculated based on "weights". An individual's allocation is equal to their weights divided by the total number of weights, multiplied by the daily BAAG emissions. BasedAgent is a marketplace for Code. Coders compete to provide high-quality code at the best price, and then maintain that code and their weight in the Code Contributors' rewards.

## Introduction

The weights system encourages participation by clarifying the process, setting clear expectations, rewarding past contributions, and explaining how to maintain weights. The system aims to:

1. Allocate weights to maximize value for BasedAgent
2. Fairly reward contributors based on risk taken
3. Incentivize long-term contributions
4. Simplify the process and avoid foreseeable complications

## Weights Emissions Schedule & Supply Cap

The number of Coder weights is capped at 100 Million weights, at the end of the Coder reward period (16 years).

## Monthly Coding Weights

The weights will be distributed monthly, starting from the initial period ending July 31, 2024. Here's the monthly distribution for the first year:

Year 1 (July 1, 2024 - June 30, 2025):

1. July 1, 2024 - July 31, 2024: 6,250,000 weights
2. August 1, 2024 - August 31, 2024: 5,729,167 weights
3. September 1, 2024 - September 30, 2024: 5,208,333 weights
4. October 1, 2024 - October 31, 2024: 4,687,500 weights
5. November 1, 2024 - November 30, 2024: 4,166,667 weights
6. December 1, 2024 - December 31, 2024: 3,645,833 weights
7. January 1, 2025 - January 31, 2025: 3,125,000 weights
8. February 1, 2025 - February 28, 2025: 2,604,167 weights
9. March 1, 2025 - March 31, 2025: 2,083,333 weights
10. April 1, 2025 - April 30, 2025: 1,562,500 weights
11. May 1, 2025 - May 31, 2025: 1,041,667 weights
12. June 1, 2025 - June 30, 2025: 520,833 weights

Total for Year 1: 40,625,000 weights

Formula for subsequent months:

For any given month after July 31, 2025, the weight distribution can be calculated as follows:

1. Determine which year the month falls in (y), where y starts at 2 for the second year.
2. Determine which month of the year it is (m), where m goes from 1 to 12.
3. Use the formula: 
   Monthly Weight Distribution = (13,539,768 * 0.5^(y-2)) * (13-m) / 78

This formula ensures that:
- The total distribution for Year 2 is 13,539,768 weights
- Each subsequent year's total is half of the previous year
- Within each year, the monthly distribution decreases linearly

## Calculating The Implied Value of Weights

The implied weight value formula is:

1. Total BAAG emissions for Coding per relevant month
2. Divide by 100,000,000 (total weights)
3. Equals pro-rata of BAAG earned by 1 weight per month
4. Multiply by the current implied BAAG price

## New Coding Weights

New coders can contribute and earn weights based on their work. The value of these weights will depend on the current BAAG price and the total number of weights in circulation.

## Market Driven Implied Value of Code Resets Monthly

The implied value is decided by the market. The amount of stETH deposited creates yield that buys BAAG from the AMM, increasing BAAG scarcity and providing liquidity for contributors.

## Snapshot Summary

Snapshots will be taken monthly, starting from July 31, 2024. The methodology for determining the implied BAAG price and USD per weight will be established as the project progresses.

## Initial Snapshot: Project Start to July 31, 2024

The initial implied value of weights will be determined based on the real costs paid to auditors and developers sponsored by the BasedAgent community.

Subsequent snapshots will follow monthly, with the implied value potentially being calculated based on factors such as stETH deposits, trading prices, or other relevant metrics as the BasedAgent ecosystem develops.

This guide provides a framework for understanding and calculating the value of code contributions to BasedAgent. The specific details of price determination and snapshot calculations may need to be adjusted as the BasedAgent project evolves. Contributors should stay informed about any updates or changes to this system as the project develops.

[← Previous](https://github.com/Morlabs/BasedAgent/blob/main/Docs/Contributions/Code%20Contributor%20Best%20Practices.md) | [Next →](https://github.com/Morlabs/BasedAgent/blob/main/Docs/Contributions//Weight%20Maintenance%20Guide.md)

