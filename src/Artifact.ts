/*
    Purpose is to allow queries to be matched with their 
    catchers (if available)
*/


class Artifact {
    name: string
    content: string

    constructor(name: string, content: string) {
        this.name = name;
        this.content = content;
    }
}

class QueryArtifact extends Artifact {}

class CatcherArtifact extends Artifact{}




export { Artifact, QueryArtifact, CatcherArtifact }