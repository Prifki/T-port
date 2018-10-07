const fs = require("fs");
const url = require("url");
const path = require("path");
const glob = require("glob");

function readFile(filePath) {
    return fs.readFileSync(path.join(filePath), "utf-8");
}

function parsePathname(urlString) {
    return url.parse(urlString, true).pathname;
}

function cutParamsFromUrl(url) {
    var pathParamsPair = url.split(/#|\?/);
    return pathParamsPair[0];
}

function registerPartials(path, handlebars) {
    const files = glob.sync(path + "/**/*");

    files
        .filter(filePath => {
            return /\.hbs$/.test(filePath);
        })
        .map(filePath => {
            return {
                name: filePath.replace(
                    /[^]*\/templates\/partials\/([^]*)\.hbs/,
                    "$1"
                ),
                source: readFile(filePath)
            };
        })
        .map(fileObj => {
            handlebars.unregisterPartial(fileObj.name);
            return fileObj;
        })
        .map(fileObj => {
            handlebars.registerPartial(fileObj.name, fileObj.source);
        });

    return handlebars;
}

module.exports = {
    readFile,
    parsePathname,
    cutParamsFromUrl,
    registerPartials
};
