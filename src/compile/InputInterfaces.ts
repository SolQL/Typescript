


interface ICompilerInputJson {
    language: string
    settings: Object
    sources?: ICompilerInputSources
}


interface ICompilerInputSources {
    [name: string] : {content: string}
}


