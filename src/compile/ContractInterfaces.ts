interface IContract {
    abi: Array<Object>
    devdoc: Object
    evm: IEvm
    metadata: string
    storageLayout: Object
    userdoc: Object
}


interface IEvm {
    assembly: string
    bytecode: IBytecode
    deployedBytecode: Object
    gasEstimates: Object
    legacyAssembly: Object
    methodIdentifiers: Object
}



interface IBytecode {
    functionDebugData: Object
    generatedSources: Array<any>
    linkReferences: Object

    object: string
    opcodes: string
    sourceMap: string
}