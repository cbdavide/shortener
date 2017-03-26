'use strict';
const fs = require('fs');
const path = require('path');
const split2 = require('split2');
const through2 = require('through2');

class CPP {
    constructor() {
        this.flags = [
            /#(include|define)\s?<.+>/,
            /using namespace std;/
        ]
    }

    getGenerator () {
        let self = this;
        return (function* () {
            for(let flag of self.flags)
                yield flag;
        })();
    }
}

function short(generator, input_path, output_path) {
    let flag = generator.next().value;

    fs.createReadStream(input_path, {encoding: 'utf-8'})
        .pipe(split2())
        .pipe(through2({objectMode: true}, function(chunk, enc, cb) {
            if(chunk === '') {
                cb(); return;
            }

            while(flag != undefined) {
                console.log('>', flag, chunk)
                if(flag.test(chunk)) {
                    cb();
                    return;
                } else {
                    flag = generator.next().value;
                    console.log(':)', flag);
                }
            }
            console.log('here', chunk);
            this.push(chunk + '\n');
            cb();
        }))
        .pipe(fs.createWriteStream(output_path, {
            defaultEncoding: 'utf-8',
            flags: 'w'
        }))
        .on('finish', (err) => {
            console.log('buenala');
        });
}

let input_path = path.resolve('.', 'src', 'test.input.cpp');
let output_path = path.resolve('.', 'src', 'test.output.cpp');

let c = new CPP();
let g = c.getGenerator();
short(g, input_path, output_path);
