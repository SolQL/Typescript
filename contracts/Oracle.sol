pragma solidity =0.5.16;


import "./exampleQuery.sol";


contract Oracle {
    
    function run(bytes memory bytecode) public returns(bytes memory result) {

        ISolQL query = ISolQL(deployContractFromBytecode(bytecode));
        result = query.query();

        return result;
    }


    function deployContractFromBytecode(bytes memory bytecode) internal returns(address queryContract) {
        assembly {
            queryContract := create(0, add(bytecode, 0x20), mload(bytecode))
        }
    }
    
}