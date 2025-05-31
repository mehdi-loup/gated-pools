// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;


contract EmailVerifier {
    constructor() {}

    function verify(
        Proof calldata,
        bytes32 _domainHash
    )
        public
        view
        returns (bytes32, bool)
    {
        return (_domainHash, true);
    }
}
