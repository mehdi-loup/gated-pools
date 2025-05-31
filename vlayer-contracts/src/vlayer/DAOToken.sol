// SPDX-License-Identifier: GatedPools
pragma solidity ^0.8.21;

import "@openzeppelin-contracts-5.0.1/token/ERC20/ERC20.sol";
import "@openzeppelin-contracts-5.0.1/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin-contracts-5.0.1/access/Ownable.sol";

/**
 * @title DAOToken
 * @dev ERC20 token that allows anyone to mint a fixed amount (200 tokens)
 */
contract DAOToken is ERC20, ERC20Burnable {
    // Track addresses that have already minted
    mapping(address => bool) private _hasMinted;

    // Amount each address can mint (200 tokens with decimals)
    uint256 public constant MINT_AMOUNT = 1_000 * 10 ** 18;

    /**
     * @dev Constructor that sets the name and symbol of the token
     * @param name_ The name of the token
     * @param symbol_ The symbol of the token
     */
    constructor(
        string memory name_,
        string memory symbol_
    ) ERC20(name_, symbol_) {}

    /**
     * @dev Allows anyone to mint a fixed amount of tokens once per address
     */
    function mint(address recipient) external {
        _mint(recipient, MINT_AMOUNT);
    }

    /**
     * @dev Checks if an address has already minted tokens
     * @param account The address to check
     * @return Boolean indicating if the address has minted
     */
    function hasMinted(address account) external view returns (bool) {
        return _hasMinted[account];
    }
}
