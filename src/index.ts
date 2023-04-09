// For more information, see https://crawlee.dev/
import { CheerioCrawler, downloadListOfUrls, log, LogLevel, ProxyConfiguration, RequestQueue } from 'crawlee';

import generateAudio from '/generateAudio';
import summarize from './summarize';
import router from './routes';
import { convertMilliseconds } from './utils';

import dataSourcesToCrawl, { Label } from './dataSourcesToCrawl';

import './config';

console.log('LOG_LEVEL', process.env.LOG_LEVEL);
console.log('API_PORT', process.env.API_PORT);

// Crawlers come with various utilities, e.g. for logging.
// Here we use debug level of logging to improve the debugging experience.
// This functionality is optional!
log.setLevel(LogLevel.DEBUG);

const crawler = new CheerioCrawler({
  // proxyConfiguration: new ProxyConfiguration({ proxyUrls: ['...'] }),
  requestHandler: router,
  maxRequestsPerCrawl: 100, // Limitation for only 10 requests (do not use if you want to crawl a sitemap)
  // This function is called if the page processing failed more than maxRequestRetries + 1 times.
  failedRequestHandler({ request }) {
    log.debug(`Request ${request.url} failed twice.`);
  },
});

const allUrls = [];
const today = new Date().toISOString().slice(0, 10).replace(/-/g, '/');

// const requestQueue = await RequestQueue.open();
const requests = [];
for (const dataSource of dataSourcesToCrawl) {
  // const { url, globs, regex: regexString } = dataSource;

  // let listOfUrls: string[] = [];
  // if (url.includes('rss')) {
  //   listOfUrls = await downloadListOfUrls({
  //     url,
  //   });
  // } else {
  //   listOfUrls = [url];
  // }
  // if (regexString) {
  //   const regexStringToReplace = regexString.replace('__DATE__', today);
  //   const regex = new RegExp(regexStringToReplace);
  //   listOfUrls = listOfUrls.filter((url) => regex.test(url));
  // }

  // // console.log(listOfUrls);
  // console.log('today', today);

  // if (!listOfUrls.length) {
  //   console.log('No urls found');

  //   continue;
  // }
  // allUrls.push(...listOfUrls);

  // First you create the request queue instance.
  // And then you add one or more requests to it.
  // await requestQueue.addRequest({ url: dataSource.url, userData: { label: dataSource.label } });
  requests.push({ url: dataSource.url, userData: { label: dataSource.label } });
}

// console.log(allUrls);
await crawler.run(requests);

// const s1 = performance.now();
// console.log(`scraper took ${convertMilliseconds(s1 - s0)}`);

// console.log('getting summary...');

// const su0 = performance.now();
// const summary = await summarize(article.content);
// const su1 = performance.now();

// console.log(`summarize took ${convertMilliseconds(su1 - su0)}`);
// console.log(summary);

// // const text =
// //   "Thailand's opposition party has promised to deliver approximately $15bn to the country's citizens in the form of digital tokens. The Pheu Thai-led government plans to distribute 10,000 baht ($285) each to approximately 55 million citizens aged 16 and over. The funds will be distributed using digital wallets built on blockchain technology. The party has also promised to triple farm income and introduce a minimum monthly household income guarantee.";
// const text =
//   'Bitcoin has been trading sideways for the past few days and is currently sitting at around $28,000. Ethereum has also been struggling, and is currently trading at around $1,850.';

// const g0 = performance.now();
// // const resReponse = await generateAudio(text);
// const g1 = performance.now();
// console.log(`generateAudio took ${convertMilliseconds(g1 - g0)}`);

// // console.log(resReponse);
