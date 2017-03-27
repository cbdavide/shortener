'use strict';

const fs = require('fs');
const path = require('path');
const split2 = require('split2');
const through2 = require('through2');
const langage = require('./language');

function short(langage, input_path, output_path) {
    let generator = langage.getGenerator();
    let flag = generator.next().value;
    let EOF = 0;

    fs.createReadStream(input_path, {encoding: 'utf-8'})
        .pipe(split2())
        .pipe(through2({objectMode: true}, function(chunk, enc, cb) {

            if(EOF || chunk === '') {
                cb(); return;
            }

            if(flag === undefined && langage.EOF.test(chunk)) {
                EOF = 1;
                cb(); return;
            }

            while(flag != undefined) {
                if(flag.test(chunk)) {
                    cb(); return;
                } else {
                    flag = generator.next().value;
                }
            }

            this.push(chunk + '\n');
            cb();
        }))
        .pipe(fs.createWriteStream(output_path, {
            defaultEncoding: 'utf-8',
            flags: 'w'
        }))
        .on('finish', (err) => {
            input_path = path.basename(input_path);
            output_path = path.basename(output_path);
            console.log(`Finished: ${input_path} -> ${output_path}`);
        });
}

let input_path = path.resolve('.', 'src', 'test.input.cpp');
let output_path = path.resolve('.', 'src', 'test.output.cpp');

let c = new langage.CPP();
let g = c.getGenerator();
short(c, input_path, output_path);
