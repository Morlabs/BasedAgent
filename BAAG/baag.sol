// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import "./MOR20Base.sol";

contract BAAGToken is ERC20, ERC20Votes, MOR20Base, ERC165 {
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
    Pool public communityPool;
    Pool public protectionPool;

    constructor(
        address _capitalPoolAddress, 
        address _codersPoolAddress,
        address _communityPoolAddress,
        address _protectionPoolAddress
    ) ERC20("BAAG Token", "BAAG") ERC20Votes() MOR20Base("BAAG Token", "BAAG", address(0)) {
        require(totalSupply() == 0, "MOR20: Token must be newly deployed with no existing holders");
        
        startTime = block.timestamp;
        capitalPool = Pool(0, _capitalPoolAddress);
        codersPool = Pool(0, _codersPoolAddress);
        communityPool = Pool(0, _communityPoolAddress);
        protectionPool = Pool(0, _protectionPoolAddress);
        _mint(address(this), MAX_SUPPLY); // Mint tokens to the contract
    }

    function emitTokens() public {
        require(block.timestamp <= startTime + EMISSION_PERIOD, "Emission period ended");

        uint256 daysElapsed = (block.timestamp - startTime) / 1 days;
        uint256 tokensToEmit = daysElapsed * DAILY_DECAY;

        require(tokensToEmit + totalEmitted <= MAX_SUPPLY, "Exceeds max supply");

        uint256 protectionShare = (tokensToEmit * 4) / 100;
        uint256 remainingShare = tokensToEmit - protectionShare;
        uint256 splitShare = remainingShare / 3;

        uint256 capitalShare = splitShare;
        uint256 codersShare = splitShare;
        uint256 communityShare = splitShare;

        protectionPool.emitted += protectionShare;
        capitalPool.emitted += capitalShare;
        codersPool.emitted += codersShare;
        communityPool.emitted += communityShare;
        totalEmitted += tokensToEmit;

        _transfer(address(this), protectionPool.poolAddress, protectionShare);
        _transfer(address(this), capitalPool.poolAddress, capitalShare);
        _transfer(address(this), codersPool.poolAddress, codersShare);
        _transfer(address(this), communityPool.poolAddress, communityShare);
    }

    function _mint(address to, uint256 amount) internal override(ERC20, ERC20Votes) {
        super._mint(to, amount);
    }

    function _burn(address account, uint256 amount) internal override(ERC20, ERC20Votes) {
        super._burn(account, amount);
    }

    // Implement ERC165 supportsInterface
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC165, IERC165) returns (bool) {
        return interfaceId == type(ERC20Votes).interfaceId || super.supportsInterface(interfaceId);
    }
}

