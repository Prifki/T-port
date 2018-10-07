const path = require('path');
const http = require('http');
const express = require('express');
const Gaze = require('gaze').Gaze;
const WebSocket = require('ws');
const Handlebars = require('handlebars');

const handlers = require('./handlers');
const helpers = require('./helpers');

const PAGES_PATH = path.resolve(__dirname, '..', 'app', 'templates', 'pages');
const PARTIALS_PATH = path.resolve(__dirname, '..', 'app', 'templates', 'partials');
const STATIC_ASSETS_PATH = path.resolve(__dirname, '..', 'app', 'static-assets');
const REST_PATH = path.resolve(__dirname, '..', 'app', 'rest');
const WATCHER_PARAMS = {
    cwd: path.resolve(__dirname, '..', 'app'),
    interval: 1000
};
const TEMPLATE_SETTINGS = {
    paths: {
        pagesRoot: PAGES_PATH
    },
    port: 8090
};

function configureAppRoutes(express, handlebars) {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

    app.use('/static\-assets', express.static(STATIC_ASSETS_PATH));
    app.get('/favicon.ico', function(req, res) {
        res.status(204);
    });

    // app.use('/favicon.ico', express.static(STATIC_ASSETS_PATH));
    app.get('/rest/*', handlers.readRestHandler(REST_PATH));
    app.post('/rest/*', handlers.writeRestHandler);

    // PAGES
    app.get('/*', handlers.renderPageHandler(handlebars, TEMPLATE_SETTINGS));

    return app;
}

function showServerInfo(port) {
    const border = '===================================================';
    return function() {
        console.log(border);
        console.log(`APPLICATION available on http://localhost:${port}`);
        console.log(`REST SERVER available on http://localhost:${port}/rest`);
        console.log(border);
    }
}

function initServer(port, handlebars) {
    const app = configureAppRoutes(express, handlebars);
    const server = http.createServer(app);
    const wss = new WebSocket.Server({ server });

    server.listen(port, showServerInfo(port));

    return function reloadOpenPages() {
        wss.clients.forEach(function(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send('reload');
            }
        });
    };
}

function setupFilesWatcher(reload, handlebars) {
    const refreshPartials = () =>
        helpers.registerPartials(PARTIALS_PATH, handlebars) && reload();

    const filesWatcher = new Gaze(['static-assets/**/*', 'templates/pages/**/*', 'rest/**/*'], WATCHER_PARAMS);
    const partialWatcher = new Gaze(['templates/partials/**/*'], WATCHER_PARAMS);

    filesWatcher.on('changed', reload);
    partialWatcher.on('changed', refreshPartials);
}

const initiatedHandlebars = helpers.registerPartials(PARTIALS_PATH, Handlebars);
const reload = initServer(TEMPLATE_SETTINGS.port, initiatedHandlebars);

setupFilesWatcher(reload, initiatedHandlebars);
