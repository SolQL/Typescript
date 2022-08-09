const { StandaloneCompiler } = require("./dest/compile/Compiler")
const fs = require('fs');




async function main() {
    const testSource = 'query.sol';
    const testContent = fs.readFileSync("./contracts/exampleQuery.sol").toString();
    const compiler = new StandaloneCompiler();
    
    compiler.compileFromString(testSource, testContent);
}





main()
.then()
.catch()