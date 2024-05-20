// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "./MOR20Base.sol";

contract BAAGToken is ERC20, ERC20Votes, MOR20Base {
    uint256 private constant MAX_SUPPLY = 42000000 * 10**18; // 42 million BAAG
    uint256 public constant DAILY_DECAY = 2468994701; // 2.468994701 BAAG in wei
    uint256 public constant EMISSION_PERIOD = 16 * 365 days; // 16 years in seconds
    uint256 public startTime;
    uint256 public totalEmitted;

    struct Pool {
        uint256 emitted;
        address poolAddress;
    }

    Pool public capitalPool;
    Pool public codersPool;

    constructor(address _capitalPoolAddress, address _codersPoolAddress) 
        ERC20("BAAG Token", "BAAG") 
        ERC20Votes() 
        MOR20Base("BAAG Token", "BAAG", address(0)) 
    {
        require(totalSupply() == 0, "MOR20: Token must be newly deployed with no existing holders");
        
        startTime = block.timestamp;
        capitalPool = Pool(0, _capitalPoolAddress);
        codersPool = Pool(0, _codersPoolAddress);
        _mint(address(this), MAX_SUPPLY); // Mint tokens to the contract
    }

    function emitTokens() public {
        require(block.timestamp <= startTime + EMISSION_PERIOD, "Emission period ended");

        uint256 daysElapsed = (block.timestamp - startTime) / 1 days;
        uint256 tokensToEmit = daysElapsed * DAILY_DECAY;

        require(tokensToEmit + totalEmitted <= MAX_SUPPLY, "Exceeds max supply");

        uint256 capitalShare = tokensToEmit / 2;
        uint256 codersShare = tokensToEmit / 2;

        capitalPool.emitted += capitalShare;
        codersPool.emitted += codersShare;
        totalEmitted += tokensToEmit;

        _transfer(address(this), capitalPool.poolAddress, capitalShare);
        _transfer(address(this), codersPool.poolAddress, codersShare);
    }

    function _mint(address to, uint256 amount) internal override(ERC20, ERC20Votes) {
        super._mint(to, amount);
    }

    function _burn(address account, uint256 amount) internal override(ERC20, ERC20Votes) {
        super._burn(account, amount);
    }
}
