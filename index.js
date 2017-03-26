'use strict'

const path = require('path');
const fs = require('fs');

const print = console.log;

const ROOT = path.resolve('.', 'backyard');
const OUT = path.resolve('.', '__code');

if(fs.existsSync(OUT))
    fs.rmdirSync(OUT);

function traverse(folder, salida, cb) {
    let names = {};
    fs.mkdir(salida);

    fs.readdirSync(folder).forEach(file => {

        let file_path = path.resolve(folder, file);
        let file_name = file.split('.')[0];

        if(fs.lstatSync(file_path).isDirectory()) {
            let folder_name = path.basename(file_path);
            traverse(file_path, path.join(salida, folder_name), cb);
        } else {

            if(!names[file_name])
                names[file_name] = []

            names[file_name].push(file);
        }
    });
    // cb(folder, names);
}

function joini(folder, files) {

}


// traverse(ROOT, OUT, joini);
