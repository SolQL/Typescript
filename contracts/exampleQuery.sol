//SPDX-License-Identifier: Unlicense
pragma solidity =0.5.16;
import "./UniswapV2Factory.sol";


interface ISolQL {
    function query() external returns(bytes memory results);
}


contract Query is ISolQL {
    function query() external returns(bytes memory result) {






        address uniV2Factory = 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;
        //uint pairs = IUniswapV2Factory(uniV2Factory).allPairsLength();
        //return abi.encodePacked(pairs);



        address[200] memory tokens;
        for(uint i; i < 200; i++) {
            tokens[i] = (IUniswapV2Pair(IUniswapV2Factory(uniV2Factory).allPairs(i)).token0());
        }

        return abi.encodePacked(tokens);
    }



}
