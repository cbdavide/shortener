'use strict';

const fs = require('fs');
const path = require('path');
const split2 = require('split2');
const through2 = require('through2');
const language = require('./language');

function short(language, input_path, output_path) {
    let generator = language.getGenerator();
    let flag = generator.next().value;
    let EOF = 0;

    fs.createReadStream(input_path, {encoding: 'utf-8'})
        .pipe(split2())
        .pipe(through2({objectMode: true}, function(chunk, enc, cb) {

            if(EOF || chunk === '') {
                cb(); return;language
            }

            if(flag === undefined && language.EOF.test(chunk)) {
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
}

module.exports = short;
