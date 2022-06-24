pragma solidity ^0.8.0;


interface ISolQL {
    function query() external returns(bytes memory results);
}



contract SolQL is ISolQL{

    function query() override external returns(bytes memory results) {
    }

}