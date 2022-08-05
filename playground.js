const { StandaloneCompiler } = require("./dest/compile/Compiler")




async function main() {
    const compiler = new StandaloneCompiler();
    compiler.compileFromTarget("");
}





main()
.then()
.catch()