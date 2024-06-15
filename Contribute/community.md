# Code Contributor Guide to Earning Weights & Their Implied Value

## Overview
Code Contributors earn rewards based on "weights." An individual's reward allocation is determined by their share of the total weights multiplied by the daily BAAG emissions. Based Agent is a competitive marketplace for code where contributors strive to deliver high-quality code at competitive prices. Contributors must actively maintain their code to maximize rewards, as weights are subject to decay, emphasizing the value of consistent participation.

## Weights Emissions Schedule & Supply Cap
Weights are capped at 100 million by the end of the 16-year reward period, ensuring their scarcity and value.

### Yearly Coding Weights Allocation
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
A maximum of 100,000,000 weights will be issued by the end of year 16. Weights not maintained by their holders can be re-assigned or returned to the reserve.

## Halving Model Based on Bitcoin
Our reward model mirrors Bitcoin's, where rewards decrease over time but the value of each unit potentially increases due to scarcity.

## Contribution Provider - Proof of Contribution Table for Code Contribution

**Before adding a pull request, [please read the BEST PRACTICES GUIDE](https://github.com/Morlabs/BasedAgent/blob/main/Contribute/contribution_guidelines.md).**

### Snapshots
We use midnight UTC on the 15th of each month as the cut-off for submissions within each snapshot, with the first one ending on 15th June 2024. 

### Token Distribution
The daily block reward of 14,400 BAAG tokens declines daily by 2.468994701 BAAG until reaching zero on day 5,833.

- 25% to Reviewers
- 25% to Coders
- 30% to Capital
- 16% to Community
- 4% to Protection

### Calculating Token Emissions
The BAAG tokens a coder earns are determined by their proportion of total weights. For example, owning 200 weights out of 20,000 entitles a coder to 1% of the 3,600 BAAG allocated daily to coders—equating to 36 BAAG per day, or 1,080 BAAG monthly.

### Historical Weight Adjustments and BAAG Distribution
The value of weights a coder holds can decrease due to the system’s weight decay mechanism, which is designed to incentivize continuous contribution and maintenance. This section illustrates how the weights and subsequent BAAG distribution evolve, emphasizing the importance of ongoing engagement.

**Example Calculation:**
- **Month 1**: Coder 1 contributes 10 hours, Coder 2 contributes 30 hours.
- **Month 2**: Coder 3 contributes 10 hours, Coder 2 contributes 30 hours again, while Coder 1 does not contribute but retains weights from Month 1.

NB: The weight system and distrbution system is subject to change and dependent upon commmunity feedback as well as any technical limitations that may come with MOR20.

### Example Fields for Contribution Submissions
Contributors must include:
1. The Ethereum/Wallet address for rewards.
2. Link to the issue addressed.
3. Link to the code contribution.
4. Hours worked.
5. Description of contributions.
6. Date of contribution (format: day/month/year).

### Example Fields

| Wallet Address                             | Link to Issue | Link to Work        | Time spent (hours) | Description of Contribution | Date of Contribution |
| ------------------------------------------ | ------------- | ------------------- | ------------------- | --------------------------- | ------------------- |
| 0x98eFf980C57c9D333340b3856481bF7B8698987c | Link to Issue | Link to Commit #127 | 50                  | Integration of ollama       | 12/03/2024          |

Please include the "pipe" `|` symbol correctly as seen above so your contribution will format with the table.

> [!NOTE]  
> - Create a pull request and add a row to the following table.  
> - If you are submitting multiple contributions, please create multiple pull requests - one pull request per contribution.  
> - Only add your link at the bottom, and do not alter any other rows.  
> - Detail the work you are contributing to Based Agent. You must include a link to the work for the work to be considered. Examples of proof include links to pull requests, GitHub issues, or other easily verifiable information.  
> - It is your responsibility to make the proof easily verifiable. Don't assume reviewers of this table have an understanding of your code. Explain it simply. Limit your descriptions to 250 words.
> - You need a wallet like Metamask that can receive Ethereum-based tokens. BAAG token is an ERC-20 type token. Also must support Arbitrum.

### Approval and Conversion Process
1. **Submission:** Contributors submit their hours via pull requests to the Proof of Contribution table.
2. **Review:** Submitted hours are reviewed and approved based on the quality and relevance of the work.
3. **Conversion:** Approved hours are converted into weights. 
4. **Emission:** Weights translate into daily BAAG token emissions.


| Wallet Address | Link to Work | Time spent (hours) | Description of Contribution | Date of Contribution |
| -------------- | ------------ | --------------------- | --------------------------- | ------------------- |
| 0x2ff360B98116119624e3cDD17b2D07EFbe6D6029 | Wonderverse setup | 3 | Initial setup to the BasedAgent Wonderverse | 06/06/2024 |
| 0xCbcb2a6E6b4ed4a8D281709c831960a31547f738 | Discord setup | 6 | Initial setup Based Agent Discord | 14/06/2024 
| 0xCbcb2a6E6b4ed4a8D281709c831960a31547f738 | https://docs.google.com/document/d/1ODJXuTuaw-gwrhEyKsXvyThImPwWpRAh3j4hirO1qoE/edit?usp=sharing | 30 | authorship of based Agent growth plan  | 14/06/2024 
| 0xCbcb2a6E6b4ed4a8D281709c831960a31547f738 | Brand assets | 30 | Design of all Brand assets for Based Agent | 01/06/2024 
| 0xCbcb2a6E6b4ed4a8D281709c831960a31547f738 | Website | 20 | Copy and design oversignt of website  | 01/06/2024 

