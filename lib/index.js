'use strict'

const path = require('path');
const fs = require('fs-extra');
const short = require('./shortener');
const language = require('./language');

const print = console.log;

function process(conf) {

    fs.readdirSync(conf.input).forEach(file => {
        let file_path = path.resolve(conf.input, file);
        let file_name = file.split('.');

        if(fs.lstatSync(file_path).isDirectory()) {
            let folder_name = path.basename(file_path);
            process({
                input: file_path,
                output: conf.output,
                aux: path.join(conf.aux, folder_name)
            });
        } else {

            if(language[file_name[1]] !== undefined) {
                let o_path = path.join(conf.output, file_name[1], conf.aux);

                fs.ensureDir(o_path, (err) => {
                    short(new language[file_name[1]], file_path, path.join(o_path, file));
                })
            }

        }
    });
}

module.exports = process;
// 
// process({
//     input: path.resolve('.', 'backyard'),
//     output: path.resolve('.', '__code'),
//     aux: ''
// })
