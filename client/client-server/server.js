'use strict';

const Hapi = require('hapi');
const Path = require('path');

const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
    routes: {
        files: {
            relativeTo: Path.join(__dirname, 'build')
        }
    }
});

const start = async () => {
    await server.register(require('inert'));

    server.route({
        method: 'GET',
        path: '/{params*}',
        handler: {
            directory: {
                path: Path.join(__dirname, 'build'),
                index: ['index.html']
            }
        }
    });

    await server.start();

    console.log('Server running at:', server.info.uri);
};

start();