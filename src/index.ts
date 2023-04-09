import express, { ErrorRequestHandler, Express, Request, Response } from 'express';
import generateAudio from 'generateAudio';
import scraper from 'scraper';
import summarize from 'summarize';

import { convertMilliseconds } from './utils';

import './config';

console.log('LOG_LEVEL', process.env.LOG_LEVEL);
console.log('API_PORT', process.env.API_PORT);

// const app: Express = express();
// const port = process.env.API_PORT || 3000;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.get('/', (req: Request, res: Response) => {
//   res.send('Express + TypeScript Server');
// });

// const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
//   if (res.headersSent) {
//     return next(err);
//   }
//   console.error(err.stack);
//   res.status(500).send('Internal Server Error');
// };

// app.use(errorHandler);

// app.listen(port, () => {
//   console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
// });

// const article = await scraper(
//   'https://cryptopotato.com/eth-liquid-staking-tokens-drop-8-daily-bitcoin-stalls-at-28k-weekend-watch/',
// );

// // console.log(article);
// if (!article) {
//   throw new Error('Article not found');
// }

// if (!article.content) {
//   throw new Error('Article content not found');
// }
// console.log('getting summary...');
// const summary = await summarize(article.content);

// console.log(summary);

// const text =
//   "Thailand's opposition party has promised to deliver approximately $15bn to the country's citizens in the form of digital tokens. The Pheu Thai-led government plans to distribute 10,000 baht ($285) each to approximately 55 million citizens aged 16 and over. The funds will be distributed using digital wallets built on blockchain technology. The party has also promised to triple farm income and introduce a minimum monthly household income guarantee.";
const text =
  'Bitcoin has been trading sideways for the past few days and is currently sitting at around $28,000. Ethereum has also been struggling, and is currently trading at around $1,850.';

const t0 = performance.now();
const resReponse = await generateAudio(text);
const t1 = performance.now();
console.log(`generateAudio took ${convertMilliseconds(t1 - t0)}`);

console.log(resReponse);
