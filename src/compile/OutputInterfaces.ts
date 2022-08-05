interface ICompilerOutput {
    contracts: ICompilerOutputContracts
    errors: Array<ICompilerOutputError>

}

interface ICompilerOutputContracts {
    [sourceFileName: string] : {[contractName: string]: IContract}
}

interface ICompilerOutputError {
    component: string
    errorCode: string
    formattedMessage: string
    message: string
    severity: string
    sourceLocation: Object
    type: string
}