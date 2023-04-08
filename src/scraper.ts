import got from 'got';
import { extractFromHtml } from '@extractus/article-extractor';
try {
  const { body: html, url } = await got(
    'https://cryptopotato.com/15-billion-airdrop-thats-what-thailands-opposition-party-is-promising/',
  );
  const article = await extractFromHtml(html, url);
  console.log(article);
} catch (err) {
  console.error(err);
}
