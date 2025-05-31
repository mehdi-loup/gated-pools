// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import {VTest} from "vlayer-0.1.0/testing/VTest.sol";
import {Proof} from "vlayer-0.1.0/Proof.sol";

import {UnverifiedEmail, EmailProofLib, VerifiedEmail} from "vlayer-0.1.0/EmailProof.sol";

import {EmailDomainDAOProver} from "../../src/vlayer/EmailDomainDAOProver.sol";

contract EmailProofLibWrapper {
    using EmailProofLib for UnverifiedEmail;

    function verify(
        UnverifiedEmail calldata email
    ) public view returns (VerifiedEmail memory v) {
        return email.verify();
    }
}

contract DAOEmailDomainProverTest is VTest {
    function getTestEmail(
        string memory path
    ) public view returns (UnverifiedEmail memory) {
        string memory mime = vm.readFile(path);
        return preverifyEmail(mime);
    }

    function test_verifiesEmailDomain() public {
        EmailProofLibWrapper wrapper = new EmailProofLibWrapper();
        EmailDomainDAOProver prover = new EmailDomainDAOProver();
        UnverifiedEmail memory email = getTestEmail(
            "test/testdata/verify_vlayer.eml"
        );
        VerifiedEmail memory verifiedEmail = wrapper.verify(email);
        string memory domain = "vlayer.xyz";
        callProver();
        (, bytes32 domainHash) = prover.main(email, domain);

        assertEq(domainHash, keccak256(bytes(domain)));
    }
}
