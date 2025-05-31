// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {console} from "forge-std/console.sol";
import {BaseHook} from "v4-periphery/src/utils/BaseHook.sol";

import {Hooks} from "v4-core/src/libraries/Hooks.sol";
import {IPoolManager} from "v4-core/src/interfaces/IPoolManager.sol";
import {PoolKey} from "v4-core/src/types/PoolKey.sol";
import {PoolId, PoolIdLibrary} from "v4-core/src/types/PoolId.sol";
import {BalanceDelta} from "v4-core/src/types/BalanceDelta.sol";
import {BeforeSwapDelta, BeforeSwapDeltaLibrary} from "v4-core/src/types/BeforeSwapDelta.sol";
import {Proof} from "vlayer/Proof.sol";
import {IEmailVerifier} from "./interfaces/IEmailVerifier.sol";
import {VerificationParams} from "./types/VerificationParams.sol";
import {IImmutableState} from "v4-periphery/src/interfaces/IImmutableState.sol";

contract GatedPoolHook is BaseHook {
    using PoolIdLibrary for PoolKey;

    mapping(PoolId => bytes32) public poolDomainHash;
    mapping(PoolId => address) public poolVerifier;

    event VerificationParamsSetup(PoolId poolId, bytes32 domainHash, address verifier);

    error Unauthorized();
    error WRONG_HOOK();

    constructor(IPoolManager _poolManager) BaseHook(_poolManager) {}

    function getHookPermissions() public pure override returns (Hooks.Permissions memory) {
        return Hooks.Permissions({
            beforeInitialize: false,
            afterInitialize: false,
            beforeAddLiquidity: false,
            afterAddLiquidity: false,
            beforeRemoveLiquidity: false,
            afterRemoveLiquidity: false,
            beforeSwap: true,
            afterSwap: false,
            beforeDonate: false,
            afterDonate: false,
            beforeSwapReturnDelta: false,
            afterSwapReturnDelta: false,
            afterAddLiquidityReturnDelta: false,
            afterRemoveLiquidityReturnDelta: false
        });
    }

    function initializeGatedPool(PoolKey memory key, uint160 sqrtPriceX96, bytes32 domainHash, address verifier)
        external
        returns (int24 tick)
    {
        if (address(key.hooks) != address(this)) revert WRONG_HOOK();

        // Initialize the pool first
        tick = poolManager.initialize(key, sqrtPriceX96);

        // Then setup verification params
        poolDomainHash[key.toId()] = domainHash;
        poolVerifier[key.toId()] = verifier;

        emit VerificationParamsSetup(key.toId(), domainHash, verifier);
    }

    // -----------------------------------------------
    // NOTE: see IHooks.sol for function documentation
    // -----------------------------------------------

    function _beforeSwap(address, PoolKey calldata key, IPoolManager.SwapParams calldata, bytes calldata hookData)
        internal
        override
        returns (bytes4, BeforeSwapDelta, uint24)
    {
        // use hook data to verify that the swap is authorized.
        bytes32 domainHash = poolDomainHash[key.toId()];
        Proof memory proof = abi.decode(hookData, (Proof));
        (, bool verified) = IEmailVerifier(poolVerifier[key.toId()]).verify(proof, domainHash);

        if (!verified) revert Unauthorized();

        return (BaseHook.beforeSwap.selector, BeforeSwapDeltaLibrary.ZERO_DELTA, 0);
    }
}
