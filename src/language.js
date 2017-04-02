'use strict';

class Language {
    getGenerator () {
        let self = this;
        return (function* () {
            for(let flag of self.flags)
                yield flag;
        })();
    }
}

class CPP extends Language{
    constructor() {
        super();
        this.EOF = /int\s+main\s?\(.*\)\s?{/;
        this.flags = [
            /#(include|define)\s?<.+>/,
            /using namespace std;/
        ];
    }
}

class Python extends Language {
    constructor() {
        super();
        this.EOF = /def\smain\(.*\):/;
        this.flags = [/(from\s.+)?import\s.+(\sas\s.+)?/];
    }
}

class Java extends Language {
    constructor() {
        super();
        this.EOF = //;
        this.flags = [];
    }
}

module.exports = {
    cpp: CPP,
    py: Python,
    java: Java
}
