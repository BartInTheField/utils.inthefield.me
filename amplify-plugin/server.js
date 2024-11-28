import { createRequestHandler } from '@remix-run/express';
import express from 'express';

// notice that the result of `remix vite:build` is "just a module"
import * as build from './index.js';

const app = express();

// Serve static files with proper MIME types
app.use(
    express.static('client', {
        setHeaders: (res, path) => {
            // Set correct MIME types for JavaScript files
            if (path.endsWith('.js')) {
                res.setHeader('Content-Type', 'application/javascript');
            }
            // Set correct MIME types for CSS files
            else if (path.endsWith('.css')) {
                res.setHeader('Content-Type', 'text/css');
            }
        },
    }),
);

// and your app is "just a request handler"
app.all('*', createRequestHandler({ build }));

app.listen(3000, () => {
    console.log('App listening on http://localhost:3000');
});
