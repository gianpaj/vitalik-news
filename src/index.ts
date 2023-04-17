// For more information, see https://crawlee.dev/
import { CheerioCrawler, Configuration, Dataset, downloadListOfUrls, log, LogLevel } from 'crawlee';
import fs from 'fs';
import got from 'got';

import summarize from './summarize';
import router from './routes';
import generateAudio from './generateAudio';
import { convertMilliseconds } from './utils';
import _ from 'lodash';

import dataSourcesToCrawl, { Label } from './dataSourcesToCrawl';

import './config';
import path from 'path';

console.log('LOG_LEVEL', process.env.LOG_LEVEL);

// Crawlers come with various utilities, e.g. for logging.
// Here we use debug level of logging to improve the debugging experience.
// This functionality is optional!
log.setLevel(LogLevel.DEBUG);

const s0 = performance.now();

// Get the global configuration
const config = Configuration.getGlobalConfig();

config.set('persistStorage', true);
config.set('purgeOnStart', false);

const crawler = new CheerioCrawler({
  // proxyConfiguration: new ProxyConfiguration({ proxyUrls: ['...'] }),
  requestHandler: router,
  maxRequestsPerCrawl: 100, // Limitation for only 10 requests (do not use if you want to crawl a sitemap)
  // This function is called if the page processing failed more than maxRequestRetries + 1 times.
  failedRequestHandler({ request }) {
    log.debug(`Request ${request.url} failed twice.`);
  },
});

const now = new Date();
const today = now.toISOString().slice(0, 10).replace(/-/g, '/');

// const requestQueue = await RequestQueue.open();
const requests = [];
for (const dataSource of dataSourcesToCrawl) {
  const { url, regex: regexString, label, keyToFilterBy, keyOfData, keyWithContent } = dataSource;

  let listOfUrls: string[] = [];
  if (url.includes('rss')) {
    listOfUrls = await downloadListOfUrls({
      url,
    });
    if (regexString) {
      const regexStringToReplace = regexString.replace('__DATE__', today);
      const regex = new RegExp(regexStringToReplace);
      listOfUrls = listOfUrls.filter((url) => regex.test(url));
    }
    listOfUrls = listOfUrls.filter((url) => {
      const slug = url.replace(/[^a-zA-Z0-9]/g, '-');
      const filename = `${now.toISOString().slice(0, 10)}-${slug}.mp3`;

      const weAlreadyHaveThis = fs.existsSync(`./mp3s/${filename}`);

      if (weAlreadyHaveThis) {
        console.log('we already have this', filename);
        return false;
      }
      return true;
    });

    requests.push(...listOfUrls.map((url) => ({ url, userData: { label: dataSource.label } })));
    continue;
  }
  if (label === Label.API) {
    console.log('label is API');

    if (!dataSource.scrape) {
      const dataContents: any = await got(url).json();
      const data = dataContents[keyOfData || ''] || [];
      if (!data || !data.length) continue;

      const limitData = data;
      // const limitData = data.slice(0, 1);
      for (const item of limitData) {
        if (keyToFilterBy) {
          const date = new Date(_.get(item, keyToFilterBy));
          if (!date) continue;

          // if it's today
          if (date.toISOString().slice(0, 10) === now.toISOString().slice(0, 10)) {
            console.log('getting summary of:', item.canonical);
            const slug = item.canonical.replace(/[^a-zA-Z0-9]/g, '-');
            const filename = `${date.toISOString().slice(0, 10)}-${slug}.mp3`;

            const weAlreadyHaveThis = fs.existsSync(`./mp3s/${filename}`);

            if (weAlreadyHaveThis) {
              console.log('we already have this', filename);
              continue;
            }
            console.log('filename', filename);
            const summary = await summarize({ text: item[keyWithContent || ''] });

            const data = {
              title: item.title,
              summary,
              url: item.canonical,
              image: item.thumb,
              publishedAt: item.published_at.date,
              source: item.source,
              content: item.content,
              uniqueKey: item.canonical,
            };

            Dataset.pushData(data);
          }
        }
      }
    }
    continue;
  } else {
    requests.push({ url: dataSource.url, userData: { label: dataSource.label } });
  }

  // // console.log(listOfUrls);
  // console.log('today', today);

  // allUrls.push(...listOfUrls);

  // First you create the request queue instance.
  // And then you add one or more requests to it.
  // await requestQueue.addRequest({ url: dataSource.url, userData: { label: dataSource.label } });
}

if (!requests.length) {
  console.log('No urls found');

  // process.exit(0);
}

console.log('requests');
console.log(requests);
await crawler.run(requests);

// Done scraping.
const s1 = performance.now();
console.log(`scraper + [summary] took ${convertMilliseconds(s1 - s0)}`);

// Let's generate the audio files

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

const allData = await Dataset.getData();

// console.log(allData);

const gt0 = performance.now();
for (const item of allData.items) {
  const { title, summary, url, image, publishedAt } = item;

  let date: string | null = null;
  if (publishedAt) {
    date = new Date(publishedAt).toISOString().slice(0, 10);
  } else {
    //   url: 'https://www.coindesk.com/policy/2023/04/09/bank-of-england-targets-30-strong-team-for-digital-currency-report/?utm_medium=referral&amp',
    date = url.match(/(\d{4})\/(\d{2})\/(\d{2})/)[0].replace(/\//g, '-');
  }

  const g0 = performance.now();
  const slug = url.replace(/[^a-zA-Z0-9]/g, '-');
  const filename = `${date}-${slug}.mp3`;

  const filepath = path.join('./mp3s', filename);
  if (fs.existsSync(filepath)) {
    console.log('file exists for:', filename);
    continue;
  }

  if (!summary) {
    console.log('no summary for:', filename);
    continue;
  }

  const resReponse = await generateAudio(summary, filename);
  console.log('generating audio for:', filename);
  const g1 = performance.now();
  console.log(`generateAudio took ${convertMilliseconds(g1 - g0)}`);

  console.log(resReponse);
}

const gt1 = performance.now();
console.log(`generating all audio took ${convertMilliseconds(gt1 - gt0)}`);

console.log('ALL DONE!');
