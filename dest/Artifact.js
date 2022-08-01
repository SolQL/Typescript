"use strict";
/*
    Purpose is to allow queries to be matched with their
    catchers (if available)
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatcherArtifact = exports.QueryArtifact = exports.Artifact = void 0;
class Artifact {
    constructor(name, content) {
        this.name = name;
        this.content = content;
    }
}
exports.Artifact = Artifact;
class QueryArtifact extends Artifact {
}
exports.QueryArtifact = QueryArtifact;
class CatcherArtifact extends Artifact {
}
exports.CatcherArtifact = CatcherArtifact;
