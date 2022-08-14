//SPDX-License-Identifier: Unlicense
pragma solidity =0.5.16;
import "./UniswapV2Factory.sol";

interface ISolQL {
    function query() external returns(bytes memory results);
}


contract Query {
    function query2() external returns(bytes memory result) {

        IUniswapV2Factory factory = IUniswapV2Factory(0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f);

        address[100] memory tokens;

        for(uint i; i < 100; i++) {
            address pairAddress = factory.allPairs(i);
            IUniswapV2Pair pair = IUniswapV2Pair(pairAddress);
            tokens[i] = pair.token0();
        }

        return abi.encodePacked(tokens);
    }



}
