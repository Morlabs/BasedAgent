## BARC 00: BasedAgent Request for Comment (BARC) Introduction

## Status: Implemented

## Summary
BARC, meaning BasedAgent Request for Comments, is integral in suggesting and executing changes within the BasedAgent ecosystem. This document is designed to make the submission process more transparent, fair, and efficient. The BARC process generally follows the monthly timing of the weight snapshot Smart Contract updates, allowing for weights included in BARCs advanced to the "In Progress" stage to be included in the next Smart Contract update, which occurs around the 8th of each month.

## Purpose and Scope
This guide is crafted for contributors and users within the BA ecosystem, facilitating structured proposals for standards and material changes to one of the ten BasedAgent Reference Implementations (BARIs).

There is an active forum on [Discord](https://discord.com/channels/1151741790408429580/1215401416659832842](https://discord.com/channels/1251220927518216294/1265621325020528761) for all BARCs currently under discussion.

> [!IMPORTANT]  
> - If your contribution is a small incremental improvement to an existing code base, just contribute the code; no BARC required. 
> - If you have an idea for a bounty that is small in scope (in other words can be acheived by 1 developer in a max of 1 month), submit the idea on the [Bounty Ideas form](https://docs.google.com/forms/d/e/1FAIpQLSdeWhidlNjIF2QdQDqGHTYtzNFbIBvo8O1UQNQ08RgRkuTxcA/viewform?usp=sf_link). 
> - The BARC process is for large scope technical proposals regarding HOW to implement improvements to BasedAgent rather than for general discussion of ideas.

## Life Cycle of a BARC
1. **Pull Request Creates BARC**: The author creates a pull request with the details of their new BARC.
2. **Merged into "Discussion"**: The BARC is merged into Discussion by a Maintainer, indicating the repo maintainer believes the BARC is at least worth discussion and has basic merit to their Reference Implementation.
3. **Review**: Maintainers should seek to review and provide feedback to BARC authors once a week. This helps authors get a sense of the next steps/current state of their BARC.
4. **"Pending"**: If a maintainer identifies a technical dependency, they can move the BARC into "Pending" status. This indicates they accept the BARC in principle but there is a blocker that needs to be resolved first.
5. **"In Progress"**: Once all technical dependencies have been addressed and weights agreed, only then can a BARC be accepted into the "In Progress" stage.
6. **"Implemented"**: For the BARC to be considered "Implemented", the code proposed must be contributed and merged by the maintainer into the correct BARI repository.

## Submission Guidelines
- Properly document your BARC in the repository and list it in the README for community review.
- Fork the relevant template and select the most pertinent category.
