"use strict";
/*
    Purpose of the parsers are to take in queries written by developers,
    and return a string which is a valid input for the Compiler class.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileQueryParser = exports.StringQueryParser = void 0;
class StringQueryParser {
    getSolidity(target) {
        const flattenedQuery = StringQueryParser.flattenQuery(target);
        return flattenedQuery;
    }
    static flattenQuery(query) {
        /*
            Flatten the query.
        
        */
        const flatteningPattern = /( {2}|\n)/g;
        const flattenedQuery = query.replace(flatteningPattern, '');
        return flattenedQuery;
    }
}
exports.StringQueryParser = StringQueryParser;
class FileQueryParser {
    getSolidity(target) {
        return "";
    }
}
exports.FileQueryParser = FileQueryParser;
