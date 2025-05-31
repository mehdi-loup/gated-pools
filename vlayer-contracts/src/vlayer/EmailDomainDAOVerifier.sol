// SPDX-License-Identifier: GatedPools
pragma solidity ^0.8.21;

import {EmailDomainDAOProver} from "./EmailDomainDAOProver.sol";

import {Proof} from "vlayer-0.1.0/Proof.sol";
import {Verifier} from "vlayer-0.1.0/Verifier.sol";

contract EmailDomainDAOVerifier is Verifier {
    address public prover;

    constructor(address _prover) {
        prover = _prover;
    }

    function verify(
        Proof calldata,
        bytes32 _domainHash
    )
        public
        view
        onlyVerified(prover, EmailDomainDAOProver.main.selector)
        returns (bytes32, bool)
    {
        return (_domainHash, true);
    }
}
