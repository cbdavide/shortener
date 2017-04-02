'use strict'

const path = require('path');
const fs = require('fs-extra');
const short = require('./src/shortener');
const language = require('./src/language');

const print = console.log;

const ROOT = path.resolve('.', 'backyard');
const OUT = path.resolve('.', '__code');

function traverse(folder, salida) {

    fs.readdirSync(folder).forEach(file => {

        let file_path = path.resolve(folder, file);
        let file_name = file.split('.');

        if(fs.lstatSync(file_path).isDirectory()) {
            let folder_name = path.basename(file_path);
            traverse(file_path, path.join(salida, folder_name));
        } else {

            if(language[file_name[1]] !== undefined) {
                let o_path = path.join(OUT, file_name[1], salida);

                fs.ensureDir(o_path, (err) => {
                    short(new language[file_name[1]], file_path, path.join(o_path, file));
                })
            }

        }
    });
}

traverse(ROOT, '');
