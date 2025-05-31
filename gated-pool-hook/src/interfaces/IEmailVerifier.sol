// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Proof} from "vlayer/Proof.sol";

interface IEmailVerifier {
    function verify(Proof calldata proof, bytes32 domainHash) external view returns (bytes32, bool);
}
