import express, { Router } from 'express';
import serverless from 'serverless-http';
import path from 'path';

const api = express();

const router = Router();
router.get('/hello', (req, res) => res.send('Hello World!'));

api.use('/api/', router);

// Serve static files from the dist directory
const clientBuildPath = path.join(process.cwd(), 'dist');
api.use(express.static(clientBuildPath));

// Serve static files from the 'public' directory
api.use('/assets', express.static(path.join(__dirname, 'dist/assets'), {
  setHeaders: (res, path) => {
    if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

// Serve the index.html file for the /home route
api.get('/api/home', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

export const handler = serverless(api);
