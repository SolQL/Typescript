//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import "./SolQL.sol";

contract Query is ISolQL {
    function query() override external returns(bytes memory result) {
        return 'bruuuh lamooaoo';
    }

}
