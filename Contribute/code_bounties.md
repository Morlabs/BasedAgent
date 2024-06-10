# Bounty Contributor Guide to Earning Weights & Their Implied Value

## Overview
Bounty Contributors are compensated based on "weights" that are pre-defined for each deliverable within a bounty. This ensures clarity and predictability in the rewards, as contributors know the exact weight and corresponding value of their work. Bounties have specific tasks with set rewards, aligning with Based Agents' objectives to foster high-quality contributions and active participation.

## Weights Emissions Schedule & Supply Cap
The total allocation of weights is capped at 100 million, distributed over a 16-year period, maintaining their scarcity and increasing their perceived value over time.

### Yearly Bounty Weights Allocation
- Year 1: 50,000,000
- Year 2: 25,000,000
- Year 3: 12,500,000
- Year 4: 6,250,000
- Year 5: 3,125,000
- Year 6: 1,562,500
- Year 7: 781,250
- Year 8: 390,625
- Year 9: 195,312
- Year 10: 97,656
- Year 11: 48,828
- Year 12: 24,414
- Year 13: 12,207
- Year 14: 6,103
- Year 15: 3,051
- Year 16: 1,525

### Total Weights
A maximum of 100,000,000 weights will be issued by the end of year 16. Unused weights can be reassigned or returned to the reserve.

## Reward Model Based on Pre-defined Weights
Each bounty lists specific tasks with assigned weights, ensuring that contributors can gauge the value of their work accurately. This model promotes transparency and fair compensation.

## Bounty Claim Process
Before claiming a bounty, [please read the BEST PRACTICES GUIDE](https://github.com/Morlabs/BasedAgent/blob/main/Contribute/contribution_guidelines.md).

### Bounties Schedule
Bounties are listed monthly, with deadlines and specific deliverables detailed for each task. Contributors must claim a bounty and have it marked as "In Progress" to begin work. Once a bounty is claimed, other contributors cannot claim the same task unless it is reopened.

### Bounty Completion and Token Distribution
Weights earned from completed bounties determine the distribution of daily BAAG token emissions. The process ensures contributors are rewarded proportionally to their contribution.

### Historical Weight Adjustments and BAAG Distribution
Weights from bounties decay over time unless the contributor continues to engage with new bounties, maintaining or increasing their weight total.

**Example Calculation:**
- **Month 1**: Developer A completes Bounty 1.1 and earns 500 weights.
- **Month 2**: Developer B completes Bounty 2.1 and earns 300 weights. Developer A does not complete additional bounties but retains weights from Month 1.

### Bounty Submission Requirements
Contributors must include:
1. Ethereum/Wallet address for rewards.
2. Link to the issue addressed.
3. Link to the pull request or commit.
4. Description of the bounty completed.
5. Date of completion (format: day/month/year).

### Bounty Status Updates
After claiming a bounty, the status should be updated to "In Progress". Other possible statuses include:
- **Open**: Available for claiming.
- **In Progress**: Currently being worked on.
- **Under Review**: Submitted for review.
- **Completed**: Reviewed and closed.
- **Reopened**: Available again due to incomplete or unsatisfactory completion.

## Detailed Bounties and Milestones Overview

### Combined Bounty Overview and Submissions Table

| Milestone                                 | Bounty ID  | Task Description                                       | Hours | Wallet Address                             | Link to Issue | Link to Work        | Description of Bounty | Date of Completion | Status     |
| ----------------------------------------- | ---------- | ------------------------------------------------------ | ----- | ------------------------------------------ | ------------- | ------------------- | ---------------------- | ----------------- | ---------- |
| **Milestone 1: Fork and Setup (Week 1)**  | Bounty 1.1 | Fork the OpenDevin Repository and rename project       | 4     | 0x98eFf980C57c9D333340b3856481bF7B8698987c | Link to Issue | Link to Commit #127 | Completed Bounty 1.1   | 12/03/2024       | Completed  |
|                                           | Bounty 1.2 | Update URLs and API endpoints to basedagent.co         | 2     |                                            |               |                     |                        |                   | Open       |
|                                           | Bounty 1.3 | Create initial documentation for setup                 | 6     |                                            |               |                     |                        |                   | Open       |
| **Milestone 2: Basic GitHub and Discord Integration (Week 1)** | Bounty 2.1 | Integrate GitHub OAuth and Discord for authentication  | 8     |                                            |               |                     |                        |                   | Open       |
|                                           | Bounty 2.2 | Implement basic GitHub operations                      | 6     |                                            |               |                     |                        |                   | Open       |
|                                           | Bounty 2.3 | Set up Discord notifications for new jobs              | 8     |                                            |               |                     |                        |                   | Open       |
| **Milestone 3: Prototype Code Generation and Handling (Week 1)** | Bounty 3.1 | Simulated AI-driven code generation                    | 8     |                                            |               |                     |                        |                   | Open       |
|                                           | Bounty 3.2 | Code management interface testing                      | 4     |                                            |               |                     |                        |                   | Open       |
|                                           | Bounty 3.3 | GitHub integration for PR creation                     | 4     |                                            |               |                     |                        |                   | Open       |
|                                           | Bounty 3.4 | Internal review process simulation                     | 8     |                                            |               |                     |                        |                   | Open       |
|                                           | Bounty 3.5 | Documentation and feedback collection                  | 4     |                                            |               |                     |                        |                   | Open       |
| **Milestone 4: Review Process Automation (Week 2)** | Bounty 4.1 | Automated reviewer assignment via GitHub Actions       | 8     |                                            |               |                     |                        |                   | Open       |
|                                           | Bounty 4.2 | Discord thread creation for reviews                    | 8     |                                            |               |                     |                        |                   | Open       |
|                                           | Bounty 4.3 | Review status tracking system                          | 8     |                                            |               |                     |                        |                   | Open       |
| **Milestone 5: Payment Processing Setup (Week 2)** | Bounty 5.1 | ETH address integration during user signup             | 4     |                                            |               |                     |                        |                   | Open       |
|                                           | Bounty 5.2 | Manual payment process setup                           | 8     |                                            |               |                     |                        |                   | Open       |
|                                           | Bounty 5.3 | Smart contract development for token conversions       | 16    |                                            |               |                     |                        |                   | Open       |
| **Milestone 6: RAG Integration with Morpheus Repositories (Week 3)** | Bounty 6.1 | Data collection and structuring                        | 12    |                                            |               |                     |                        |                   | Open       |
|                                           | Bounty 6.2 | RAG model configuration                                | 16    |                                            |               |                     |                        |                   | Open       |
|                                           | Bounty 6.3 | RAG model training                                     | 24    |                                            |               |                     |                        |                   | Open       |
|                                           | Bounty 6.4 | Integration testing with BasedAgent                    | 16    |                                            |               |                     |                        |                   | Open       |
| **Milestone 7: Enhanced GitHub Integration and Automation (Week 3)** | Bounty 7.1 | Enhanced reviewer assignment                          | 8     |                                            |               |                     |                        |                   | Open       |
|                                           | Bounty 7.2 | Performance monitoring of automated assignments        | 8     |                                            |               |                     |                        |                   | Open       |
|                                           | Bounty 7.3 | Continuous improvement based on feedback               | 8     |                                            |               |                     |                        |                   | Open       |
| **Milestone 8: Integration with Morpheus Agent Staking (Week 4)** | Bounty 8.1 | Smart contract development for MOR staking             | 16    |                                            |               |                     |                        |                   | Open       |
|                                           | Bounty 8.2 | Staking interface integration                          | 16    |                                            |               |                     |                        |                   | Open       |
|                                           | Bounty 8.3 | Security audits for the staking contract               | 12    |                                            |               |                     |                        |                   | Open       |
|                                           | Bounty 8.4 | User education and documentation for MOR staking       | 8     |                                            |               |                     |                        |                   | Open       |

