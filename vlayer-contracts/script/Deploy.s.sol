// SPDX-License-Identifier: GatedPools
pragma solidity ^0.8.21;

import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";

import {EmailDomainDAOProver} from "../src/vlayer/EmailDomainDAOProver.sol";
import {EmailDomainDAOVerifier} from "../src/vlayer/EmailDomainDAOVerifier.sol";

contract Deploy is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // Deploy the EmailDomainDAOProver
        EmailDomainDAOProver prover = new EmailDomainDAOProver();
        console.log("EmailDomainDAOProver deployed at:", address(prover));

        // Deploy the EmailDomainDAOVerifier with the prover address
        EmailDomainDAOVerifier verifier = new EmailDomainDAOVerifier(address(prover));
        console.log("EmailDomainDAOVerifier deployed at:", address(verifier));

        vm.stopBroadcast();
    }
}