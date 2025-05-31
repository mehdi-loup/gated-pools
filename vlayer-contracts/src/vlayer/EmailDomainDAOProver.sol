// SPDX-License-Identifier: GatedPools
pragma solidity ^0.8.21;

import {Strings} from "@openzeppelin-contracts-5.0.1/utils/Strings.sol";
import {Proof} from "vlayer-0.1.0/Proof.sol";
import {Prover} from "vlayer-0.1.0/Prover.sol";
import {RegexLib} from "vlayer-0.1.0/Regex.sol";
import {VerifiedEmail, UnverifiedEmail, EmailProofLib} from "vlayer-0.1.0/EmailProof.sol";

contract EmailDomainDAOProver is Prover {
    using RegexLib for string;
    using Strings for string;
    using EmailProofLib for UnverifiedEmail;

    function main(
        UnverifiedEmail calldata unverifiedEmail,
        string memory expectedDomain // exemple dao.com
    ) public view returns (Proof memory, bytes32) {
        VerifiedEmail memory email = unverifiedEmail.verify();
        string[] memory captures = email.from.capture(
            "^[\\w.-]+@([a-zA-Z\\d.-]+\\.[a-zA-Z]{2,})$"
        );
        bytes32 expectedDomainHash = keccak256(bytes(expectedDomain));
        bytes32 domainHash = keccak256(bytes(captures[1]));
        require(captures.length == 2, "invalid email domain");
        require(domainHash == expectedDomainHash, "domain does not match");

        return (proof(), domainHash);
    }
}
