// Node.js >=15.10.0 is required due to instability of HTTP/2 support in lower versions.
import { gotScraping } from 'got-scraping';
import crypto from 'crypto';
import { ArticleData, extractFromHtml } from '@extractus/article-extractor';

const scrapeAndExtractArticleFromURL = async (link: string): Promise<ArticleData | Error> => {
  const { body: html, url } = await gotScraping(link);
  const article = await extractFromHtml(html, url);
  //   console.log(article);
  if (article) {
    return article;
  }
  throw new Error('no article');
}


export const scrapeNewsoutlet = async (link: string): Promise<ArticleData | Error> => {
  const { body: html, url } = await gotScraping(link);
  const article = await extractFromHtml(html, url);
  //   console.log(article);

// compute hash of url
const hash = crypto.createHash('sha256');
hash.update(article.url);
const urlHash = hash.digest('hex');
console.log(urlHash);



const s0 = performance.now();
const article = await scrapeAndExtractArticleFromURL(
  'https://cryptopotato.com/eth-liquid-staking-tokens-drop-8-daily-bitcoin-stalls-at-28k-weekend-watch/',
);

// console.log(article);
if (!article) {
  throw new Error('Article not found');
}

if (!article.content || !article.url) {
  throw new Error('Article content not found');
}