'use strict';

String.prototype.caplitalize = function(){
    return this.charAt(0).toUpperCase() + this.slice(1);
}

/**
 * beutify_name
 *
 * Replaces de _ (underscore) of the name of a files
 * by spaces, and caplitalize de first letter of each
 * word.
 * @arg {String} name, name of the file.
 * @return {String} Beautified version of the name.
 */
function beautify_name(name) {
    return name.split('_').map(sub => {
        return sub.caplitalize();
    }).join(' ');
}

module.exports = {
    beautify_name
}
