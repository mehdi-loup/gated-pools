// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Proof} from "vlayer/Proof.sol";
import {IEmailVerifier} from "../interfaces/IEmailVerifier.sol";

contract EmailVerifier is IEmailVerifier {
    constructor() {}

    function verify(Proof calldata, bytes32 _domainHash) public view returns (bytes32, bool) {
        return (_domainHash, true);
    }
}
