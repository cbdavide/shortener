'use strict';

class Langage {
    getGenerator () {
        let self = this;
        return (function* () {
            for(let flag of self.flags)
                yield flag;
        })();
    }
}

class CPP extends Langage{
    constructor() {
        super();
        this.EOF = /int\s+main\s?\(\) {/;
        this.flags = [
            /#(include|define)\s?<.+>/,
            /using namespace std;/
        ];
    }
}

module.exports = {
    CPP: CPP
}
