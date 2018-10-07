const path = require('path');
const { parsePathname, readFile, cutParamsFromUrl } = require('./helpers');

function readRestHandler(rootPath) {
    return function(req, res){
        const cleanedUrl = cutParamsFromUrl(req.originalUrl);
        const pagePath = parsePathname(cleanedUrl).replace(/^\/rest/, '');
        try {
            const jsonString = readFile(
                path.join(rootPath, pagePath) + '.json'
            );
            res.status(200).json(JSON.parse(jsonString));
        } catch (e) {
            if (e.code === 'ENOENT') {
                res.status(404)
            } else {
                res.status(417).send(e);
            }
        }
    }
}

function writeRestHandler(req, res) {}

function renderPageHandler(handlebars, settings) {
    return function(req, res) {
        const cleanedUrl = cutParamsFromUrl(req.originalUrl);
        const isNoPath = ['', '/'].indexOf(cleanedUrl) !== -1;
        const pagePath = parsePathname(isNoPath ? '/index' : cleanedUrl);

        try {
            const template = readFile(
                path.join(settings.paths.pagesRoot, pagePath) + '.hbs'
            );
            const context = {
                settings: settings
            };
            const render = handlebars.compile(template);

            res.status(200).send(render(context));
        } catch (e) {
            if (e.code === 'ENOENT') {
                res.status(404).send('<h1>Error 404: please try something else, you will be lucky next time.</h1>')
            } else {
                res.status(404).send(e);
            }
        }
    };
}

module.exports = {
    readRestHandler,
    writeRestHandler,
    renderPageHandler
};
