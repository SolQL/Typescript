/*
    Purpose of the parsers are to take in queries written by developers, 
    and return a string which is a valid input for the Compiler class.
*/

interface IParser {
    getSolidity(target: string): string
}



class StringQueryParser implements IParser{


    getSolidity(target: string): string {
        const flattenedQuery = StringQueryParser.flattenQuery(target);
        return flattenedQuery;
    }


    static flattenQuery(query: string) {
        /*
            Flatten the query.
        
        */
        const flatteningPattern = /( {2}|\n)/g
        const flattenedQuery = query.replace(flatteningPattern, '');
    
        return flattenedQuery;
        
    }
}







class FileQueryParser implements IParser {
    getSolidity(target: string): string {
        return "";
    }
}



export { StringQueryParser, FileQueryParser };