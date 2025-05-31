// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import {IHooks} from "v4-core/src/interfaces/IHooks.sol";
import {Hooks} from "v4-core/src/libraries/Hooks.sol";
import {IPoolManager} from "v4-core/src/interfaces/IPoolManager.sol";
import {HookMiner} from "v4-periphery/src/utils/HookMiner.sol";
import {GatedPoolHook} from "../src/GatedPoolHook.sol";

contract DeployScript is Script {
    // CREATE2 Deployer Proxy address
    address constant CREATE2_DEPLOYER = 0x4e59b44847b379578588920cA78FbF26c0B4956C;

    function run() public {
        // Load private key from environment
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // Start broadcasting transactions
        vm.startBroadcast(deployerPrivateKey);

        // Deploy PoolManager first
        IPoolManager manager = IPoolManager(vm.envAddress("POOL_MANAGER_ADDRESS"));
        IPoolManager emailVerifier = IPoolManager(vm.envAddress("EMAIL_VERIFIER"));

        // Define the flags needed for the hook
        uint160 flags = uint160(Hooks.BEFORE_SWAP_FLAG);

        // Mine a salt that will produce a hook address with the correct flags
        bytes memory constructorArgs = abi.encode(manager, emailVerifier);
        (address hookAddress, bytes32 salt) =
            HookMiner.find(CREATE2_DEPLOYER, flags, type(GatedPoolHook).creationCode, constructorArgs);

        // Deploy the hook using CREATE2 with the mined salt
        GatedPoolHook hook = new GatedPoolHook{salt: salt}(manager, address(emailVerifier));
        require(address(hook) == hookAddress, "Hook deployed to wrong address");

        console.log("GatedPoolHook deployed to:", address(hook));

        vm.stopBroadcast();
    }
}
