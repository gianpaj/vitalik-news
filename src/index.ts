import express, { ErrorRequestHandler, Express, Request, Response } from 'express';

import './config';

console.log('LOG_LEVEL', process.env.LOG_LEVEL);
console.log('API_PORT', process.env.API_PORT);

const app: Express = express();
const port = process.env.API_PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
};

app.use(errorHandler);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
